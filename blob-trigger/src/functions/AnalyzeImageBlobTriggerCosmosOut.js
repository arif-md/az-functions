const { app } = require('@azure/functions');
const axios = require('axios');

app.storageBlob('AnalyzeImageBlobTriggerCosmosOut', {
    path: 'image-input/{name}',
    connection: '',
    handler: async (blob, context) => {
        context.log(`Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`);
        await axios({
            method: 'post',
            url: 'https://raptorcognitiveservice.cognitiveservices.azure.com/',
            data: blob,
            headers: {'Ocp-Apim-Subscription-Key': '5nY8Bl1HQCnhUHBqjZeQmYSjHT939jzU7sxFuKXqgkegJKy4UQzoJQQJ99BDACYeBjFXJ3w3AAAFACOGuADL', 'Content-Type': 'application/octet-stream'}
          })
        .then(function (response) {
            context.log(response.data);
            context.log("Received successful response from Computer Vision API. \nStoring results in CosmosDB...")
            context.bindings.outputDocument = JSON.stringify(response.data);
        })
        .catch(function (error) {
            context.log(error);
        });
    }
});
