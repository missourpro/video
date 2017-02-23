const electron=require('electron');
const ChildProcess=require('child_process');
const Optimist=require('optimist');
const path=require('path');

//TODO Handle missing argument 'suite'
const suite=Optimist.argv.suite;

const electronProcess=ChildProcess.spawnSync(electron, [path.join(__dirname, 'electron-jasmine.js'), '--suite', suite], {stdio:'inherit'});
process.exit(electronProcess.status);