const {app, dialog} = require('electron');
const Jasmine = require('jasmine');
const jasmine = new Jasmine();
app.on('ready', ()=>{
  jasmine.loadConfigFile(__dirname+'/jasmine.json');
  try{
    jasmine.execute();
    jasmine.onComplete(()=>{
      process.exit(0);
    });
  }
  catch(exception){
    console.error(exception.stack);
    process.exit(1)
  }

});
//handle errors catched by electron
dialog.showErrorBox = (title, content) => {
  console.error(`${title}\n${content}`);
  process.exit(1);
};
