import Id from "./id";
import {EntityManager} from "typeorm";
import EntityServiceProvider from "../providers/entity-service-provider";
import {OrmEntityManager} from "typeorm-typedi-extensions";
import {Service} from "typedi";
@Service()
export abstract class Repository<T>{
  private entityServiceProvider=new EntityServiceProvider();
  constructor(@OrmEntityManager() protected entityManager: EntityManager){

  }
  byId(id:Id):Promise<any>{
    return this.entityManager.findOneById(this.entityServiceProvider.getEntities()[0], id.getValue());
  }
  add(entity: T):Promise<T>{
    return this.entityManager.persist(entity);
  }
  remove(entity: T):Promise<T>{
    return this.entityManager.remove(entity);
  }

  all():Promise<any[]>{
    return this.entityManager.find(this.entityServiceProvider.getEntities()[0]);
  }
}
