import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite";

class StorageService {

    constructor() {
        const client = new Client()
            .setEndpoint('https://<REGION>.cloud.appwrite.io/v1')
            .setProject('<PROJECT_ID>');

        const storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            const fileId = await this.storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file
            });
            return true;
        } catch (error) {
            console.error("Appwrite Service :: uploadFile() :: error", error);
            return false;
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

    async getFile(fileId) {
        try {
            this.storage.getFilePreview({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
                // width: 0,        // optional
                // height: 0
            });
        } catch (error) {
            console.error("Appwrite Service :: getFile() :: error", error);
            return false;
        }
    }

}

const storageService = new StorageService();
export default storageService;