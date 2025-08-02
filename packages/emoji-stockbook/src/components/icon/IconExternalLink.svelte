<script lang="ts">
  // Use `--icon-size` to adjust the size.
  const { alt }: { alt: string } = $props();

  const uid = $props.id();
  const id = `svg-${uid}`;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-labelledby={id}
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="icon icon-tabler icons-tabler-outline icon-tabler-external-link"
>
  <title {id}>{alt}</title>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
  <path d="M11 13l9 -9" />
  <path d="M15 4h5v5" />
</svg>

<style>
  svg {
    display: inline-block;
    width: var(--icon-size, 1.25rem);
    height: var(--icon-size, 1.25rem);
    stroke: var(--font-color-icon);
  }
</style>
