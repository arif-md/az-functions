const { app, input, output } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'BookDB',
    containerName: 'BookContainer',
    id: '{Query.id}',       
    partitionKey: '{Query.partitionKeyValue}',                    
    connection: 'COSMOS_DB_CONNECTION_STRING',
});

// Output binding: Delete the document
const cosmosOutput = output.cosmosDB({
    databaseName: 'BookDB',
    containerName: 'BookContainer',
    connection: 'COSMOS_DB_CONNECTION_STRING',
    createIfNotExists: false,
    delete: true // 👈 tells Cosmos to delete the document
});

app.http('DeleteBookById', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    extraOutputs: [cosmosOutput],
    handler: async (request, context) => {
        const bookToDelete = context.extraInputs.get(cosmosInput);
        context.log("Book to delete:", JSON.stringify(bookToDelete));
        if (!bookToDelete || !bookToDelete.id) {
            return {
                status: 404,
                body: 'Book not found.'
            };
        }
        // Set the document to delete
        context.extraOutputs.set(cosmosOutput, {
            id: bookToDelete.id,
            author: bookToDelete.author // 👈 must include partition key!
        }); 
        context.log("Going to delete:", JSON.stringify({ id: bookToDelete.id, author: bookToDelete.author }))   
        return {
            status: 200,
            body: `Book with ID ${bookToDelete.id} deleted successfully.`
        };            
    }
});
