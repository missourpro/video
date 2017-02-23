const {app, BrowserWindow, dialog} = require('electron');
const Jasmine = require('jasmine');
const Optimist=require('optimist');
const path=require('path');

//TODO Handle missing argument 'suite'
const suite=Optimist.argv.suite;
const jasmine = new Jasmine();
app.on('ready', ()=>{
  jasmine.loadConfigFile(path.join(__dirname,suite, 'jasmine.json'));
  try{
    jasmine.execute();
    jasmine.onComplete((passed)=>{
      process.on('exit',()=>{process.exit(passed?0:1)});
      app.quit();
    });
  }
  catch(exception){
    console.error(exception.stack);
    process.exit(1)
  }

});
//rethrow errors catched by electron
dialog.showErrorBox = (title, content) => {
  console.error(`${title}\n${content}`);
  process.exit(1);
};
