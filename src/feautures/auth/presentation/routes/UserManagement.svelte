<script lang="ts">
    import { userManagementStore, type BusinessRole } from "../viewmodel/user-management.store";

    let name = "";
    let email = "";
    let password = "";
    let role: BusinessRole = "viewer";

    async function createUser() {
        if (!name.trim() || !email.trim() || password.length < 6) return;
        await userManagementStore.createUser({ name: name.trim(), email: email.trim(), password, role });
        name = ""; email = ""; password = ""; role = "viewer";
    }

    function handleRoleChange(userId: string, event: Event) {
        const select = event.currentTarget as HTMLSelectElement | null;
        if (!select) return;
        userManagementStore.setRole(userId, select.value as BusinessRole);
    }
</script>

<section class="card">
    <h2>Gestión de usuarios</h2>
    <div class="form">
        <input placeholder="Nombre" bind:value={name} />
        <input placeholder="Correo" bind:value={email} />
        <input placeholder="Password temporal" type="password" bind:value={password} />
        <select bind:value={role}>
            <option value="owner">owner</option><option value="admin">admin</option><option value="sales">sales</option><option value="viewer">viewer</option>
        </select>
        <button on:click={createUser}>Crear usuario</button>
    </div>

    {#each $userManagementStore.items as user}
        <article>
            <strong>{user.name}</strong> · {user.email}
            <div class="actions">
                <select value={user.role} on:change={(event) => handleRoleChange(user.id, event)}>
                    <option value="owner">owner</option><option value="admin">admin</option><option value="sales">sales</option><option value="viewer">viewer</option>
                </select>
                <button on:click={() => userManagementStore.toggleBlocked(user.id)}>{user.blocked ? "Desbloquear" : "Bloquear"}</button>
                <button on:click={() => userManagementStore.requestPasswordReset(user.id)}>Solicitar cambio password</button>
            </div>
        </article>
    {/each}
</section>

<style>.card{display:grid;gap:12px}.form,.actions{display:flex;gap:8px;flex-wrap:wrap}article{border:1px solid var(--md-sys-color-outline-variant);padding:10px;border-radius:12px}</style>