export interface LightControllerInterface {

    turnAllOff(): void;

    turnAllOn(): void;

    turnOn(lightId: string): void;

    turnOff(lightId: string): void;
    
    
}