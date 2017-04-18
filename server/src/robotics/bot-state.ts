import {IllegalStateTransitionException} from "./exceptions/illegal-state-transition-exception";
import {Column, Entity, DiscriminatorColumn, TableInheritance} from "typeorm";
@Entity()
@TableInheritance("single-table")
@DiscriminatorColumn({ name: "type", type: "string"})
export abstract class BotState{
  manufacture(): BotState{
    throw new IllegalStateTransitionException;
  }
  configure(): BotState{
    throw new IllegalStateTransitionException;
  }
  start(): BotState{
    throw new IllegalStateTransitionException;
  }
  destroy(): BotState{
    throw new IllegalStateTransitionException;
  }
  stop(): BotState{
    throw new IllegalStateTransitionException;
  }
  equals(other:BotState){
    return this.toString() ===other.toString();
  }
  abstract toString();
}
