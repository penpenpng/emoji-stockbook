<script lang="ts">
  import { useFoldables } from "@/lib/use-foldables";
  import { useTranslation } from "@/lib/use-translation";
  import { type Snippet, onMount } from "svelte";
  import IconChevronDown from "./icon/IconChevronDown.svelte";
  import IconChevronRight from "./icon/IconChevronRight.svelte";

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
            <IconChevronDown alt={t("foldable.a11y.close")} />
          {:else}
            <IconChevronRight alt={t("foldable.a11y.open")} />
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
  .title {
    padding-block: 0.2em;
  }

  button {
    display: flex;
    align-items: center;
    width: 100%;
  }
</style>
