const { app, input, output } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

// Define Cosmos DB input binding correctly
/*const cosmosInput = input.cosmosDB({
    databaseName: 'BookDB',
    containerName: 'BookContainer',
    id: '{Query.id}',                      // Using query parameter for 'id'
    partitionKey: '{Query.partitionKeyValue}',  // Using query parameter for partitionKey
    connection: 'COSMOS_DB_CONNECTION_STRING',
});*/
  
const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;

app.http('GetAllBooks', {
    methods: ['GET'],
    authLevel: 'anonymous',
    // Pass input binding correctly as an object
    /*inputs: {
      book: cosmosInput,  // 'book' is now correctly defined as a key with the input binding
    },*/
    handler: async (request, context) => {
        // Access the book from the extraInputs
        /*const book = context.inputs.get('book');        
        context.log(`Recieved id = "${request.params.id}", partitionKeyValue = "${request.params.partitionKeyValue}"`);
        context.log(`Received book object: ${JSON.stringify(book)}`);*/
        process.env.AZURE_COSMOS_VERBOSE_LOGGING = 'true';
        const client = new CosmosClient(connectionString);
        const database = client.database('BookDB');
        const container = database.container('BookContainer');
        const { resource: book } = await container.item(id, partitionKeyValue).read();

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
