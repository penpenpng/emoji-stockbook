import { UArray } from "@/lib/utils";
import { scoped, ScopedValue } from "./custom-element-scoped-value.js";

interface FoldableOperator {
  open(): void;
  close(): void;
}

export class Foldables extends ScopedValue {
  private operators: FoldableOperator[] = [];

  openAll(): void {
    for (const op of this.operators) {
      op.open();
    }
  }

  closeAll(): void {
    for (const op of this.operators) {
      op.close();
    }
  }

  registerFoldable(operator: FoldableOperator): void {
    this.operators.push(operator);
  }

  unregisterFoldable(operator: FoldableOperator): void {
    UArray.remove(this.operators, operator);
  }
}

export const useFoldables = scoped(Foldables);
