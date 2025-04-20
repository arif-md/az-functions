const { app, input, output } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

// Define Cosmos DB input binding correctly
const cosmosInput = input.cosmosDB({
    databaseName: 'BookDB',
    containerName: 'BookContainer',
    id: '{Query.id}',                      // Using query parameter for 'id'
    partitionKey: '{Query.partitionKeyValue}',  // Using query parameter for partitionKey
    connection: 'COSMOS_DB_CONNECTION_STRING',
});
  
//const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;

// Helper: timeout wrapper
function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("Cosmos DB timeout")), ms))
    ]);
}

app.http('GetAllBooks', {
    methods: ['GET'],
    authLevel: 'anonymous',
    // Pass input binding correctly as an object
    /*inputs: {
      book: cosmosInput,  // 'book' is now correctly defined as a key with the input binding
    },*/
    handler: async (request, context) => {
        // Access the book from the extraInputs
        //const book = context.inputs.get('book');   
        const id = request.query.get('id');     
        const partitionKey = request.query.get('partitionKeyValue');

        if (!id || !partitionKey) {
            return { status: 400, body: 'Missing id or partitionKeyValue' };
        }

        context.log(`Recieved id = "${id}", partitionKeyValue = "${partitionKey}"`);

        const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;
        const client = new CosmosClient(connectionString);
        context.log('client connection created...');
        const database = client.database('BookDB');
        context.log('connected to DB...');
        const container = database.container('BookContainer');
        context.log('connected to Container...');

        try {

            const { resource: book } = await withTimeout(
                container.item(id, partitionKey).read(),
                5000 // ⏱️ 5 second timeout
            );            
            //const { resource: book } = await container.item(id, partitionKey).read();
      
            if (!book) {
              return { status: 404, body: 'Book not found 2' };
            }
      
            return {
              status: 200,
              jsonBody: book
            };
          } catch (err) {
            context.log.error('Error retrieving book:', err.message);
            return {
                status: 500,
                body: `Failed to fetch book: ${err.message}`
            };
          }              
    }
});
