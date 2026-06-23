import conf from "../conf/conf";
import { Client, TablesDB, ID, Query } from "appwrite";

// Database Services for Post

class PostService {

    client = new Client();
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.tablesDB = new TablesDB(this.client);
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
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.tablesDB.updateRow(
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
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            );
            return true;
        } catch (error) {
            console.error("Appwrite Service :: deletePost() :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                // queries: [ Query.equal('title', 'active') ]
            });
        } catch (error) {
            console.error("Appwrite Service :: getPost() :: error", error);
        }
    }

    async getPosts() {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries: [
                    Query.equal('status', 'active')
                ]
            });
        } catch (error) {
            console.error("Appwrite Service :: getPost() :: error", error);
        }
    }

}

const postService = new PostService();
export default postService;