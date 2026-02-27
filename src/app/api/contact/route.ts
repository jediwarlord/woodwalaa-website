import { NextResponse } from 'next/server';
import { TableClient, AzureNamedKeyCredential } from '@azure/data-tables';

// Environment variables needed for Azure Table Storage
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || '';
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || '';
const tableName = 'ContactSubmissions';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, service, message } = body;

        // Validate request
        if (!name || !email || !service || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const payload = {
            partitionKey: service, // partition by service type
            rowKey: Date.now().toString() + Math.random().toString(36).substring(2, 9),
            name,
            email,
            message,
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
