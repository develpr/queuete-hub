import dotenv = require("dotenv");
dotenv.config();
var Wemo = require('wemo-client');
import { LightControllerInterface } from './light-controller.interface';
import { WemoConfigurationInterface } from '../models/wemo-configuration.interface';
import { LightController } from './light-controller.abstract';

export class WemoLightController extends LightController<WemoConfigurationInterface>  implements LightControllerInterface {

    wemo: any;
    configuration: any;

    constructor(configuration: any) {
        
        super(configuration);

        this.wemo = new Wemo();
        // let test1 = wemo.client({"deviceType":"urn:Belkin:device:insight:1","friendlyName":"Living room 1","manufacturer":"Belkin International Inc.","manufacturerURL":"http://www.belkin.com","modelDescription":"Belkin Insight 1.0","modelName":"Insight","modelNumber":"1.0","modelURL":"http://www.belkin.com/plugin/","serialNumber":"221403K1200D75","UDN":"uuid:Insight-1_0-221403K1200D75","UPC":"123456789","macAddress":"B4750E746DF4","firmwareVersion":"WeMo_WW_2.00.10966.PVT-OWRT-Insight","iconVersion":"3|49153","binaryState":"0","iconList":{"icon":{"mimetype":"jpg","width":"100","height":"100","depth":"100","url":"icon.jpg"}},"serviceList":{"service":[{"serviceType":"urn:Belkin:service:WiFiSetup:1","serviceId":"urn:Belkin:serviceId:WiFiSetup1","controlURL":"/upnp/control/WiFiSetup1","eventSubURL":"/upnp/event/WiFiSetup1","SCPDURL":"/setupservice.xml"},{"serviceType":"urn:Belkin:service:timesync:1","serviceId":"urn:Belkin:serviceId:timesync1","controlURL":"/upnp/control/timesync1","eventSubURL":"/upnp/event/timesync1","SCPDURL":"/timesyncservice.xml"},{"serviceType":"urn:Belkin:service:basicevent:1","serviceId":"urn:Belkin:serviceId:basicevent1","controlURL":"/upnp/control/basicevent1","eventSubURL":"/upnp/event/basicevent1","SCPDURL":"/eventservice.xml"},{"serviceType":"urn:Belkin:service:firmwareupdate:1","serviceId":"urn:Belkin:serviceId:firmwareupdate1","controlURL":"/upnp/control/firmwareupdate1","eventSubURL":"/upnp/event/firmwareupdate1","SCPDURL":"/firmwareupdate.xml"},{"serviceType":"urn:Belkin:service:rules:1","serviceId":"urn:Belkin:serviceId:rules1","controlURL":"/upnp/control/rules1","eventSubURL":"/upnp/event/rules1","SCPDURL":"/rulesservice.xml"},{"serviceType":"urn:Belkin:service:metainfo:1","serviceId":"urn:Belkin:serviceId:metainfo1","controlURL":"/upnp/control/metainfo1","eventSubURL":"/upnp/event/metainfo1","SCPDURL":"/metainfoservice.xml"},{"serviceType":"urn:Belkin:service:remoteaccess:1","serviceId":"urn:Belkin:serviceId:remoteaccess1","controlURL":"/upnp/control/remoteaccess1","eventSubURL":"/upnp/event/remoteaccess1","SCPDURL":"/remoteaccess.xml"},{"serviceType":"urn:Belkin:service:deviceinfo:1","serviceId":"urn:Belkin:serviceId:deviceinfo1","controlURL":"/upnp/control/deviceinfo1","eventSubURL":"/upnp/event/deviceinfo1","SCPDURL":"/deviceinfoservice.xml"},{"serviceType":"urn:Belkin:service:insight:1","serviceId":"urn:Belkin:serviceId:insight1","controlURL":"/upnp/control/insight1","eventSubURL":"/upnp/event/insight1","SCPDURL":"/insightservice.xml"},{"serviceType":"urn:Belkin:service:smartsetup:1","serviceId":"urn:Belkin:serviceId:smartsetup1","controlURL":"/upnp/control/smartsetup1","eventSubURL":"/upnp/event/smartsetup1","SCPDURL":"/smartsetup.xml"},{"serviceType":"urn:Belkin:service:manufacture:1","serviceId":"urn:Belkin:serviceId:manufacture1","controlURL":"/upnp/control/manufacture1","eventSubURL":"/upnp/event/manufacture1","SCPDURL":"/manufacture.xml"}]},"presentationURL":"/pluginpres.html","host":"10.0.1.43","port":"49153","callbackURL":"http://10.0.1.32:61125"});
        // test1.setBinaryState(1);

        // wemo.discover(function(err: any, deviceInfo: any) {
        //     console.log('Wemo Device Found: %j', deviceInfo);
        //     // Get the client for the found device
        //     var client = wemo.client(deviceInfo);
        
        //     console.info("OK");
        // });
    }

    turnOn(id: string) {
        this.setState(id, true);
    }

    turnOff(id: string) {
        this.setState(id, false);
    }

    private setState(id: string, turnOn: boolean) {
        let light: WemoConfigurationInterface = this.findLightById(id);
        if(light) {
            if(turnOn) {
                this.wemo.client(light.deviceInfo).setBinaryState(1);
            }
            else {
                this.wemo.client(light.deviceInfo).setBinaryState(0);
            }
        }
    }

    turnAllOff() {
        for(var item in this.configuration) {
            let deviceInfo = this.configuration[item].deviceInfo;
            this.wemo.client(deviceInfo).setBinaryState(0);
        }
    }

    turnAllOn() {
        for(var item in this.configuration) {
            let deviceInfo = this.configuration[item].deviceInfo;
            this.wemo.client(deviceInfo).setBinaryState(1);
        }
    }

}