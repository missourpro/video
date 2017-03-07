import Page from "./page";
export default class HespressPage extends Page{
  author:string;
  date:Date;
  image: string;
  comments:Array<{body: string, date:Date, author:string}>;
}
