import { NextResponse } from 'next/server';
import { TableClient, AzureNamedKeyCredential } from '@azure/data-tables';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

// Environment variables needed for Azure Table Storage and Blob Storage
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || '';
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || '';
const tableName = 'ContactSubmissions';
const containerName = 'contact-attachments';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const service = formData.get('service') as string;
        const message = formData.get('message') as string;
        const attachment = formData.get('attachment') as File | null;

        // Validate request
        if (!name || !email || !service || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        let attachmentUrl = '';

        // If attachment and Azure credentials exist, upload to Azure Blob Storage
        if (attachment && accountName && accountKey) {
            const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
            const blobServiceClient = new BlobServiceClient(
                `https://${accountName}.blob.core.windows.net`,
                sharedKeyCredential
            );
            const containerClient = blobServiceClient.getContainerClient(containerName);

            // Create container if it doesn't exist. Give it blob-level public access so you can view images directly.
            await containerClient.createIfNotExists({ access: 'blob' });

            // Create a unique name for the blob
            const blobName = `${Date.now()}-${attachment.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            const arrayBuffer = await attachment.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await blockBlobClient.uploadData(buffer, {
                blobHTTPHeaders: { blobContentType: attachment.type }
            });

            attachmentUrl = blockBlobClient.url;
        } else if (attachment) {
            // For local development without Azure credentials, we simulate the blob upload
            console.log(`--- MOCK AZURE BLOB UPLOAD: ${attachment.name} ---`);
            attachmentUrl = `https://mockstorage.blob.core.windows.net/${containerName}/mock-${attachment.name}`;
        }

        const payload = {
            partitionKey: service, // partition by service type
            rowKey: Date.now().toString() + Math.random().toString(36).substring(2, 9),
            name,
            email,
            message,
            attachmentUrl, // the image link, if any
            submittedAt: new Date().toISOString(),
        };

        // If Azure credentials exist, connect and push to Azure Table Storage
        if (accountName && accountKey) {
            const credential = new AzureNamedKeyCredential(accountName, accountKey);
            const tableUrl = `https://${accountName}.table.core.windows.net`;
            const client = new TableClient(tableUrl, tableName, credential);

            // Attempt to create table if it doesn't exist
            await client.createTable().catch(() => { });

            // Insert entity into table
            await client.createEntity(payload);
        } else {
            // For local development without Azure credentials, we simulate the database
            console.log('--- MOCK AZURE TABLE INSERT ---');
            console.log(JSON.stringify(payload, null, 2));
            console.log('-------------------------------');
        }

        return NextResponse.json({ success: true, payload });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to submit contact form' },
            { status: 500 }
        );
    }
}
