import { NextResponse } from 'next/server';
import { TableClient, AzureNamedKeyCredential } from '@azure/data-tables';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { Resend } from 'resend';

// Environment variables
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || '';
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || '';
const resendApiKey = process.env.RESEND_API_KEY || '';
const tableName = 'ContactSubmissions';
const containerName = 'contact-attachments';

const resend = resendApiKey ? new Resend(resendApiKey) : null;

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

            // Create a unique name for the blob, prefixed with the user's email
            // Sanitize the email to ensure it's a valid blob name (replacing invalid chars with _)
            const sanitizedEmail = email.replace(/[^a-zA-Z0-9.\-@]/g, '_');
            const sanitizedFilename = attachment.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const blobName = `${sanitizedEmail}-${Date.now()}-${sanitizedFilename}`;
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

        // --- EMAIL NOTIFICATION VIA RESEND ---
        if (resendApiKey && resend) {
            const htmlEmail = `
                <h2>New Contact Inquiry: WoodWalaa</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Service Requested:</strong> ${service}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="border-left: 4px solid #FF5E00; padding-left: 10px; margin-left: 0; white-space: pre-wrap;">${message}</blockquote>
                ${attachmentUrl ? `<p><strong>Attachment:</strong> <a href="${attachmentUrl}">View Reference Image</a></p>` : ''}
            `;

            try {
                await resend.emails.send({
                    from: 'WoodWalaa Notifications <notifications@woodwalaa.com>',
                    to: ['leonardo.amigo@jeton.com'],
                    subject: `New Inquiry from ${name} - ${service}`,
                    replyTo: email,
                    html: htmlEmail,
                });
                console.log('Admin notification email sent successfully.');
            } catch (emailError) {
                console.error('Failed to send email notification:', emailError);
                // We don't fail the whole user submission just because the admin email failed
            }
        } else {
            console.log('--- MOCK RESEND NOTIFICATION ---');
            console.log(`To: leonardo.amigo@jeton.com\nSubject: New Inquiry from ${name}\n[Attachment: ${attachmentUrl ? 'Yes' : 'No'}]`);
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
