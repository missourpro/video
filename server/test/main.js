const electron=require('electron');
const ChildProcess=require('child_process');
const Optimist=require('optimist');
const path=require('path');

//TODO Handle missing argument 'suite'
const suite=Optimist.argv.suite;
//TODO Dirty hack to be cleaned up
const MINUTES=60*1000;
const DEFAULT_TIMEOUT=2*MINUTES;
const exit=()=>{
  process.exit(electronProcess.status);
};
setTimeout(exit, DEFAULT_TIMEOUT);
const electronProcess=ChildProcess.spawnSync(electron, [path.join(__dirname, suite, 'main.js')], {stdio:'inherit'});
exit();

