<script lang="ts">
    import { firebaseConfig } from "$lib/constants";
    import { initializeApp } from 'firebase/app';
    import { getStorage, ref, listAll, getMetadata, uploadBytes } from 'firebase/storage';
    import { getFirestore, getDoc, doc } from 'firebase/firestore';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { Alert, Card } from "flowbite-svelte";
    import { Icon } from "flowbite-svelte-icons";
    import empty from "$lib/assets/img/empty.svg";
    import { convertBytes, getFileIcon } from "$lib/functions";

    const app = initializeApp(firebaseConfig);

    const storage = getStorage(app), db = getFirestore(app), auth = getAuth(app);

    let hasAdminPrivileges = false;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            getDoc(doc(db, 'roles', 'admin')).then((doc) => {
                if (doc.data().members.includes(user.uid)) {
                    hasAdminPrivileges = true;
                }
            });
        }
        hasAdminPrivileges = false;
    });

    function userFileSelect() {
        const input: HTMLInputElement = document.createElement('input');
        input.type = 'file';
        input.onchange = e => {
            const file = (<HTMLInputElement>e.target).files[0];
            uploadBytes(ref(storage, `files/${file.name}`), file).then(() => {
                window.location.reload();
            });
        };
        input.click();
    }
 </script>

<div class="flex mt-2">
    {#if hasAdminPrivileges}
        <Card class="m-1 cursor-pointer select-none bg-primary-500 text-white" on:click={() => userFileSelect()}>
            <Icon name="file-circle-plus-outline" class="w-7 h-7 mb-3" />
            <p><strong>Add new</strong></p>
            <p>Logged in as {auth.currentUser.displayName}</p>
        </Card>
    {/if}
    {#await listAll(ref(storage, 'files'))}
            Loading...
        {:then files}
            {#if files.items.length === 0}
                <img src={empty} alt="An empty folder" class="m-auto">
            {/if}
            {#each files.items as file}
                <Card class="m-1 cursor-pointer select-none" on:click={() => { window.open(`/files/view?file=${file.name}`, '_self') }}>
                    <Icon name="{getFileIcon(file.name)}-outline" class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" />
                    <p><strong>{file.name}</strong></p>
                    {#await getMetadata(file) then metadata}
                            <p>{convertBytes(metadata.size)}</p>
                        {:catch error}
                            <p>Error: {error}</p>
                    {/await}
                </Card>
            {/each}
        {:catch error}
            <Alert color="red">
                <Icon name="exclamation-circle-outline" slot="icon" class="w-4 h-4"></Icon>
                <span class="font-medium">Error: {error.message}</span>
            </Alert>
    {/await}
</div>