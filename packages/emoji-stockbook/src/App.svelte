<script lang="ts">
  import ComponentDebugger from "./ComponentDebugger.svelte";

  let flag = $state(true);
</script>

{#if flag}
  <ComponentDebugger />
{/if}

<button onclick={() => (flag = false)}>delete</button>
<hr />
<ComponentDebugger />
