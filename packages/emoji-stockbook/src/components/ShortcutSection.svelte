<script lang="ts">
  import { useShortcutFeature } from "../lib/use-shortcut-feature";
  import EmojiGrid from "./EmojiGrid.svelte";
  import FoldableSection from "./FoldableSection.svelte";

  const shortcutFeature = useShortcutFeature();
</script>

<FoldableSection title={shortcutFeature.title} expanded>
  {#snippet children()}
    <EmojiGrid emojis={shortcutFeature.emojis} />
  {/snippet}
</FoldableSection>
