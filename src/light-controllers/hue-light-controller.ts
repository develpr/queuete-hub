import dotenv = require("dotenv");
dotenv.config();
import * as Hue from 'philips-hue';
import { LightControllerInterface } from './light-controller.interface';

export class HueLightController implements LightControllerInterface {

    hue: any = null;

    constructor(private configuration: any) {

        this.hue = new Hue();
        this.hue.bridge = process.env.HUE_BRIDGE;
        this.hue.username = process.env.HUE_USERNAME;

        
        // this.hue.getLights()
        //     .then(function (lights: any) {
        //         console.log(lights);
        //         console.log(Object.keys(lights) + " lights found!");
        //     })
        //     .catch(function (err: any) {
        //         console.error(err.stack || err);
        //     });
        
        
    }

    turnAllOff() {
        for(var item in this.configuration) {
            let lightNumber = this.configuration[item].number;
            this.hue.light(lightNumber).off(); 
        }
    }

    turnAllOn() {
        for(var item in this.configuration) {
            let lightNumber = this.configuration[item].number;
            let onFullBlast360NoScopeState = {
                on: true,
                bri: 255
            };
            this.hue.light(lightNumber).setState(onFullBlast360NoScopeState); 
        }
    }

}