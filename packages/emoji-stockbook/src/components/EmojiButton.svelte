<script lang="ts">
  import { useCustomElementEventDispatcher } from "../lib/use-custom-element-event-dispatcher";
  import { useCustomElementVisibility } from "../lib/use-custom-element-visibility";
  import type { NormalizedEmoji } from "../types";

  let { emoji }: { emoji: NormalizedEmoji } = $props();

  const { hide } = useCustomElementVisibility();
  const dispatch = useCustomElementEventDispatcher();

  const onclick = () => {
    dispatch("pick", emoji);
    hide();
  };
</script>

<button {onclick}>
  {#if "char" in emoji}
    <!-- native emoji -->
    {emoji.char}
  {:else}
    <!-- custom emoji -->
    <img alt={emoji.name ?? emoji.shortcode} src={emoji.src} />
  {/if}
</button>

<style>
  /* Reset CSS */
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    /* outline: none; */ /* For a11y reason */
    padding: 0;
    appearance: none;
  }

  /* Styles */
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
  button:hover {
    background-color: rgb(223, 223, 223);
  }
  button:active {
    background-color: rgb(204, 204, 204);
  }
</style>
