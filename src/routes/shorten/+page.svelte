<script lang="ts">
    import { firebaseConfig, urlRegex } from "$lib/constants";
    import { initializeApp } from 'firebase/app';
    import {
        getFirestore,
        getDoc,
        doc,
        setDoc,
        Timestamp,
        query,
        where,
        collection,
        deleteDoc,
        onSnapshot,
        QueryDocumentSnapshot,
    } from 'firebase/firestore';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { Icon } from "flowbite-svelte-icons";
    import {
        Alert,
        Input,
        Button,
        Label,
        Helper,
        Toast,
        Tooltip,
        Heading,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        ButtonGroup,
        A
    } from 'flowbite-svelte';
    import { onMount } from "svelte";

    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app), auth = getAuth(app);

    onMount(() => {
        const queryParams = new URLSearchParams(window.location.search);

        if (queryParams.has("id")) {
            let id = queryParams.get("id");
            getDoc(doc(db, "urls", id)).then(doc => {
                if (doc.exists()) {
                    window.location.href = doc.data().target;
                } else {
                    window.location.href = "/shorten";
                }
            });
        }
    });

    let authenticated = false;

    let ownedUrls: QueryDocumentSnapshot[] = [];

    onAuthStateChanged(auth, (user) => {
        authenticated = !!user;

        if (authenticated) {
            const q = query(collection(db, "urls"), where("owner", "==", auth.currentUser.uid));
            onSnapshot(q, (querySnapshot) => {
                ownedUrls = [];
                querySnapshot.forEach((doc) => {
                    ownedUrls.push(doc);
                });

                ownedUrls.sort((a, b) => {
                    return b.data().created.toDate() - a.data().created.toDate();
                });
            });
        }
    });

    let url = "", id = "", success = false;
</script>

{#if !authenticated}
    <Alert border dismissable>
        <Icon name="exclamation-circle-outline" slot="icon"></Icon>
        <span class="font-medium">You are not logged in!</span>
        Unauthenticated URLs only have a limited lifespan if they're not claimed by an admin.
    </Alert>
{/if}

<div class="mb-6">
    <Label for="url" class="block mb-2">URL</Label>
    <Input id="url" placeholder="The URL to shorten" color={url.length === 0 ? "gray" : urlRegex.test(url) ? "green" : "red"} on:keypress={event => {
        url = event.target.value;
    }}/>
    {#if url.length > 0 && !urlRegex.test(url)}
        <Helper color="red" class="mt-2"><span class="font-medium">This is not a valid URL!</span></Helper>
    {/if}
</div>

<div class="mb-6">
    <Label for="id" class="block mb-2">ID</Label>
    <Input id="id" placeholder="Your custom ID" />
</div>

<Button on:click={() => {
    let id = document.getElementById("id").value, url = document.getElementById("url").value;

    if (url.length === 0 || !urlRegex.test(url)) {
        return;
    }

    getDoc(doc(db, "urls", id)).then(doc => {
        if (doc.exists()) {
            return;
        }
    });

    setDoc(doc(db, "urls", id), {
        target: url,
        created: new Timestamp(Date.now() / 1000, 0),
        owner: authenticated ? auth.currentUser.uid : null,
    }).then(() => {
        document.getElementById("url").value = "";
        document.getElementById("id").value = "";
        success = true;
    }).catch(error => {
        console.error(error);
    });
}}>
    <Icon name="link-outline" class="mr-1"></Icon>
    <span>Shorten</span>
</Button>

<Toast bind:open={success} color="green" class="mt-4 absolute">
    <svelte:fragment slot="icon">
        <Icon name="check-circle-solid" class="w-5 h-5" />
        <span class="sr-only">Check icon</span>
    </svelte:fragment>
    <div class="flex align-middle">
        <span class="font-medium">URL shortened!</span>
        <Icon id="copyButton" name="file-copy-outline" class="ml-1 outline-none text-gray-500 hover:text-primary-500 cursor-pointer" on:click={() => {
            navigator.clipboard.writeText(`${window.location.origin}/shorten?id=${id}`);
        }}/>
        <Tooltip trigger="hover" triggeredBy="#copyButton">Copy URL</Tooltip>
    </div>
</Toast>

{#if authenticated}
    <Heading tag="h4" class="mt-5">Your URLs</Heading>
    <Table class="mt-4" striped={true}>
        <TableHead>
            <TableHeadCell>URL</TableHeadCell>
            <TableHeadCell>Target</TableHeadCell>
            <TableHeadCell>Created</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each ownedUrls as url}
                    <TableBodyRow>
                        <TableBodyCell><A href="{window.location.origin}/shorten?id={url.id}" target="_blank">{window.location.origin}/shorten?id={url.id}</A></TableBodyCell>
                        <TableBodyCell><A href="{url.data().target}" target="_blank">{url.data().target}</A></TableBodyCell>
                        <TableBodyCell>{url.data().created.toDate().toLocaleString()}</TableBodyCell>
                        <TableBodyCell>
                            <ButtonGroup>
                                <Button color="red" on:click={() => {
                                    deleteDoc(doc(db, "urls", url.id));
                                }}>
                                    <Icon name="trash-bin-outline" class="mr-1"></Icon>
                                </Button>
                            </ButtonGroup>
                        </TableBodyCell>
                    </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
{/if}