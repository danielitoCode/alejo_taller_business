import {UserNetRepositoryImpl} from "../data/repository/user.net.repository";
import {infrastructureContainer} from "../../../infrastructure/di/infrastructure.container";

// Account instance
const accounts = infrastructureContainer.appwrite.account

// Data
const authNetRepository = new UserNetRepositoryImpl(accounts)

export const authContainer = {
    repositories: {
        net: authNetRepository
    }
}