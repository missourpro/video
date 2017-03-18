import BotFactory from "../../../src/robotics/bot-factory";
import Bot from "../../../src/robotics/bot";
import Config from "../../../src/config/index";
import * as path from "path";
import * as fs from "fs";
import {DatabaseDriver} from "../database-driver";
import {BotManufacturer} from "../../../src/robotics/bot-manufacturer";
import {BotRepository} from "../../../src/robotics/bot-repository";
import {BotId} from "../../../src/robotics/bot-id";

jasmine.DEFAULT_TIMEOUT_INTERVAL=30000;
fdescribe('BotFactory', () => {
  let botFactory:BotFactory;
  beforeEach(async ()=>{
    botFactory=new BotFactory(new BotManufacturer(), new BotRepository());
  });
  afterEach( ()=>{
  });
  it('manufacturesBot',  ()=>{
    let bot:Bot=botFactory.manufacture({uri:'http://longform.org/random'});
    expect(bot).toBeDefined();
  });
  it('recyclesBot', ()=>{
    let bot:Bot = botFactory.manufacture({uri:'http://longform.org/random'});
    botFactory.recycle(bot.getId());
    expect(botFactory.manufacturedBots().length).toBe(0);
  });
  it('keepsTrackOfManufacturedBots', ()=>{
    let bot1:Bot= botFactory.manufacture({uri:'http://longform.org/random'});
    let bot2:Bot= botFactory.manufacture({uri:'http://www.hespress.com'});
    expect(botFactory.manufacturedBots().length).toEqual(2);
  });
});
