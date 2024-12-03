<script lang="ts">
  import { useSkintoneFeature } from "../lib/use-skintone-feature";

  const skintoneFeature = useSkintoneFeature();
</script>

<select bind:value={skintoneFeature.currentSkintone}>
  <option value={null}>none</option>
  {#each skintoneFeature.skintones as skintone (skintone.char)}
    <option value={skintone}>{skintone.alt}</option>
  {/each}
</select>
