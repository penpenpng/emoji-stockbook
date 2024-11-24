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
    <button
      id={invokerId}
      aria-controls={ifEnabled(contentId)}
      aria-expanded={ifEnabled(expanded ? "true" : "false")}
      onclick={ifEnabled(() => (expanded = !expanded))}
    >
      <h3>{title}</h3>
    </button>
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
