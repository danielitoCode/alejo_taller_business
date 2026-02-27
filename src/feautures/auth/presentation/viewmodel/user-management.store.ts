import { derived, writable } from "svelte/store";
import { authContainer } from "../../di/auth.container";
import type { UserDTO } from "../../data/dto/UserDTO";

export type BusinessRole = "owner" | "admin" | "sales" | "viewer";

export interface ManagedBusinessUser {
    id: string;
    name: string;
    email: string;
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
    items: [
        { id: "u1", name: "Alejo", email: "alejo@taller.com", role: "owner", blocked: false, passwordResetRequested: false }
    ],
    loading: false,
    saving: false,
    error: null
};

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

    async function createUser(payload: Pick<ManagedBusinessUser, "name" | "email" | "role"> & { password: string }): Promise<void> {
        await runSaving(async () => {
            await authContainer.repositories.accounts.createAccount({
                name: payload.name,
                email: payload.email,
                password: payload.password,
                role: payload.role,
                phone: "",
                photo_url: "",
                sub: "",
                verification: false
            } as Partial<UserDTO>);

            const id = `u-${Math.random().toString(36).slice(2, 9)}`;
            update((state) => ({
                ...state,
                items: [...state.items, { id, name: payload.name, email: payload.email, role: payload.role, blocked: false, passwordResetRequested: false }]
            }));
        });
    }

    async function setRole(id: string, role: BusinessRole): Promise<void> {
        await runSaving(async () => {
            await authContainer.repositories.accounts.updateRole(role);
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
        createUser,
        setRole,
        toggleBlocked,
        requestPasswordReset
    };
}

export const userManagementStore = createUserManagementStore();