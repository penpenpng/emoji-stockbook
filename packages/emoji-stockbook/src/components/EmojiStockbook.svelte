<script lang="ts">
  import RegionContent from "./RegionContent.svelte";
  import RegionControl from "./RegionControl.svelte";
  import RegionPreview from "./RegionPreview.svelte";
</script>

<div class="emoji-stockbook">
  <div class="region-control">
    <RegionControl />
  </div>
  <div class="region-content">
    <RegionContent />
  </div>
  <div class="region-preview">
    <RegionPreview />
  </div>
</div>

<style>
  .emoji-stockbook {
    display: flex;
    flex-direction: column;
    height: var(--height);
    background-color: var(--background-color);
  }

  .region-control {
    flex: 0 0 min-content;
  }

  .region-content {
    flex-grow: 1;
    overflow: auto;
  }

  .region-preview {
    flex: 0 0 50px;
  }

  /* stylelint-disable-next-line selector-pseudo-class-no-unknown -- :global is allowed as a svelte-specific syntax. */
  :global .emoji-stockbook {
    * {
      font-family: var(--font-family);
      font-size: 16px;
      color: var(--font-color);
    }

    small {
      font-size: 11.5px;
      color: var(--small-font-color);
    }

    b {
      font-size: inherit;
      font-weight: normal;
      color: var(--font-color);
    }

    button {
      padding: 0;
      appearance: none;
      cursor: pointer;
      background-color: transparent;
      border: none;
    }

    input[type="search"] {
      padding: 0.375em 0.75em;
      appearance: none;
      background-color: white;
      border: 0.5px solid gray;
      border-radius: 5px;
      box-shadow: none;
    }
  }
</style>
