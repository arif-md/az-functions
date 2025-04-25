const { app, output } = require('@azure/functions');
const { v4: uuidv4 } = require('uuid');

const cosmosOutput = output.cosmosDB({
    databaseName: 'BookDB',
    containerName: 'BookContainer',
    connection: 'COSMOS_DB_CONNECTION_STRING',
});

app.http('CreateBook', {
    methods: ['POST'],
    authLevel: 'anonymous',
    extraOutputs: [cosmosOutput],
    handler: async (request, context) => {
        const body = await request.json();
        context.log(`Received book object: ${JSON.stringify(body)}`);        
        if(body && body.title){
            const book = {
                id: uuidv4(),
                author : body.author,
                title  : body.title,
                date_published : body.date_published
            }
            context.extraOutputs.set(cosmosOutput, book);
            return {
                status: 200,
                body: "Book added successfully"
            };
        }else{
            return {
                status: 400,
                body: 'Required parameters missing.',
            };
        }
    }
});