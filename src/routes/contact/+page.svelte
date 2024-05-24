<script lang="ts">
    import { Heading, Button, P, A, Popover, Hr } from "flowbite-svelte";
    import { Icon } from "flowbite-svelte-icons";
</script>

<Heading customSize="text-5xl font-extrabold" class="text-center">Contact me</Heading>

<Hr classHr="w-48 h-1 mx-auto my-4 rounded md:my-10" />

<P class="text-center">You can either <strong><A href="mailto:mail@jimiherken.de" id="mailText">send me an E-mail</A></strong> or contact me on my socials:</P>
<Popover triggeredBy="#mailText">
    mail@jimiherken.de
</Popover>

<div id="socials" class="py-2 flex items-center justify-center mt-2">
    <Button class="bg-socials-twitter hover:bg-socials-twitter mx-2" href="https://twitter.com/derjimbob" target="_blank"><Icon name="twitter-solid" class="w-4 h-4 mr-2" />Twitter</Button>
    <Button class="bg-socials-linkedin hover:bg-socials-linkedin mx-2" href="https://www.linkedin.com/in/jimi-herken/" target="_blank"><Icon name="linkedin-solid" class="w-4 h-4 mr-2" />LinkedIn</Button>
</div>