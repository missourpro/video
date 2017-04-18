import {WebsiteChangeList} from "./website-change-list";
export interface WebsiteListener{
  websiteChanged(changes:WebsiteChangeList);
}
