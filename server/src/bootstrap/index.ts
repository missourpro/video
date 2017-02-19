import {app} from 'electron';
import Main from '../main';
app.on('ready', Main.main);
app.on('window-all-closed', ()=>{
  app.quit();
});
