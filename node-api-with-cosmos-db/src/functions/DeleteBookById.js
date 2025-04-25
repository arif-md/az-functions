const { app, input, output } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

app.http('DeleteBookById', {
    methods: ['DELETE'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const id = request.query.get('id');
        const partitionKeyValue = request.query.get('partitionKeyValue');

        if (!id || !partitionKeyValue) {
            return {
                status: 400,
                body: 'Missing id or partitionKeyValue in query.'
            };
        }

        try {
            const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION_STRING);
            const container = client.database('BookDB').container('BookContainer');

            await container.item(id, partitionKeyValue).delete();
            
            return {
                status: 200,
                body: `Book with ID ${id} deleted successfully.`
            };
        } catch (err) {
            context.log('Delete failed:', err.message);
            return {
                status: 500,
                body: 'Failed to delete the book. ' + err.message
            };
        }        

    }
});
