import Watcher from "../watcher/watcher";
export default class EntityServiceProvider{
  getEntities(){
    return [Watcher]
  }
}
