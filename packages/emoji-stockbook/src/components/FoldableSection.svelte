<script lang="ts">
  import { useFoldables, useTranslation } from "@/lib";
  import { type Snippet, onMount } from "svelte";
  import { IconChevronDown, IconChevronRight } from "./icon";

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
  const { t } = useTranslation();

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
    <div class="title">
      {#if disabled}
        <h3>{title}</h3>
      {:else}
        <button
          id={invokerId}
          aria-controls={contentId}
          aria-expanded={expanded ? "true" : "false"}
          onclick={() => (expanded = !expanded)}
        >
          {#if expanded}
            <IconChevronDown alt="" />
          {:else}
            <IconChevronRight alt="" />
          {/if}

          <h3>{title}</h3>
        </button>
      {/if}
    </div>
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

<style>
  /* reset */
  button {
    padding: 0;
    appearance: none;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  .title {
    padding: 0.25rem;
    background-color: var(--section-title-background-color);
  }

  h3 {
    padding-inline: 4px;
    margin-block: 2px;
  }

  button {
    display: flex;
    align-items: center;
    width: 100%;
  }

  button:focus {
    outline: var(--focus-outline-width) solid var(--color-control-active);

    --font-color-icon: var(--color-control-active);
  }

  [role="region"] {
    padding-block: 0.25rem;
  }
</style>
