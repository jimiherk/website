<script lang="ts">
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<form method="POST" action="?/login">
    <h1>Log in to access this part of the page</h1>
    <label for="username">Username</label>
    <input type="text" name="username">
    <label for="password">Password</label>
    <input type="password" name="password">
    <button type="submit">Submit</button>
    <a href="/">Return to the homepage</a>
</form>

<style lang="scss">
    form {
      display: flex;
      flex-direction: column;
      width: 30%;
      margin: 50px auto auto;
      font-family: "Inter", sans-serif;

      h1 {
        font-weight: 1000;
      }

      input {
        font-size: 1rem;
        margin-bottom: 5px;
        border: solid black 3px;
        padding: 1ch;
      }

      button {
        background-color: black;
        color: white;
        padding: 10px;
        font-size: 1rem;
        outline: none;
        border: 3px solid black;
        cursor: pointer;

        &:hover {
          background-color: white;
          color: black;
        }
      }

      a {
        text-decoration: none;
        color: #0000af;
        font-weight: 700;
        text-align: center;
        margin-top: 50px;
      }
    }
</style>