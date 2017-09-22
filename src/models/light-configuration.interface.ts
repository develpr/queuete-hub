import { HueConfigurationInterface } from './hue-configuration.interface';
import { WemoConfigurationInterface } from './wemo-configuration.interface';
import { TPLinkConfigurationInterface } from './tp-link-configuration.interface';

export interface LightConfigurationInterface {
    hue: HueConfigurationInterface[];
    wemo: WemoConfigurationInterface[];
    tpLink: TPLinkConfigurationInterface[];     
}