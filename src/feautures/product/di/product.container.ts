import {infrastructureContainer} from "../../../infrastructure/di/infrastructure.container";
import ProductNetRepository from "../data/repository/product.net.repository";
import {ProductOfflineFirstRepository} from "../data/repository/product.offline-first.repository";

// Database instance
let database = infrastructureContainer.appwrite.databases

// Data
const productNetRepository = new ProductNetRepository(database)
const productOfflineFirstRepository = new ProductOfflineFirstRepository(productNetRepository)
