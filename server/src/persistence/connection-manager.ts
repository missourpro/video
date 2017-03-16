import {createConnection, Connection, useContainer} from "typeorm";
import Config from "../config/index";
import Watcher from "../watcher/watcher";
import EntityServiceProvider from "../providers/entity-service-provider";
import CantConnectToDatabaseException from "./cant-connect-to-database-exception";
import {Container} from "typedi";
export default class ConnectionManager{
  connection:Connection=ConnectionManager.NONE;
  private entityServiceProvider: EntityServiceProvider = new EntityServiceProvider();
  private static NONE: Connection=null;
  async connect():Promise<Connection>{
      try{
        useContainer(Container);
        this.connection=await createConnection();
        return this.connection;
      }
      catch (error){
        throw new CantConnectToDatabaseException(error.message);
      }

  }
  async disconnect():Promise<void>{
      await this.connection.close();
      this.connection=ConnectionManager.NONE;
  }
}
