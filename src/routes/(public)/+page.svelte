<script lang="ts">
    import Icon from "@iconify/svelte";
</script>

<h1>Hey there!</h1>
<p>
    My name's <span class="name">Jimi</span> and I'm a <Icon icon="flagpack:de" />/<Icon icon="flagpack:se" /> student in Berlin.<br>
    I do stuff in <span class="js" style="color:#F0DB4FFF">JavaScript</span>, <span class="ts" style="color:#3178C6FF">TypeScript</span> and <span class="rs" style="color:#CE422BFF">Rust</span> among others for fun, for more check out my <a href="https://github.com/jimiherk" target="_blank">GitHub</a> or <a href="mailto:mail@jimiherken.de">send me an E-mail</a>
</p>

<style lang="scss">
    h1 {
      margin-top: 10%;
      font-size: 4rem;
      font-family: Inter, "sans-serif";
      letter-spacing: 0;
      font-weight: 1000;
      margin-bottom: 0;
    }

    p {
      font-family: Inter, "sans-serif";
      font-size: 1rem;

      span{
        &.name {
          font-family: "Gaegu", sans-serif;
        }

        &.js, &.ts, &.rs {
          font-weight: 700;
        }
      }

      a {
        text-decoration: none;
        color: #0000af;
        font-weight: 700;
      }
    }
</style>