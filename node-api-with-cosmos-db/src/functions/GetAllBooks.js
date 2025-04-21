const { app, input } = require('@azure/functions');

const allDocs = input.cosmosDB({
    databaseName: 'BookDB',
    containerName: 'BookContainer',
    connection: 'COSMOS_DB_CONNECTION_STRING',
    sqlQuery: 'SELECT * FROM c'
});

app.http('GetAllBooks', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [allDocs],
    handler: async (request, context) => {
        const books = context.extraInputs.get(allDocs);  
        if (!books) {
            return {
                status: 404,
                body: 'No books found',
            };
        } else {
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(books, null, 2)
            };
        }        
    }
});
