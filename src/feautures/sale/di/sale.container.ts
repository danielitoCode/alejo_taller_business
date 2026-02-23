import {infrastructureContainer} from "../../../infrastructure/di/infrastructure.container";
import {SaleNetRepository} from "../data/repository/sale.net.repository";
import {SaleOfflineFirstRepository} from "../data/repository/sale.offline-first.repository";

// Infrastructure instance
let netDatabases= infrastructureContainer.appwrite.databases

// Data
const saleNetRepository = new SaleNetRepository(netDatabases)
const saleOfflineFirstRepository = new SaleOfflineFirstRepository(saleNetRepository)
