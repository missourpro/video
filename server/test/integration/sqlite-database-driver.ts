import * as fs from 'fs';
const sqlite3 = require('sqlite3').verbose();
export class SqliteDatabaseDriver{
  private database;
  constructor(private path:string){

  }
  open(){
    this.database=new sqlite3.Database(this.path);
  }
  hasTable(table){

  }
  hasRow(table:string, expected:any):Promise<boolean>{
    return new Promise((resolve, reject)=>{
      this.database.serialize(() =>{
        let where:string=null;
        Object.keys(expected).forEach((column)=>{
          let condition: string=column +' = "'+ expected[column]+'"';
          if(where===null){
            where=condition;
          }
          else{
            where+=' AND '+condition;
          }
        });
        this.database.get("SELECT * FROM "+table+" WHERE "+where, function(error, actual) {
          if(error) reject(error);
          if(actual) resolve(true);
          resolve(false);
        });

      });
    });

  }
  close(){
    return new Promise((resolve, reject)=>{
      this.database.close((error)=>{
        if(error) reject(error);
        resolve();
      });
    });
  }
  drop(){
    return new Promise((resolve, reject)=>{
        fs.unlink(this.path, (error)=>{
          if(error) reject(error);
          resolve();
        });
    });
  }
}
