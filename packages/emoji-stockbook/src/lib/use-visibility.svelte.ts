import { customElementScopedValue } from "./custom-element-scoped-value";
import { useEventEmitter } from "./use-event-emitter";

class State {
  visible = $state(false);
}

const [setupVisibility, useState] = customElementScopedValue(() => new State());
export { setupVisibility };

export const useVisibility = () => {
  const state = useState();
  const emitter = useEventEmitter();

  return new (class {
    readonly visible = $derived(state.visible);
    show() {
      state.visible = true;
      emitter.emit("show");
    }
    hide() {
      state.visible = false;
      emitter.emit("hide");
    }
  })();
};
