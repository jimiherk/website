<script lang="ts">
    import { firebaseConfig } from "$lib/constants";
    import { initializeApp } from 'firebase/app';
    import { getStorage, ref, getMetadata, getBlob, deleteObject } from 'firebase/storage';
    import { page } from "$app/stores";
    import { Heading, Button, Alert, A } from "flowbite-svelte";
    import { Icon } from "flowbite-svelte-icons";
    import { getFileIcon, convertBytes } from "$lib/functions";
    import { onAuthStateChanged, getAuth } from "firebase/auth";
    import { doc, getDoc, getFirestore } from "firebase/firestore";
    const app = initializeApp(firebaseConfig);

    const storage = getStorage(app), auth = getAuth(app), db = getFirestore(app);

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
</script>

{#if !$page.url.searchParams.has('file')}
    <Alert color="red">
        <Icon name="exclamation-circle-outline" slot="icon" class="w-4 h-4"></Icon>
        <span class="font-medium">Error: No file specified. Please <strong><A href="/files">return to file overview</A></strong></span>
    </Alert>
    {:else}
    {#await getMetadata(ref(storage, `files/${$page.url.searchParams.get('file')}`)) then fileMetaData}
        <div class="flex flex-col w-1/2 mx-auto  mt-14">
            <div class="flex flex-row items-center">
                <Icon name="{getFileIcon(fileMetaData.name)}-outline" class="w-20 h-20 mr-4 text-gray-500 dark:text-gray-400" />
                <Heading class="break-words">{fileMetaData.name}</Heading>
            </div>
            <ul class="grid grid-cols-2 mt-6 gap-3">
                <li class="break-words"><strong>Size:</strong> {convertBytes(fileMetaData.size)}</li>
                <li class="break-words"><strong>Content type:</strong> {fileMetaData.contentType}</li>
                <li class="break-words"><strong>Time created:</strong> {new Date(fileMetaData.timeCreated)}</li>
                <li class="break-words"><strong>MD5 hash:</strong> {fileMetaData.md5Hash}</li>
            </ul>
            <Button class="mt-3" on:click={() => {
                getBlob(ref(storage, `files/${$page.url.searchParams.get('file')}`))
                        .then(blob => {
                              const link = document.createElement('a');
                              link.href = URL.createObjectURL(blob);
                              link.download = fileMetaData.name;

                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                        })
                        .catch(error => {
                            console.log(error);
                        });
            }}>
                <Icon name="download-outline" class="w-3.5 h-3.5 mr-2" />Download
            </Button>
            {#if hasAdminPrivileges}
                <Button class="mt-3" color="red" on:click={() => {
                    deleteObject(ref(storage, `files/${$page.url.searchParams.get('file')}`)).then(() => {
                        window.location.href = '/files';
                    });
                }}>
                    <Icon name="trash-bin-outline" class="w-3.5 h-3.5 mr-2" />Delete
                </Button>
            {/if}
        </div>
        {:catch error}
        <Alert color="red">
            <Icon name="exclamation-circle-outline" slot="icon" class="w-4 h-4"></Icon>
            <span class="font-medium">There has been an error: {error.code}. Please <strong><A href="/files">return to file overview</A></strong></span>
        </Alert>

    {/await}
{/if}