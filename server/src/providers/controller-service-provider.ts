import WatcherController from "../websocket/controllers/robotics-controller";
import RoboticsController from "../websocket/controllers/robotics-controller";
export default class ControllerServiceProvider{
  getControllers():Array<typeof WatcherController>{
    return [
      RoboticsController
    ];
  }
}
