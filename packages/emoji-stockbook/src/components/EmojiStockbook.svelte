<script lang="ts">
  import { useTranslation } from "@/lib/use-translation";
  import RegionContent from "./RegionContent.svelte";
  import RegionControl from "./RegionControl.svelte";
  import RegionInfo from "./RegionInfo.svelte";

  const { t } = useTranslation();
</script>

<section class="emoji-stockbook" aria-label={t("element.a11y.label")}>
  <div class="region-control">
    <RegionControl />
  </div>
  <div class="region-content">
    <RegionContent />
  </div>
  <div class="region-info">
    <RegionInfo />
  </div>
</section>

<style>
  .emoji-stockbook {
    display: flex;
    flex-direction: column;
    width: var(--width, min-content);
    height: var(--height);
  }

  .region-control {
    flex: 0 0 min-content;
  }

  .region-content {
    flex-grow: 1;
    overflow-y: scroll;
  }

  .region-info {
    flex: 0 0 3rem;
  }

  /* stylelint-disable-next-line selector-pseudo-class-no-unknown -- :global is allowed as a svelte-specific syntax. */
  :global .emoji-stockbook {
    * {
      font-family: var(--font-family);
      font-size: 1rem;
      color: var(--font-color);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      padding: 0;
      margin: 0;
      font-size: 1rem;
      font-weight: bold;
    }

    small,
    small * {
      font-size: 0.72rem;
      color: var(--font-color-small);
    }

    b {
      font-size: inherit;
      font-weight: normal;
      color: var(--font-color);
    }
  }
</style>
