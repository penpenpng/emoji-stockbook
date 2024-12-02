import { tick } from "svelte";
import { customElementScopedValue } from "./custom-element-scoped-value";
import { useCustomElementEventDispatcher } from "./use-custom-element-event-dispatcher";

class State {
  visible = $state(false);
}

const [setupVisibility, useState] = customElementScopedValue(() => new State());
export { setupVisibility };

export const useVisibility = () => {
  const state = useState();
  const dispatch = useCustomElementEventDispatcher();

  return new (class {
    readonly visible = $derived(state.visible);
    show() {
      if (state.visible) {
        return;
      }

      state.visible = true;
      tick().then(() => {
        dispatch("show");
      });
    }
    hide() {
      if (!state.visible) {
        return;
      }

      state.visible = false;
      tick().then(() => {
        dispatch("hide");
      });
    }
  })();
};
