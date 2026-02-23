import {infrastructureContainer} from "../../../../infrastructure/di/infrastructure.container";
import type {UserDTO} from "../dto/UserDTO";
import type {UserNetRepository} from "../../domain/repository/user.net.repository";
import {account} from "../../../../infrastructure/di/appwrite.config";
import {type Account, ID} from "appwrite";

export class UserNetRepositoryImpl implements UserNetRepository {
    constructor(private readonly account: Account) {}

    async createAccount(user: Partial<UserDTO>) {
        await account.create(
            ID.unique(),
            user.email as string,
            user.password as string,
            user.name as string
        )

        let response = await account.createEmailPasswordSession(
            user.email as string,
            user.password as string,
        )

        let preferences = new Map<string, any>();
        preferences.set("photo_url", user.photo_url as string);
        preferences.set("sub", user.sub as string);
        preferences.set("role", user.name as string);
        preferences.set("phone", user.phone as string);

        await account.updatePrefs(preferences);
    }

    async updateName(newName: string): Promise<void> {
        await account.updateName(newName);
    }

    async updatePassword(newPassword: string): Promise<void> {
        await account.updatePassword(newPassword);
    }

    async updatePhotoUrl(newPhotoUrl: string): Promise<void> {
        let photoPreference = new Map<string,string>()
        photoPreference.set("photo_url", newPhotoUrl);
        await account.updatePrefs(photoPreference)
    }

    async updatePhone(newPhone: string): Promise<void> {
        let photoPreference = new Map<string,string>()
        photoPreference.set("phone", newPhone);
        await account.updatePrefs(photoPreference)
    }

    async updateRole(newRole: string): Promise<void> {
        let photoPreference = new Map<string,string>()
        photoPreference.set("role", newRole);
        await account.updatePrefs(photoPreference)
    }

    async deleteUser(user: Partial<UserDTO>) {
        await account.deleteIdentity(user.id as string)
    }
}
