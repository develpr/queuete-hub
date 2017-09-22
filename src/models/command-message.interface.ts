/**
 * This class, if you should choose to use it, is to help us parse a 
 */
export interface CommandMessageInterface {
    
        //Tells if the command is a more generic "turn everything off" type command
        isPower(): boolean;
    
        turnPowerOnCommand(): boolean;
    
        //Was this command more than likely coming from an AWS IoT button?
        isIoTButtonCommand(): boolean;
    
        powerOnIds(): string[];
    
        powerOffIds(): string[];
    }