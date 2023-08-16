<script lang="ts">
    import { page } from '$app/stores';
    import { Heading } from "flowbite-svelte";
</script>

<Heading customSize="text-9xl font-extrabold" class="text-center">{$page.status}</Heading>
<p class="flex justify-center text-4xl font-bold">{$page.error?.message}</p>

{#if $page.status === 404}
    <p class="flex justify-center mt-5">The route <strong class="mx-1">{decodeURI($page.url.pathname)}</strong> doesn't exist.</p>
{/if}