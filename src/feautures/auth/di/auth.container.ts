import {UserNetRepositoryImpl} from "../data/repository/user.net.repository";
import {infrastructureContainer} from "../../../infrastructure/di/infrastructure.container";
import {CreateAccountCaseUse} from "../domain/caseuse/CreateAccountCaseUse";
import {UpdateNameCaseUse} from "../domain/caseuse/UpdateNameCaseUse";
import {UpdatePasswordCaseUse} from "../domain/caseuse/UpdatePasswordCaseUse";
import {DeleteUserCaseUse} from "../domain/caseuse/DeleteUserCaseUse";
import {UpdateRoleCaseUse} from "../domain/caseuse/UpdateRoleCaseUse";
import {UpdatePhotoCaseUse} from "../domain/caseuse/UpdatePhotoCaseUse";
import {UpdatePhoneCaseUse} from "../domain/caseuse/UpdatePhoneCaseUse";
import {SessionNetManagerImpl} from "../data/repository/session.net.manager";
import {OpenSessionCaseUse} from "../domain/caseuse/OpenSessionCaseUse";
import {CloseSessionsCaseUSe} from "../domain/caseuse/CloseSessionsCaseUSe";

// Account instance
const accounts = infrastructureContainer.appwrite.account

// Data
const authNetRepository = new UserNetRepositoryImpl(accounts)
const sessionNetManager = new SessionNetManagerImpl(accounts)

// Domain
const createAccountCaseUse = new CreateAccountCaseUse(authNetRepository)
const updateNameCaseUse = new UpdateNameCaseUse(authNetRepository)
const updatePasswordCaseUse = new UpdatePasswordCaseUse(authNetRepository)
const updatePhotoUrlCaseUse = new UpdatePhotoCaseUse(authNetRepository)
const updatePhoneCaseUse = new UpdatePhoneCaseUse(authNetRepository)
const updateRoleCaseUse = new UpdateRoleCaseUse(authNetRepository)
const deleteUserCaseUse = new DeleteUserCaseUse(authNetRepository)
const opeSessionCaseUse = new OpenSessionCaseUse(sessionNetManager)
const closeSessionCaseUSe = new CloseSessionsCaseUSe(sessionNetManager)

export const authContainer = {
    repositories: {
        accounts: authNetRepository,
        sessions: sessionNetManager
    },
    useCases: {
        accounts: {
            createAccount: createAccountCaseUse.execute,
            updateName: updateNameCaseUse.execute,
            updatePassword: updatePasswordCaseUse.execute,
            updatePhotoUrl: updatePhotoUrlCaseUse.execute,
            updatePhone: updatePhoneCaseUse.execute,
            updateRole: updateRoleCaseUse.execute,
            deleteUser: deleteUserCaseUse.execute
        },
        sessions: {
            openSession: opeSessionCaseUse,
            closeSession: closeSessionCaseUSe,
        }
    }
}