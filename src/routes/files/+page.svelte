<script lang="ts">
    import { firebaseConfig } from "$lib/constants";
    import { initializeApp } from 'firebase/app';
    import { getAuth } from 'firebase/auth';
    import { getStorage, ref, listAll } from 'firebase/storage';
    import { Alert, Card } from "flowbite-svelte";
    import { Icon } from "flowbite-svelte-icons";

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);
    const storage = getStorage(app);

    let loggedIn = false;

    auth.onAuthStateChanged((user) => {
        loggedIn = !!user;
    });
</script>

{#if !loggedIn}
    <Alert color="red">
        <Icon name="exclamation-circle-outline" slot="icon" class="w-4 h-4"></Icon>
        <span class="font-medium">You are not logged in</span>
    </Alert>

    {:else}

    <div class="flex">
        {#await listAll(ref(storage, ''))}
                Loading...
            {:then files}
                {#each files.items as file}
                    <Card class="m-1 cursor-pointer" on:click={() => {console.log(file.name)}}>
                        <Icon name="file-outline" class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" />
                        <p>{file.name}</p>
                    </Card>
                {/each}
            {:catch error}
                <Alert color="red">
                    <Icon name="exclamation-circle-outline" slot="icon" class="w-4 h-4"></Icon>
                    <span class="font-medium">Error: {error.message}</span>
                </Alert>
        {/await}
    </div>
{/if}