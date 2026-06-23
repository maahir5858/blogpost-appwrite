import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite";

class StorageService {

    client = new Client();
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file
            });
        } catch (error) {
            console.error("Appwrite Service :: uploadFile() :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId
            });
            return true;
        } catch (error) {
            console.error("Appwrite Service :: deleteFile() :: error", error);
            return false;
        }
    }

    getFile(fileId) {
        try {
            return this.storage.getFileView({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
                width: 0,
                height: 0
            });
        } catch (error) {
            console.error("Appwrite Service :: getFile() :: error", error);
            return false;
        }
    }

}

const storageService = new StorageService();
export default storageService;