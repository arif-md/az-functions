const { app, input, output } = require('@azure/functions');

// Define Cosmos DB input binding correctly
const docById = input.cosmosDB({
    databaseName: 'BookDB',
    containerName: 'BookContainer',
    id: '{Query.id}',                           // Using query parameter for 'id'
    partitionKey: '{Query.partitionKeyValue}',  // Using query parameter for partitionKey
    connection: 'COSMOS_DB_CONNECTION_STRING',
});

app.http('GetBookById', {
    methods: ['GET'],
    authLevel: 'anonymous',
    // Pass input binding correctly as an object
    /*inputs: {
      book: cosmosInput,  // 'book' is now correctly defined as a key with the input binding
    },*/
    extraInputs: [docById],
    handler: async (request, context) => {
        const book = context.extraInputs.get(docById);  
        //context.log(`Received book object: ${JSON.stringify(book)}`);
        //process.env.AZURE_COSMOS_VERBOSE_LOGGING = 'true';
        if (!book) {
            return {
                status: 404,
                body: 'Book not found',
            };
        } else {
            return {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book, null, 2)
            };
        }        
    }
});
