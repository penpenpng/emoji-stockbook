import { remove } from "../array";

export interface IFoldables {
  openAll(): void;
  closeAll(): void;
  registerFoldable(operator: FoldableOperator): void;
  unregisterFoldable(operator: FoldableOperator): void;
}

interface FoldableOperator {
  open(): void;
  close(): void;
}

export class Foldables implements IFoldables {
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
    remove(this.operators, operator);
  }
}
