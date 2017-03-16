import BotFactory from "../../../src/robotics/bot-factory";
import Bot from "../../../src/robotics/bot";
import Config from "../../../src/config/index";
import * as path from "path";
import * as fs from "fs";
import {DatabaseDriver} from "../database-driver";


jasmine.DEFAULT_TIMEOUT_INTERVAL=30000;
fdescribe('BotFactory', () => {
  const ORIGINAL_DATABASE_PATH=Config.DATABASE_PATH;
  const TEST_DATABASE_PATH=path.join(Config.STORAGE_PATH, 'test.sqlite3');
  let database:DatabaseDriver;
  let botFactory:BotFactory;
  beforeEach(async ()=>{
    database=new DatabaseDriver(TEST_DATABASE_PATH);
    Config.DATABASE_PATH=TEST_DATABASE_PATH;
    botFactory=new BotFactory();
    await botFactory.open();
    database.open();
  });
  afterEach(async ()=>{
    await botFactory.close();
    await database.drop();
  });
  it('manufacturesBot', async ()=>{
    let bot:Bot=await botFactory.manufacture({uri:'http://longform.org/random'});
    expect(await database.hasRow('bot', {id: bot.getId(), uri: bot.getUri()})).toBe(true);
  });
  it('recyclesBot', async ()=>{
    let bot:Bot=await botFactory.manufacture({uri:'http://longform.org/random'});
    const id = bot.getId();
    const uri = bot.getUri();
    expect(await database.hasRow('bot', {id: id, uri: uri})).toBe(true);
    await botFactory.recycle(bot);
    expect(await database.hasRow('bot', {id: id, uri: uri})).toBe(false);
  });
  it('recyclesGrabbedBot', async ()=>{
    let bot:Bot=await botFactory.manufacture({uri:'http://longform.org/random'});
    const id:number = bot.getId();
    const uri:string = bot.getUri();
    expect(await database.hasRow('bot', {id: id, uri: uri})).toBe(true);
    let grabbedBot:Bot=await botFactory.manufacturedBot(id);
    expect(grabbedBot.getId()).toEqual(bot.getId());
    await botFactory.recycle(grabbedBot);
    expect(await database.hasRow('bot', {id: id, uri: uri})).toBe(false);
  });
  it('keepsAllManifacturedBots', async ()=>{
    let bot1:Bot=await botFactory.manufacture({uri:'http://longform.org/random'});
    let bot2:Bot=await botFactory.manufacture({uri:'http://www.hespress.com'});
    let bots=await botFactory.manufacturedBots();
    expect(bots.length).toEqual(2);
  });
});
