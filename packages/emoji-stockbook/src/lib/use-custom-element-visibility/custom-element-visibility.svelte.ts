import { tick } from "svelte";
import { useCustomElementEventDispatcher } from "../use-custom-element-event-dispatcher";

class State {
  visible = $state(false);
}

export class CustomElementVisibility {
  private state = new State();
  private dispatch = useCustomElementEventDispatcher();

  readonly visible = $derived.by(() => this.state.visible);

  show() {
    if (this.state.visible) {
      return;
    }

    this.state.visible = true;
    tick().then(() => {
      this.dispatch("show");
    });
  }

  hide() {
    if (!this.state.visible) {
      return;
    }

    this.state.visible = false;
    tick().then(() => {
      this.dispatch("hide");
    });
  }
}
