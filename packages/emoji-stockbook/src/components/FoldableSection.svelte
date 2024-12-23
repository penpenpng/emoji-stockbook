<script lang="ts">
  import { type Snippet, onMount } from "svelte";
  import { useFoldables } from "../lib/use-foldables";

  let {
    title = "",
    expanded = $bindable(true),
    children,
    disabled = false,
  }: {
    title?: string;
    expanded: boolean;
    children?: Snippet;
    disabled?: boolean;
  } = $props();

  const getRandomId = () => `${Math.floor(Math.random() * 1000000000)}`;
  const invokerId = getRandomId();
  const contentId = getRandomId();

  const ifEnabled = <T,>(v: T) => (disabled || !children ? undefined : v);

  const foldables = useFoldables();

  onMount(() => {
    const operator = {
      open() {
        expanded = true;
      },
      close() {
        expanded = false;
      },
    };

    foldables.registerFoldable(operator);

    return () => {
      foldables.unregisterFoldable(operator);
    };
  });
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
    {@render children?.()}
  </div>
</section>
