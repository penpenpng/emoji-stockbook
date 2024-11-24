import type { IHoverManagaer } from "../types";

export class HoverController implements IHoverManagaer {
  hoveredContentId = $state<string>();

  setHover(contentId: string): void {
    this.hoveredContentId = contentId;
  }

  unsetHover(): void {
    this.hoveredContentId = undefined;
  }
}
