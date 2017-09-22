import { GenericLightConfigurationInterface } from './generic-light-configuration.interface';


/**

{
    "id": "bedroom-1",
    "name": "bedroom 1",
    "number": 1
}

 */
export interface HueConfigurationInterface extends GenericLightConfigurationInterface{
    number: number
}