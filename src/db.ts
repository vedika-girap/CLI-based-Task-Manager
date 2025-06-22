import { error } from "console";    
import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const dbName = "mydatabase";


export async function connectDb(){
    try{
        await client.connect();
        return client.db(dbName);
    }catch(err) {
        console.error("Failed to connect to the database", err);
        process.exit(1);
    }
}