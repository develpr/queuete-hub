import dotenv = require("dotenv");
import awsIoT = require("aws-iot-device-sdk");
import { HueLightController } from './light-controllers/hue-light-controller';
import { WemoLightController } from './light-controllers/wemo-light-controller';
import { CommandMessage } from './command-message';
const lightsConfiguration = require("../lights-config.json");

dotenv.config();

class App {

      readonly THING_NAME = "HomeLights";
      readonly COMMAND_TOPIC = "lightStateModification";

      thing: awsIoT.thingShadow;
      hueController: HueLightController;      
      wemoController: WemoLightController;      
      
      constructor() {            

            this.hueController = new HueLightController(lightsConfiguration.hue);
            this.wemoController = new WemoLightController(lightsConfiguration.wemo);
            
            this.thing = new awsIoT.thingShadow({
                  keyPath: process.env.AWSIOT_PRIVATE_KEY,
                  certPath: process.env.AWSIOT_CLIENT_CERTIFICATE,
                  caPath: process.env.AWSIOT_CA_CERTIFICATE,
                  host: process.env.AWSIOT_HOST_NAME
            });

            this.thing.register(this.THING_NAME, {
                  ignoreDeltas: false
            });

            this.thing.subscribe(this.COMMAND_TOPIC);

            this.thing.on('connect', this.handleConnect);
            this.thing.on('close', () => this.thing.unregister(this.THING_NAME));

            //this is... ugly. how should I do this so that I can access "this"?
            this.thing.on('message', (topic: string, payload: object) => {
                  this.handleMessage(topic, payload);                  
            });

            this.thing.on('status', (thingName: string, stat: string, clientToken: string, stateObject: object) => {
                  this.handleStatus(thingName, stat, clientToken, stateObject);
            });

            this.thing.on('delta', (thingName: string, state: object) => {
                  this.handleDelta(thingName, state);
            });
      }


      handleStatus(thingName: string, state: string, clientToken: string, stateObject: object) {
            console.log(thingName);
            console.log(state);
      }

      handleDelta(thingName: string, state: object) {
            console.log("delta!");
            console.log(state);
      }

      handleMessage(topic: string, payload: any) {        
            let command = null;
            try{
                  command = new CommandMessage(payload);
                  if( ! command ) {
                        return;
                  }
            } catch(e) {
                  console.log("This is not a great payload tbqh");
                  return;
            }
            
            if(command.isPower()) {
                  this.setLightPower(command.turnPowerOnCommand());
                  this.updateThing({ "state": { "reported": { "power": command.turnPowerOnCommand() } } });
            }

            else {
                  
                  for (let id of command.powerOnIds()) {                        
                        this.hueController.turnOn(id);
                        this.wemoController.turnOn(id); 
                  }
                  for (let id of command.powerOffIds()) {                        
                        this.hueController.turnOff(id);
                        this.wemoController.turnOff(id); 
                  }
            }
      }

      handleConnect() {
            console.log("connected!");
      }

      updateThing(state: any) {
            var clientToken = this.thing['update'](this.THING_NAME, state);
      }

      private setLightPower(power: boolean) {
            if(power) {
                  this.hueController.turnAllOn();
                  this.wemoController.turnAllOn();                  
            }
            else {
                  this.hueController.turnAllOff();
                  this.wemoController.turnAllOff();                  
            }
      }


}

const app = new App();
