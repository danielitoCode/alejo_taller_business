import {account, client, databases, storage} from "./appwrite.config";
import {db} from "./dexie.db";
import {authService} from "./auth.service";

export const infrastructureContainer = {
    appwrite: {
        client,
        databases,
        storage,
        account
    },
    auth: authService,
    database: db
}