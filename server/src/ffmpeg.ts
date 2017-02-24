import * as ChildProcess from "child_process";
import Config from "./config/index";
import CantStartFfmpegException from "./cant-start-ffmpeg-exception";

export class FfmpegBuilder{
  private globalOptions:Array<string>=[];
  private inputBuilder:FfmpegInputBuilder=new FfmpegInputBuilder();
  private outputBuilder:FfmpegOutputBuilder=new FfmpegOutputBuilder();

  overwrite(){
    this.globalOptions.push('-y');
    return this;
  }


  input(url:string) {
    return this.inputBuilder.input(url);
  }

  output(url:string) {
    return this.outputBuilder.output(url);
  }

  build():Ffmpeg{
    let options:Array<string>=[];

    options=[].concat(this.globalOptions,this.inputBuilder.getOptions(), this.outputBuilder.getOptions());

    return new Ffmpeg(Config.FFMPEG_PATH, options);
  }
}
export class Ffmpeg{
  private ffmpeg: ChildProcess.ChildProcess;
  constructor(ffmpegPath:string, options:Array<string>){
    this.ffmpeg=ChildProcess.spawn(ffmpegPath, options);
    //TODO Failure handling not implemented
    // Some errors triggered by ffmpeg
    // ( ffmpeg process: "pipe:0: End of file")
    this.ffmpeg.on('error', ()=>{
      throw new CantStartFfmpegException();
    });
    this.ffmpeg.stderr.on('data', (data)=>{
    });
    this.ffmpeg.stderr.on('end', (data)=>{

    });
  }
  write(frame: Buffer) {
    this.ffmpeg.stdin.write(frame);
  }
  end() {
    return new Promise((resolve, reject)=>{
      this.ffmpeg.stdin.end();
      this.ffmpeg.on('exit',  ()=>{
        console.log('ffmpeg exited');
        resolve();
      });
    });

  }
}
class FfmpegInputBuilder{
  private inputOptions:Array<string>=[];
  private inputUrl:Array<string>=[];
  private outputBuilder:FfmpegOutputBuilder;
  private builder:FfmpegBuilder;
  input(url:string){
    this.inputUrl.push('-i');
    this.inputUrl.push(url);
    return this;
  }
  private format(format: string) {
    this.inputOptions.push('-f');
    this.inputOptions.push(format);
    return this;
  }
  imageToPipe(){
    return this.format('image2pipe');
  }
  framerate(fps:number){
    this.inputOptions.push('-r');
    this.inputOptions.push(fps.toString());
    return this;
  }
  output(url:string){
    return this.outputBuilder.output(url);
  }
  getOptions(){
    return [].concat(this.inputOptions, this.inputUrl);
  }
  build(){
    return this.builder.build();
  }
}
class FfmpegOutputBuilder{

  private outputOptions:Array<string>=[];
  private outputUrl:string;
  private inputBuilder:FfmpegOutputBuilder;
  private builder:FfmpegBuilder;
  output(url:string){
    this.outputUrl=url;
    return this;
  }
  input(url:string){
    return this.inputBuilder.input(url);
  }
  getOptions(){
    return [].concat(this.outputOptions).push(this.outputUrl);
  }
  build(){
    return this.builder.build();
  }
}

