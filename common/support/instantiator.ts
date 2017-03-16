export default class Instantiator{
  getInstance<T>(type:any, ...args: any[]) : T {
    var instance = new type(...args);
    return <T> instance;
  }
}
