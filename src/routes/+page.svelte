<script lang="ts">
    import { Heading, P, A, Popover, Hr } from "flowbite-svelte";
    import { Icon } from "flowbite-svelte-icons";
</script>

<Heading customSize="text-7xl font-extrabold" class="text-center">Hey there!</Heading>

<Hr classHr="w-48 h-1 mx-auto my-4 rounded md:my-10" />

<div class="w-1/2 mx-auto mt-16">
    <Heading customSize="text-3xl font-extrabold">About me:</Heading>
    <P class="mt-3">
        My name's <strong>Jimi</strong> and I'm a student in Germany.<br>
        I am doing some work in <strong class="text-languages-javascript">JavaScript</strong>, <strong class="text-languages-typescript">TypeScript</strong> and <strong class="text-languages-rust">Rust</strong> for fun, for more check out my <strong><A href="https://github.com/jimiherk" target="_blank">GitHub</A></strong>.<br>
        To find out more about me, take a look at my <strong><A id="socials">socials</A></strong> or <strong><A href="/contact">contact me</A></strong>.<br>
    </P>
    <Popover triggeredBy="#socials" class="flex flex-row">
        <A class="text-socials-github mx-0.5" href="https://github.com/jimiherk" target="_blank"><Icon name="github-solid" /></A>
        <A class="text-socials-twitter mx-0.5" href="https://twitter.com/derjimbob" target="_blank"><Icon name="twitter-solid" /></A>
        <A class="text-socials-linkedin mx-0.5" href="https://www.linkedin.com/in/jimi-herken/" target="_blank"><Icon name="linkedin-solid" /></A>
        <A class="text-socials-youtube" href="https://www.youtube.com/@jimiherk" target="_blank"><Icon name="youtube-solid" /></A>
    </Popover>
</div>