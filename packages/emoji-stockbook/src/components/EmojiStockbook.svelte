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
    width: var(--width, min-content);
    height: var(--height);
    background-color: var(--background-color);
  }

  .region-control {
    flex: 0 0 min-content;
  }

  .region-content {
    flex-grow: 1;
    overflow-y: scroll;
  }

  .region-preview {
    flex: 0 0 50px;
  }

  /* stylelint-disable-next-line selector-pseudo-class-no-unknown -- :global is allowed as a svelte-specific syntax. */
  :global .emoji-stockbook {
    --focus-outline-width: 2px;

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

    small {
      font-size: 11.5px;
      color: var(--font-color-small);
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
      outline: none;
    }

    button:focus {
      position: relative; /* To prevent outlines from being hidden */
      z-index: 1; /* To prevent outlines from being hidden */
      outline: var(--focus-outline-width) solid black;
    }

    input {
      padding: 0;
      appearance: none;
      background-color: transparent;
      border: 0;
      border-radius: 0;
      outline: 0;
      box-shadow: none;
    }
  }
</style>
