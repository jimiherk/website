<script lang="ts">
  import "../app.postcss";
  import {
      Navbar,
      NavLi,
      NavUl,
      NavHamburger,
      Button,
  } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import { firebaseConfig } from "$lib/constants";
  import { initializeApp } from 'firebase/app';
  import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

  let loggedIn = false;

  let navbarPages: { path: string, name: string }[] = [
      { path: "/", name: "Home" },
      { path: "/contact", name: "Contact me" },
      { path: "/files", name: "Files" }
  ];

  let app = initializeApp(firebaseConfig);

  let auth = getAuth(app);

  auth.onAuthStateChanged(user => {
      loggedIn = !!user;
  });
</script>

<Navbar let:hidden let:toggle>
    <div class="flex items-center md:order-2">
        {#if loggedIn}
            <Button on:click={() => auth.signOut()}>Logout</Button>
            {:else}
            <Button on:click={() => signInWithPopup(auth, new GoogleAuthProvider())}>Login</Button>
        {/if}
        <NavHamburger on:click={toggle} class1="w-full md:flex md:w-auto md:order-1" />
    </div>
    <NavUl {hidden}>
        {#each navbarPages as navbarPage}
            <NavLi href={navbarPage.path} active={$page.url.pathname === navbarPage.path}>{navbarPage.name}</NavLi>
        {/each}
    </NavUl>
</Navbar>

<div class="mx-5">
    <slot />
</div>