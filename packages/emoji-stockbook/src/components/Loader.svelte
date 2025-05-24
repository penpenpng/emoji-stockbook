<script lang="ts">
  import { useTranslation } from "@/lib/use-translation";
  import { onMount } from "svelte";
  import IconLoader from "./icon/IconLoader.svelte";

  const {
    wait = 500,
  }: {
    wait?: number;
  } = $props();

  const { t } = useTranslation();

  let showLoader = $state(false);

  onMount(() => {
    const time = setTimeout(() => {
      showLoader = true;
    }, wait);

    return () => {
      clearTimeout(time);
    };
  });
</script>

{#if showLoader}
  <div class="loader">
    <IconLoader alt={t("a11y.loading")} />
  </div>
  <div class="loader-text">
    {t("a11y.loading")}
  </div>
{/if}

<style>
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .loader {
    --icon-size: 3rem;

    width: var(--icon-size);
    height: var(--icon-size);
    animation: spin 2s linear infinite;
  }

  .loader-text {
    display: none;
  }

  @media (prefers-reduced-motion) {
    .loader {
      display: none;
      animation: none;
    }

    .loader-text {
      display: block;
    }
  }
</style>
