const { app, input, output } = require('@azure/functions');

// Define Cosmos DB input binding correctly
const cosmosInput = input.cosmosDB({
    databaseName: 'BookDB',
    containerName: 'BookContainer',
    id: '{Query.id}',                           // Using query parameter for 'id'
    partitionKey: '{Query.partitionKeyValue}',  // Using query parameter for partitionKey
    connection: 'COSMOS_DB_CONNECTION_STRING',
});
  
app.http('GetAllBooks', {
    methods: ['GET'],
    authLevel: 'anonymous',
    // Pass input binding correctly as an object
    inputs: {
      book: cosmosInput,  // 'book' is now correctly defined as a key with the input binding
    },
    handler: async (request, context) => {
        context.log(`Recieved id 2 = "${request.params.id}", partitionKeyValue = "${request.params.partitionKeyValue}"`);
        // Access the book from the extraInputs
        const book = context.inputs.get('book');        
        context.log(`Received book object: ${JSON.stringify(book)}`);
        process.env.AZURE_COSMOS_VERBOSE_LOGGING = 'true';

        if (!book) {
            return {
                status: 404,
                body: 'Book not found',
            };
        } else {
            return {
                status: 200,
                jsonBody: book
            };
        }        
    }
});
