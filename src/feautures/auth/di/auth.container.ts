import {UserNetRepositoryImpl} from "../data/repository/user.net.repository";
import {infrastructureContainer} from "../../../infrastructure/di/infrastructure.container";

// Account instance
let accounts = infrastructureContainer.appwrite.account

// Data
const auth_net_repository = new UserNetRepositoryImpl(accounts)