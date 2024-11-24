import type {
  CursorDirection,
  CursorPosition,
  ICursorController,
  IRepository,
} from "../types";

// TODO: impl
// TODO: カーソルが検索欄にある場合
export class CursorController implements ICursorController {
  constructor(private repo: IRepository) {}

  position = $state<CursorPosition>();
  cursoredContentId = $state<string>();

  setCursor(contentId: string): void {}
  unsetCursor(): void {}
  moveCursor(direction: CursorDirection): void {}
}
