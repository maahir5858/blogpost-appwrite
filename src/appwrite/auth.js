import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {

    constructor() {
        const client = new Client()
            .setEndpoint(conf.appwriteUrl)                       // Your API Endpoint
            .setProject(conf.appwriteProjectId);                 // Your project ID

        const account = new Account(this.client);
    }

    async signup({ email, password, name }) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name
            })
            if (userAccount) {
                this.account.login({ email, password });
                return userAccount;
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Appwrite Service :: signup() :: error", error);
        }
    }

    async login({ email, password }) {
        try {
            const result = await this.account.createEmailPasswordSession({
                email,
                password
            });
            return result;
        } catch (error) {
            console.error("Appwrite Service :: login() :: error", error);
        }
    }

    async getUser() {
        try {
            const result = await this.account.get();
            return result;
        } catch (error) {
            console.error("Appwrite Service :: getUser() :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            // await this.account.deleteSession("current");       // logout on this device
            await this.account.deleteSessions();                  // logout the user on all devices
        } catch (error) {
            console.error("Appwrite Service :: logout() :: error", error);
        }
    }

}

const authService = new AuthService();          // authService Object
export default authService;