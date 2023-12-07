<script lang="ts">
    import { initializeApp } from "firebase/app";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { collection, doc, getDoc, getFirestore, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore";
    import { getStorage, ref, getDownloadURL } from "firebase/storage";
    import { firebaseConfig } from "$lib/constants";
    import { Alert, Table, TableBody, TableHead, TableBodyRow, TableHeadCell, TableBodyCell, Badge } from "flowbite-svelte";
    import { Icon } from 'flowbite-svelte-icons';

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app), db = getFirestore(app), storage = getStorage(app);

    let authenticated = false, authorized = false, hasAdminPrivileges = false;
    let books: QueryDocumentSnapshot[] = [];

    onAuthStateChanged(auth, (user) => {
        authenticated = !!user;

        if (authenticated) {
            getDoc(doc(db, 'roles', 'admin')).then((doc) => {
                hasAdminPrivileges = !!doc.data().members.includes(user.uid);
            });

            getDoc(doc(db, 'roles', 'reader')).then((doc) => {
                authorized = !!doc.data().members.includes(user.uid);
                if (authorized) {
                    onSnapshot(collection(db, 'books'), bookSnapshots => {
                        books = bookSnapshots.docs;
                    });
                }
            });
        }
    });


</script>

{#if authorized}
    <Table striped={true}>
        <TableHead>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Author</TableHeadCell>
            <TableHeadCell>Published</TableHeadCell>
            <TableHeadCell>Tags</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each books as book}
                <TableBodyRow class="cursor-pointer" on:click={() => {
                    getDownloadURL(ref(storage, book.data().file)).then(url => {
                        window.open(url, '_blank').focus();
                    });
                }}>
                    <TableBodyCell>{book.data().title}</TableBodyCell>
                    {#await getDoc(book.data().author) then authorDoc}
                        <TableBodyCell>{`${authorDoc.data().lastName}, ${authorDoc.data().firstName}`}</TableBodyCell>
                    {/await}
                    <TableBodyCell>{book.data().published}</TableBodyCell>
                    <TableBodyCell>
                        {#if book.data().tags}
                            {#each book.data().tags as tag}
                                {#await getDoc(doc(db, 'tags', tag)) then tagDoc}
                                    <Badge color={tagDoc.data().color}>{tagDoc.data().stylized}</Badge>
                                {/await}
                            {/each}
                        {/if}
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
    {:else}
    <Alert border>
        <Icon slot="icon" name="exclamation-circle-solid"></Icon>
        <span>You are not authorized</span>
    </Alert>
{/if}