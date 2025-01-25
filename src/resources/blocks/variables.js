import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';
import Blockly from 'blockly/core';

const categoryPrefix = 'variables_';
const categoryColor = '#f96';

function getVariables() {
    if (!(window && window.variables && Object.keys(window.variables).length > 0)) return [["", ""]]
    return Object.entries(window.variables).map(v => [v[0], v[0]])
}

function register() {
    registerBlock(`${categoryPrefix}get`, {
        message0: '%1',
        args0: [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": getVariables
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor,
        extensions: [`${categoryPrefix}get_extension`]
    }, (block) => {
        const code = `null`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}set`, {
        message0: 'set %1 to %2',
        args0: [
            {
                "type": "field_dropdown",
                "name": "NAME",
                "options": getVariables
            },
            {
                "type": "input_value",
                "name": "INPUT"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
        extensions: [`${categoryPrefix}set_extension`]
    }, (block) => {
        const code = `null`;
        return `${code}\n`;
    })

    Blockly.Extensions.unregister(`${categoryPrefix}get_extension`)
    Blockly.Extensions.register(`${categoryPrefix}get_extension`, function() {
        this.setOnChange(function() {
            const NAME = this.getField('NAME')
            const variable = window && window.variables && window.variables[NAME.getValue()]
            if (!variable) {
                this.setOutput(true, null)
            } else {
                this.setOutput(true, variable.type)
            }
        })
    })

    Blockly.Extensions.unregister(`${categoryPrefix}set_extension`)
    Blockly.Extensions.register(`${categoryPrefix}set_extension`, function() {
        this.setOnChange(function() {
            const NAME = this.getField('NAME')
            const variable = window && window.variables && window.variables[NAME.getValue()]
            const type = variable ? variable.type : null

            this.getInput('INPUT').setCheck(type)
        })
    })
}

export default register;