const { CosmosClient } = require("@azure/cosmos");

// 🔐 Update the values for AccountEndpoint and AccountKey
const connectionString = "AccountEndpoint=;AccountKey=";
const databaseId = "BookDB";
const containerId = "BookContainer";

// 🔎 Replace these with values from your actual Cosmos DB document
const testId = "ad683f96-c20d-4ced-889c-ea0636b69522";
const testPartitionKey = "Arif";

async function run() {
  try {
    const client = new CosmosClient(connectionString);
    const container = client.database(databaseId).container(containerId);

    console.log(`🔍 Fetching item with ID: ${testId}, PartitionKey: ${testPartitionKey}`);
    const { resource: item } = await container.item(testId, testPartitionKey).read();

    if (item) {
      console.log("✅ Document retrieved successfully:");
      console.log(item);
    } else {
      console.log("❌ Document not found.");
    }
  } catch (err) {
    console.error("❌ Error connecting to Cosmos DB:", err.message);
  }
}

run();