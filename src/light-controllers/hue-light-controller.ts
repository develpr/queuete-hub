import dotenv = require("dotenv");
dotenv.config();
import * as Hue from 'philips-hue';
import { HueConfigurationInterface } from '../models/hue-configuration.interface';
import { LightControllerInterface } from './light-controller.interface';
import { LightController } from './light-controller.abstract';

export class HueLightController extends LightController<HueConfigurationInterface> implements LightControllerInterface {

    hue: any = null;
    configuration: any = null;

    constructor(configuration: any) {

        super(configuration);
        
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

    turnOff(id: string) {
        let light = this.findLightById(id);
        if( ! light ) {
            return;
        }
        const offState = {
            "on": false,
            "transitiontime": 0
        };
        this.hue.light(light.number).setState(offState);
    }

    turnOn(id: string) {        
        let light = this.findLightById(id);        
        if( ! light ) {
            return;
        }
        const onFullBlast360NoScopeState = {
            "on": true,
            "transitiontime": 0,
            "bri": 255
        };
        this.hue.light(light.number).setState(onFullBlast360NoScopeState);
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