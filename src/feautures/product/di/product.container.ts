import {infrastructureContainer} from "../../../infrastructure/di/infrastructure.container";
import ProductNetRepository from "../data/repository/product.net.repository";
import {ProductOfflineFirstRepository} from "../data/repository/product.offline-first.repository";
import {GetAllProductCaseUse} from "../domain/caseuse/GetAllProductCaseUse";
import {GetProductByIdCaseUse} from "../domain/caseuse/GetProductByIdCaseUse";
import {SaveProductCaseUse} from "../domain/caseuse/SaveProductCaseUse";

// Database instance
let database = infrastructureContainer.appwrite.databases

// Data
const productNetRepository = new ProductNetRepository(database)
const productOfflineFirstRepository = new ProductOfflineFirstRepository(productNetRepository)

// Domain
const getAllProductsCaseUse = new GetAllProductCaseUse(productOfflineFirstRepository)
const deletedProductCaseUse = new GetAllProductCaseUse(productOfflineFirstRepository)
const getProductByIdCaseUse = new GetProductByIdCaseUse(productOfflineFirstRepository)
const modifyProductCaseUse = new GetProductByIdCaseUse(productOfflineFirstRepository)
const saveProductCaseUse = new SaveProductCaseUse(productOfflineFirstRepository)