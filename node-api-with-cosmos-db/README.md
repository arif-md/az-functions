# Sample NodeJS API with Cosmos DB
## prerequisites
* Refer to the parent project README instructions and then follow these instructions. 
* Node and NPM is installed.
* Function core tools extension is installed in VS code
* Cosmos DB account is created with the following details
  * Create a database by name BookDB
  * Create a conainer in above DB by name BookContainer
  * Add some documents in the container
  * Copy the id/partition key for one of the document
  * Copy the Cosmos DB PRIMARY CONNECTION STRING from Cosmos DB Acc -> settings -> keys
  * Make sure that the DB is publicly accesible under Cosmos DB Acc -> settings -> Networking -> Public access -> All networks
* Create a Function App with hosting plan other than Flex Consumption plan. As of this writing **Flex Consumption Plan** has some binding limitations, especially for input/output bindings like Cosmos DB.
* Update local.settings.json with the following setting. Value of this setting is Cosmos DB PRIMARY CONNECTION STRING
    ```
    "COSMOS_DB_CONNECTION_STRING": ""
    Note: If running in Azure enviroment follow key vault setup
    ```
* Key vault setup **(Key vault does not work in local environment)**
  * Create an Azure Key vault and store the above DB connection string in key vault.
    ```
    az keyvault create --name my-raptor-keyvault --resource-group rg-raptor-dev --location eastus
    az keyvault secret set --vault-name my-raptor-keyvault --name COSMOS-DB-CONNECTION-STRING --value "AccountEndpoint=;AccountKey="
    ```
  * Assign Key Vault Access to Your Azure Function
    * Enable Managed Identity: Go to Function App → Settings → Identity → Under System assigned, set Status to On → Save
    * Grant it access to the Key Vault(`az keyvault set-policy --name my-raptor-keyvault --object-id <PRINCIPAL_ID> --secret-permissions get list`). Where PRINCIPAL_ID is function apps identity.
  * Reference Secret in Azure App Settings
    * Function App → Configuration → Application settings → New application setting → Name : COSMOS_DB_CONNECTION_STRING & Value : @Microsoft.KeyVault(SecretUri=https://my-raptor-keyvault.vault.azure.net/secrets/COSMOS-DB-CONNECTION-STRING/)


  