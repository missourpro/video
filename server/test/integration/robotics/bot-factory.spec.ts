import BotFactory from "../../../src/robotics/bot-factory";
import Bot from "../../../src/robotics/bot";
import {BotManufacturer} from "../../../src/robotics/bot-manufacturer";
import {BotRepository} from "../../../src/robotics/bot-repository";
import {BotConfiguration} from "../../../src/robotics/bot-configuration";
import {WebsiteRepository} from "../../../src/web/website-repository";
import {ConfiguredBotState} from "../../../src/robotics/states/configured-bot-state";

jasmine.DEFAULT_TIMEOUT_INTERVAL=30000;
fdescribe('BotFactory', () => {
  let botFactory:BotFactory;
  let websites:WebsiteRepository;
  beforeEach(async ()=>{
    botFactory=new BotFactory(new BotManufacturer(), new BotRepository());
    websites=new WebsiteRepository();
  });
  afterEach(()=>{
  });
  fit('manufacturesBot', ()=>{
    let bot:Bot=botFactory.manufacture(new BotConfiguration(websites.getWebsiteByUri('http://longform.org/random')));
    expect(bot).toBeDefined();
    expect(bot.getState().equals(new ConfiguredBotState())).toBeTruthy();
  });
  fit('recyclesBot', ()=>{
    let bot:Bot=botFactory.manufacture(new BotConfiguration(websites.getWebsiteByUri('http://longform.org/random')));
    botFactory.recycle(bot.getId());
    expect(botFactory.manufacturedBots().length).toBe(0);
  });
  fit('storesManufacturedBots', ()=>{
    let bot1:Bot=botFactory.manufacture(new BotConfiguration(websites.getWebsiteByUri('http://longform.org/random')));
    let bot2:Bot=botFactory.manufacture(new BotConfiguration(websites.getWebsiteByUri('http://www.hespress.com')));
    expect(botFactory.manufacturedBots().length).toEqual(2);
  });
});
