import Bot from "./bot";
import {ManufacturedBotState} from "./states/manufactured-bot-state";
import {Service} from "typedi";
import {BotId} from "./bot-id";
import {BotConfiguration} from "./bot-configuration";
@Service()
export class BotManufacturer{
  manufacture(configuration:BotConfiguration):Bot{
    console.log('manufacturing and configuring bot');
    let bot:Bot=new Bot();
    bot.setId(BotId.unique());
    bot.setState(new ManufacturedBotState);
    bot.configure(configuration);
    console.log('Bot manufactured and configured');
    return bot;
  }
}
