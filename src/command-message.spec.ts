import { CommandMessage } from './command-message';
import { expect, assert} from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('CommandMessage tool', () => {
    it('should parse valid json', () => {    
        const command = new CommandMessage('{"power": true}');
    });

    it('should throw exception for invalid json', () => {    
        expect(function(){new CommandMessage("asdfasdsdf blah")}).to.throw('Unexpected token a in JSON at position 0');
    });

    it('should parse valid power on', () => {    
        const command = new CommandMessage('{"power": true}');
        expect(command.isPower()).to.be.true;
    });

    it('should not have power as true if boolean true is not passed', () => {    
        const command = new CommandMessage('{"power": "on"}');
        expect(command.isPower()).to.be.false;
    });

    it('should parse valid power off', () => {    
        const command = new CommandMessage('{"power": false}');
        expect(command.isPower()).to.be.true;
    });

    it('give a valid list of ids to turn on', () => {    
        const command = new CommandMessage('{"on": ["light-1", "light-2"]}');
        expect(command.powerOnIds()).to.have.lengthOf(2);
        assert.isArray(command.powerOnIds());
    });


    it('give a valid list of ids to turn off', () => {    
        const command = new CommandMessage('{"off": ["light-1", "light-2", "light-3"]}');
        expect(command.powerOffIds()).to.have.lengthOf(3);
        assert.isArray(command.powerOnIds());
    });


    it('give empty array if no "on" parameter is passed', () => {    
        const command = new CommandMessage('{"power": true}');
        assert.isArray(command.powerOnIds());
        expect(command.powerOnIds()).to.have.lengthOf(0);        
    });

    it('give empty array if no "off" parameter is passed', () => {    
        const command = new CommandMessage('{"power": true}');
        assert.isArray(command.powerOffIds());
        expect(command.powerOffIds()).to.have.lengthOf(0);        
    });
});