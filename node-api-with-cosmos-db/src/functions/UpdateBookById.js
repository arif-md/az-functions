const { app, input, output } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'BookDB',
    containerName: 'BookContainer',
    id: '{Query.id}',       
    partitionKey: '{Query.partitionKeyValue}',                    
    connection: 'COSMOS_DB_CONNECTION_STRING',
});

const cosmosOutput = output.cosmosDB({
    databaseName: 'BookDB',
    containerName: 'BookContainer',
    connection: 'COSMOS_DB_CONNECTION_STRING',
});

app.http('UpdateBookById', {
    methods: ['PUT'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    extraOutputs: [cosmosOutput],
    handler: async (request, context) => {
        const book = context.extraInputs.get(cosmosInput);  
        const body = await request.json();

        if(body && book.id) {
            const bookToUpdate = {
                id: book.id,
                author : body.author || book.author,
                title  : body.title || book.title,
                date_published : body.date_published || book.date_published
            }
            context.log("Book to update:", JSON.stringify(bookToUpdate));
            context.extraOutputs.set(cosmosOutput, bookToUpdate);
            return {
                status: 200,
                body: JSON.stringify(bookToUpdate, null, 2)
            };
        }else if(!book.id) {
            return {
                status: 400,
                body: 'Could not find the book with the given id.',
            };
        } else {
            return {
                status: 400,
                body: 'Something wrong with input.',
            };
        }
    }
});
