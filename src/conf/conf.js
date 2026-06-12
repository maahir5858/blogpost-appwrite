// Better way to ACCESS Environment Variables   -->   conf.js

// console.log(import.meta.env.VITE_APPWRITE_URL);
// console.log(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// console.log(conf.appwriteUrl);
// console.log(conf.appwriteProjectId);

const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;