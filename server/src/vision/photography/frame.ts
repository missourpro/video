import {Format} from "./format";
export class Frame{
  private constructor(private buffer:Buffer, private format:number){

  }
  static fromPng(buffer: Buffer) {
    return new Frame(buffer, Format.PNG);
  }
}
