<script lang="ts">
  import { useFoldables } from "../lib/use-foldables";

  const foldables = useFoldables();
</script>

<button onclick={() => foldables.openAll()}>open all</button>
<button onclick={() => foldables.closeAll()}>close all</button>
