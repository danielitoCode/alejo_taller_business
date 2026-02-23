import {infrastructureContainer} from "../../../infrastructure/di/infrastructure.container";
import {CategoryNetRepository} from "../data/repository/category.net.repository";
import {CategoryOfflineFirstRepository} from "../data/repository/category.offline-first.repository";

// Db instance
let database = infrastructureContainer.appwrite.databases

// Data
const categoryNetRepository = new CategoryNetRepository(database)
const categoryOfflineFirstRepository = new CategoryOfflineFirstRepository(categoryNetRepository)