<script lang="ts">
  import { usePreviewFeature } from "../lib/use-preview-feature";

  const previewFeature = usePreviewFeature();
</script>

<div>
  <!-- TODO: 更新が通知されないようにする aria のやつやる -->
  focus: {previewFeature.preview?.shortcode}
</div>
