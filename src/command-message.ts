import { CommandMessageInterface } from './models/command-message.interface';

/**
 * This class, if you should choose to use it, is to help us parse a 
 */
export class CommandMessage implements CommandMessageInterface {

    command: any;    
    
    constructor(jsonPayload: string) {
        this.command = JSON.parse(jsonPayload);  
    }

    //Tells if the command is a more generic "turn everything off" type command
    public isPower(): boolean {
        return(typeof this.command.power != "undefined" || this.command.clickType)
            && ( this.turnPowerOnCommand() || this.turnPowerOffCommand() );
    }

    public turnPowerOnCommand(): boolean {
        return(this.command.power === true || this.command.clickType === "SINGLE");
    }

    public turnPowerOffCommand(): boolean {
        return(this.command.power === false || this.command.clickType === "DOUBLE");
    }

    //Was this command more than likely coming from an AWS IoT button?
    public isIoTButtonCommand(): boolean {
        return( !!! this.command.clickType);
    }

    public powerOnIds(): string[] {
        let on = this.command.on;
        if( ! on ) {
            return [];
        }
        return on;
    }

    public powerOffIds(): string[] {
        let off = this.command.off;
        if( ! off ) {
            return [];
        }
        return off;
    }
}