import { GenericLightConfigurationInterface } from '../models/generic-light-configuration.interface';

export abstract class LightController<T extends GenericLightConfigurationInterface> {

    protected lightConfigurations: T[];

    constructor(configuration: any) {
        this.setLightConfigurations(configuration);
    }

    protected findLightById(id: string): T {
        for (let light of this.lightConfigurations) {
            if(light.id == id) {
                return light;
            }
        }
    }

    protected setLightConfigurations(lightConfigurations: T[]) {
        this.lightConfigurations = lightConfigurations;
    }

    protected getLightConfigurations(): T[] {
        return this.lightConfigurations;
    }
}