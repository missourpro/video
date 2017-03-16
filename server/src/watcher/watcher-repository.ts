import Watcher from "./watcher";
import {Repository} from "../persistence/repository";
import {Service} from "typedi";
import {OrmRepository} from "typeorm-typedi-extensions";
@Service()
export default class WatcherRepository {
  constructor(@OrmRepository(Watcher) private repository){

  }
  add(watcher:Watcher):Promise<Watcher>{
    return this.repository.persist(watcher);
  }
}
