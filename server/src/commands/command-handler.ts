import MessageHandler from "../bus/message-handler";
import EventBus from "../events/event-bus";
export abstract class CommandHandler extends MessageHandler{
  protected dispatcher:EventBus;
}
