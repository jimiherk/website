<script lang="ts">
    import { firebaseConfig } from "$lib/constants";
    import { initializeApp } from 'firebase/app';
    import { getStorage, ref, getMetadata, getDownloadURL, getBlob } from 'firebase/storage';
    import { page } from "$app/stores";
    import { Heading, Button, Alert, A } from "flowbite-svelte";
    import { Icon } from "flowbite-svelte-icons";
    import { getFileIcon, convertBytes } from "$lib/functions";
    const app = initializeApp(firebaseConfig);

    const storage = getStorage(app);
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
                <Heading>{fileMetaData.name}</Heading>
            </div>
            <ul class="grid grid-cols-2 mt-6 gap-3">
                <li><strong>Size:</strong> {convertBytes(fileMetaData.size)}</li>
                <li><strong>Content type:</strong> {fileMetaData.contentType}</li>
                <li><strong>Time created:</strong> {new Date(fileMetaData.timeCreated)}</li>
                <li><strong>MD5 hash:</strong> {fileMetaData.md5Hash}</li>
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
        </div>
        {:catch error}
        <Alert color="red">
            <Icon name="exclamation-circle-outline" slot="icon" class="w-4 h-4"></Icon>
            <span class="font-medium">There has been an error: {error.code}. Please <strong><A href="/files">return to file overview</A></strong></span>
        </Alert>

    {/await}
{/if}