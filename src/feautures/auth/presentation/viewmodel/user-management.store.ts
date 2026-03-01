import { derived, writable } from "svelte/store";
import { authContainer } from "../../di/auth.container";
import type { UserDTO } from "../../data/dto/UserDTO";

export type BusinessRole = "owner" | "admin" | "sales" | "viewer";

export interface ManagedBusinessUser {
    id: string;
    name: string;
    email: string;
    photoUrl: string;
    role: BusinessRole;
    blocked: boolean;
    passwordResetRequested: boolean;
}

interface UserManagementState {
    items: ManagedBusinessUser[];
    loading: boolean;
    saving: boolean;
    error: string | null;
}

const initialState: UserManagementState = {
    items: [],
    loading: false,
    saving: false,
    error: null
};

function mapRole(role: unknown): BusinessRole {
    if (role === "owner" || role === "admin" || role === "sales" || role === "viewer") {
        return role;
    }

    return "viewer";
}

function mapUserDTOToManagedUser(user: Partial<UserDTO>): ManagedBusinessUser | null {
    if (!user.id || !user.email) {
        return null;
    }

    return {
        id: user.id,
        name: user.name ?? user.email,
        email: user.email,
        photoUrl: user.photo_url ?? "",
        role: mapRole(user.role),
        blocked: false,
        passwordResetRequested: false,
    };
}

function normalizeError(error: unknown): string {
    return error instanceof Error ? error.message : "Unexpected error";
}

function createUserManagementStore() {
    const { subscribe, update } = writable<UserManagementState>(initialState);

    async function runSaving<T>(task: () => Promise<T>): Promise<T> {
        update((state) => ({ ...state, saving: true, error: null }));
        try {
            return await task();
        } catch (error) {
            update((state) => ({ ...state, error: normalizeError(error) }));
            throw error;
        } finally {
            update((state) => ({ ...state, saving: false }));
        }
    }

    async function syncAll(): Promise<void> {
        await runLoading(async () => {
            const currentUser = await authContainer.useCases.accounts.getCurrentUser();
            const managed = mapUserDTOToManagedUser(currentUser);

            update((state) => ({
                ...state,
                items: managed ? [managed] : []
            }));
        });
    }

    async function runLoading<T>(task: () => Promise<T>): Promise<T> {
        update((state) => ({ ...state, loading: true, error: null }));
        try {
            return await task();
        } catch (error) {
            update((state) => ({ ...state, error: normalizeError(error) }));
            throw error;
        } finally {
            update((state) => ({ ...state, loading: false }));
        }
    }


    async function createUser(payload: Pick<ManagedBusinessUser, "name" | "email" | "role"> & { password: string }): Promise<void> {
        await runSaving(async () => {
            await authContainer.useCases.accounts.createAccount({
                name: payload.name,
                email: payload.email,
                password: payload.password,
                role: payload.role,
                phone: "",
                photo_url: "",
                sub: "",
                verification: false
            } as Partial<UserDTO>);

            await syncAll();
        });
    }

    async function setRole(id: string, role: BusinessRole): Promise<void> {
        await runSaving(async () => {
            await authContainer.useCases.accounts.updateRole(role);
            update((state) => ({ ...state, items: state.items.map((u) => (u.id === id ? { ...u, role } : u)) }));
        });
    }

    function toggleBlocked(id: string): void {
        update((state) => ({ ...state, items: state.items.map((u) => (u.id === id ? { ...u, blocked: !u.blocked } : u)) }));
    }

    function requestPasswordReset(id: string): void {
        update((state) => ({ ...state, items: state.items.map((u) => (u.id === id ? { ...u, passwordResetRequested: true } : u)) }));
    }

    const hasUsers = derived({ subscribe }, ($state) => $state.items.length > 0);

    return {
        subscribe,
        hasUsers,
        syncAll,
        createUser,
        setRole,
        toggleBlocked,
        requestPasswordReset
    };
}

export const userManagementStore = createUserManagementStore();