const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { TableClient, AzureNamedKeyCredential } = require('@azure/data-tables');

// Keep a global reference to the window object to prevent garbage collection
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Fetch submissions from Azure (or mock data if credentials are not provided)
ipcMain.handle('fetch-submissions', async (event) => {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const tableName = 'ContactSubmissions';

    if (!accountName || !accountKey) {
        // Return mock data for testing visually
        return [
            { rowKey: '1', name: 'Alice Smith', email: 'alice@example.com', service: 'custom_woodwork', message: 'I need a custom dining table made of walnut.', submittedAt: new Date().toISOString() },
            { rowKey: '2', name: 'Bob Johnson', email: 'bob@cricket.com', service: 'bat_repair', message: 'My bat handle is cracked, can you fix it by Friday?', submittedAt: new Date(Date.now() - 86400000).toISOString() }
        ];
    }

    try {
        const credential = new AzureNamedKeyCredential(accountName, accountKey);
        const tableUrl = `https://${accountName}.table.core.windows.net`;
        const client = new TableClient(tableUrl, tableName, credential);

        const entities = [];
        for await (const entity of client.listEntities()) {
            entities.push(entity);
        }

        // Sort by newest first
        return entities.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    } catch (err) {
        console.error('Error fetching from Azure:', err);
        return [];
    }
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
