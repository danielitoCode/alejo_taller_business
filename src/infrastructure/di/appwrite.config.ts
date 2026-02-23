import { Client, Databases, Storage, Account } from "appwrite"
import {ENV} from "../core/env";

const client = new Client()

client
    .setEndpoint(ENV.appwriteEndpoint)
    .setProject(ENV.appwriteProjectId)

export const databases = new Databases(client)
export const storage = new Storage(client)
export const account = new Account(client)

export { client }