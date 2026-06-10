import conf from "../conf/conf";
import { Client, TablesDB, ID, Query } from "appwrite";

// Database Services for Post

class PostService {

    constructor() {
        const client = new Client()
            .setEndpoint('https://<REGION>.cloud.appwrite.io/v1')
            .setProject('<PROJECT_ID>');

        const tablesDB = new TablesDB(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });            
        } catch (error) {
            console.error("Appwrite Service :: createPost() :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            this.tablesDB.updateRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { 
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.error("Appwrite Service :: updatePost() :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
            });
            return true;
        } catch (error) {
            console.error("Appwrite Service :: deletePost() :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            await this.databases.getDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
                // queries: [ Query.equal('title', 'active') ]
            });
        } catch (error) {
            console.error("Appwrite Service :: getPost() :: error", error);
        }
    }

    async getPosts() {
        try {
            await this.databases.listDocuments({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                queries: [
                    Query.equal('title', 'active')
                ]
            });
        } catch (error) {
            console.error("Appwrite Service :: getPost() :: error", error);
        }
    }

}

const postService = new PostService();
export default postService;