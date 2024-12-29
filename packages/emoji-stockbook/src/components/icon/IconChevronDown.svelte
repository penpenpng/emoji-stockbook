<script lang="ts">
  // Use `--icon-size` to adjust the size.
  const { alt }: { alt: string } = $props();

  const id = `svg-${Math.floor(Math.random() * 10000)}`;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-labelledby={id}
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <title {id}>{alt}</title>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 9l6 6l6 -6" />
</svg>

<style>
  svg {
    display: inline-block;
    width: var(--icon-size, 24px);
    height: var(--icon-size, 24px);
    stroke: var(--font-color-icon);
  }
</style>
