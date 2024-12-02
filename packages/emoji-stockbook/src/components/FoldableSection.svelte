<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title = "",
    expanded = $bindable(true),
    content,
    disabled = false,
  }: {
    title?: string;
    expanded: boolean;
    content: Snippet;
    disabled?: boolean;
  } = $props();

  const getRandomId = () => `${Math.floor(Math.random() * 1000000000)}`;
  const invokerId = getRandomId();
  const contentId = getRandomId();

  const ifEnabled = <T,>(v: T) => (disabled ? undefined : v);
</script>

<section>
  {#if title}
    {#if disabled}
      <h3>{title}</h3>
    {:else}
      <button
        id={invokerId}
        aria-controls={contentId}
        aria-expanded={expanded ? "true" : "false"}
        onclick={() => (expanded = !expanded)}
      >
        <h3>{title}</h3>
      </button>
    {/if}
  {/if}

  <div
    id={contentId}
    role="region"
    aria-labelledby={ifEnabled(invokerId)}
    hidden={ifEnabled(!expanded)}
  >
    {@render content()}
  </div>
</section>
