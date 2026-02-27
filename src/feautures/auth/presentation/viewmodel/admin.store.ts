import { writable } from "svelte/store";

export type Role = "owner" | "admin" | "sales" | "viewer";

export interface ManagedUser {
    id: string;
    name: string;
    email: string;
    role: Role;
    blocked: boolean;
    passwordResetRequested: boolean;
}

export interface ManagedCategory {
    id: string;
    name: string;
}

export interface ManagedProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    previousPrice?: number;
    photoUrl: string;
    categoryId: string;
}

export interface ManagedPromo {
    id: string;
    productId: string;
    title: string;
    discountPercent: number;
    previousPrice: number;
    newPrice: number;
    createdAt: string;
}

interface AdminState {
    users: ManagedUser[];
    categories: ManagedCategory[];
    products: ManagedProduct[];
    promos: ManagedPromo[];
}

const initialState: AdminState = {
    users: [
        { id: "u1", name: "Alejo", email: "alejo@taller.com", role: "owner", blocked: false, passwordResetRequested: false },
        { id: "u2", name: "Maria", email: "maria@taller.com", role: "sales", blocked: false, passwordResetRequested: false }
    ],
    categories: [
        { id: "c1", name: "Baterías" },
        { id: "c2", name: "Controladores" },
        { id: "c3", name: "Herramientas" }
    ],
    products: [
        {
            id: "p1",
            name: "BMS 4S",
            description: "Controlador de batería con protección.",
            price: 49,
            previousPrice: 55,
            photoUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
            categoryId: "c2"
        }
    ],
    promos: []
};

function uuid(prefix: string) {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function createAdminStore() {
    const { subscribe, update } = writable<AdminState>(initialState);

    return {
        subscribe,
        addUser(name: string, email: string, role: Role) {
            update((s) => ({ ...s, users: [...s.users, { id: uuid("u"), name, email, role, blocked: false, passwordResetRequested: false }] }));
        },
        setUserRole(id: string, role: Role) {
            update((s) => ({ ...s, users: s.users.map((u) => (u.id === id ? { ...u, role } : u)) }));
        },
        toggleUserBlocked(id: string) {
            update((s) => ({ ...s, users: s.users.map((u) => (u.id === id ? { ...u, blocked: !u.blocked } : u)) }));
        },
        requestPasswordReset(id: string) {
            update((s) => ({ ...s, users: s.users.map((u) => (u.id === id ? { ...u, passwordResetRequested: true } : u)) }));
        },
        addCategory(name: string) {
            update((s) => ({ ...s, categories: [...s.categories, { id: uuid("c"), name }] }));
        },
        renameCategory(id: string, name: string) {
            update((s) => ({ ...s, categories: s.categories.map((c) => (c.id === id ? { ...c, name } : c)) }));
        },
        deleteCategory(id: string) {
            update((s) => ({ ...s, categories: s.categories.filter((c) => c.id !== id) }));
        },
        createProduct(payload: Omit<ManagedProduct, "id">) {
            update((s) => ({ ...s, products: [...s.products, { ...payload, id: uuid("p") }] }));
        },
        updateProduct(payload: ManagedProduct) {
            update((s) => {
                const previous = s.products.find((p) => p.id === payload.id);
                const promos = [...s.promos];
                if (previous && payload.price < previous.price) {
                    const discountPercent = Math.round(((previous.price - payload.price) / previous.price) * 100);
                    promos.unshift({
                        id: uuid("promo"),
                        productId: payload.id,
                        title: `Promo por baja de precio: ${payload.name}`,
                        discountPercent,
                        previousPrice: previous.price,
                        newPrice: payload.price,
                        createdAt: new Date().toISOString()
                    });
                }

                return {
                    ...s,
                    promos,
                    products: s.products.map((p) =>
                        p.id === payload.id
                            ? { ...payload, previousPrice: previous?.price ?? payload.previousPrice }
                            : p
                    )
                };
            });
        },
        deleteProduct(id: string) {
            update((s) => ({ ...s, products: s.products.filter((p) => p.id !== id) }));
        }
    };
}

export const adminStore = createAdminStore();