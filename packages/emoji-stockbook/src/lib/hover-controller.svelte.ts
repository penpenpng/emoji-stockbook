import type { IHoverController } from "../types";

export class HoverController implements IHoverController {
  hoveredContentId = $state<string>();

  setHover(contentId: string): void {
    this.hoveredContentId = contentId;
  }

  unsetHover(): void {
    this.hoveredContentId = undefined;
  }
}
