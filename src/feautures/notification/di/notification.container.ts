// Database instance
import {infrastructureContainer} from "../../../infrastructure/di/infrastructure.container";
import {PromotionNetRepository} from "../data/repository/promotion.net.repository";
import {PromotionOfflineFirstRepository} from "../data/repository/promotion.offline-first.repository";
import {DeletePromotionCaseUse} from "../domain/caseuse/DeletePromotionCaseUse";
import {GeneratePromoCaseUse} from "../domain/caseuse/GeneratePromoCaseUse";
import {GetActivePromosCaseUse} from "../domain/caseuse/GetActivePromosCaseUse";
import {GetAllPromosCaseUse} from "../domain/caseuse/GetAllPromosCaseUse";

// Infrastructure instances
let database = infrastructureContainer.appwrite.databases

// Data
const promoNetRepository = new PromotionNetRepository(database)
const promoOfflineFirstRepository = new PromotionOfflineFirstRepository(promoNetRepository)

// Domain
const deletePromoCaseUSe = new DeletePromotionCaseUse(promoOfflineFirstRepository)
const generatePromoCaseUse = new GeneratePromoCaseUse(promoOfflineFirstRepository)
const getActivePromoCaseUse = new GetActivePromosCaseUse(promoOfflineFirstRepository)
const getAllPromoCaseUse = new GetAllPromosCaseUse(promoOfflineFirstRepository)
