import conf from "../conf/conf";
import { Client, Account, TablesDB, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(conf.appwriteUrl)                       // Your API Endpoint
    .setProject(conf.appwriteProjectId);                 // Your project ID

export const account = new Account(client);

export const tablesDB = new TablesDB(client);

export const storage = new Storage(client);


// You can export  -->  { account, tablesDB, storage }  from here
// and import them individually in their  -->  appwrite/[___]Services.js  where they are required