<script lang="ts">
    import Icon from "@iconify/svelte";
</script>

<div class="wrapper">
    <div class="header">
        <div class="left">
            <span class="logo">Jimi</span>
        </div>
    </div>
    <div class="content">
        <slot />

    </div>
    <div class="footer">
        <div class="socials">
            <a href="https://x.com/derjimbob" target="_blank" data-brand="twitter"><Icon icon="ri:twitter-fill" /></a>
            <a href="https://github.com/jimiherk" target="_blank" data-brand="github"><Icon icon="fa6-brands:github" /></a>
            <a href="https://www.linkedin.com/in/jimi-herken/" target="_blank" data-brand="linkedin"><Icon icon="fa6-brands:linkedin-in" /></a>
        </div>
        <div class="links">
            <!--<a href="https://pastebin.com/1Yb1ipZN">Privacy policy</a>-->
        </div>
        <span class="copyright">&#169; 2024, Jimi Herken</span>
    </div>
</div>



<style lang="scss">
    div.wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;

      div.header {
        width: 100vw;
        height: 7.5vh;
        background-color: black;
        color: white;
        display: flex;
        align-items: center;

        .left {
          margin-left: 2%;
          margin-right: auto;

          span.logo {
            font-family: "Gaegu", sans-serif;
            font-size: 200%;
          }
        }
      }

      div.content {
        flex: 1;
        padding-left: 10vw;
        flex-direction: column;
        display: flex;
      }

      div.footer {
        background-color: #f1f1f1;
        min-height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: "Inter", sans-serif;
        color: #545454;

        .socials {
          margin-top: 10px;
          a {
            text-decoration: none;
            color: inherit;
            font-size: 2rem;
            margin: 5px;
            transition: .2s;

            &[data-brand="twitter"] {
              &:hover { color: #1da1f2 }
            }
            &[data-brand="github"] {
              &:hover { color: #333 }
            }
            &[data-brand="linkedin"] {
              &:hover { color: #0077B5 }
            }
          }
        }
      }
    }
</style>