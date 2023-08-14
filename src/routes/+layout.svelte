<script lang="ts">
  import "../app.postcss";
  import {
      Navbar,
      NavLi,
      NavUl,
      NavHamburger,
  } from 'flowbite-svelte';
  import { page } from '$app/stores';

  let navbarPages: { path: string, name: string }[] = [
      { path: "/", name: "Home" },
      { path: "/contact", name: "Contact me" },
  ];
</script>

<Navbar let:hidden let:toggle>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
        {#each navbarPages as navbarPage}
            <NavLi href={navbarPage.path} active={$page.url.pathname === navbarPage.path}>{navbarPage.name}</NavLi>
        {/each}
    </NavUl>
</Navbar>

<div class="mx-5">
    <slot />
</div>