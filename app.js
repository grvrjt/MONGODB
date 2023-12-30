const { MongoClient } = require('mongodb');
const uri = require('./atlas_url');

const client = new MongoClient(uri);
const dbName = "bank";
const collectionName = 'accounts';
const accountCollection = client.db(dbName).collection(collectionName);

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbName} database`)
    } catch (error) {
        console.error(`Error while connecting to the database ${error}`)
    }
}

const listDatabases = async (client) => {
    const databaseList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databaseList.databases.forEach(db => console.log(`-${db.name}`));
}


const sampleData = {
    account_holder: "Gaurav",
    account_type: "checking",
    balance: 1000,
    account_id: "ASHDEB46363485MN",
    last_updated: new Date(),
}
const main = async () => {
    try {
        await connectToDatabase();
        await listDatabases(client);
        const result = await accountCollection.insertOne(sampleData);
        console.log("Inserted One document result == >", result);
    } catch (error) {
        console.error(`Error while connecting to the database ${error}`)
    } finally {
        await client.close();
    }
}

main();