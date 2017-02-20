import {app} from 'electron';
import Main from '../main';
//Should be called before app is ready
app.disableHardwareAcceleration();
app.on('ready', Main.main);
app.on('window-all-closed', ()=>{
  app.quit();
});
