export default {
    randomHex: (length) => {
        return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
    },

    blockToName: (fields) => {
        return fields.map(field => {
            switch (field.type) {
                case "label": {
                    return field.text
                }
                case "string": {
                    return `(${field.text})`
                }
            }
        }).join(" ")
    },

    blockToExtensionText: (fields) => {
        return fields.map(field => {
            switch (field.type) {
                case "label": {
                    return field.text
                }
                case "string": {
                    return `[${field.id}]`
                }
            }
        }).join(" ")
    }
}