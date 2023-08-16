<script lang="ts">
    import { firebaseConfig } from "$lib/constants";
    import { initializeApp } from 'firebase/app';
    import { getAuth } from 'firebase/auth';
    import { getStorage, ref, listAll, getBlob } from 'firebase/storage';
    import { Alert, Card } from "flowbite-svelte";
    import { Icon } from "flowbite-svelte-icons";
    import empty from "$lib/assets/img/empty.svg";

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
        {#await listAll(ref(storage, 'files'))}
                Loading...
            {:then files}
                {#if files.items.length === 0}
                    <img src={empty} alt="An empty folder" class="m-auto">
                {/if}
                {#each files.items as file}
                    <Card class="m-1 cursor-pointer" on:click={() => {
                        getBlob(file)
                            .then(blob => {
                                  const link = document.createElement('a');
                                  link.href = URL.createObjectURL(blob);
                                  link.download = file.name;

                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }}>
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