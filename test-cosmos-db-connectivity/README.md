# Sample NodeJS script to connect to Cosmos DB on Azure and read a document.
## prerequisites
* Node and NPM is installed.
* Cosmos DB account is created with the following details
  * Create a database by name BookDB
  * Create a conainer in above DB by name BookContainer
  * Add some documents in the container
  * Copy the id/partition key for one of the document
  * Copy the Cosmos DB PRIMARY CONNECTION STRING from Cosmos DB Acc -> settings -> keys
## create a NodeJS project by using the folowing commands in a clean/empty directory.
```pwsh
npm init -y
npm install @azure/cosmos
```
## Create a file by name cosmosTest.js with the connection code.
## Run the script
```pwsh
node cosmosTest.js
```