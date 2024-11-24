import mitt from "mitt";
import type { EmojiStockbookEventMap, IEventController } from "../types";

export class EventController implements IEventController {
  emitter = mitt<EmojiStockbookEventMap>();
}
