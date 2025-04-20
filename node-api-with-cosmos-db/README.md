# Sample NodeJS API with Cosmos DB
## prerequisites
* Node and NPM is installed.
* Function core tools extension is installed in VS code
* Cosmos DB account is created with the following details
  * Create a database by name BookDB
  * Create a conainer in above DB by name BookContainer
  * Add some documents in the container
  * Copy the id/partition key for one of the document
  * Copy the Cosmos DB PRIMARY CONNECTION STRING from Cosmos DB Acc -> settings -> keys
  * Make sure that the DB is publicly accesible under Cosmos DB Acc -> settings -> Networking -> Public access -> All networks