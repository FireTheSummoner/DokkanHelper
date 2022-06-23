const { Listener } = require('discord-akairo');
const { API }  = require("../../priv.json")
const fetch = require("node-fetch");

class DefineTerm extends Listener {
    constructor() {
        super('Dictionary', {
            event: 'interactionCreate',
            emitter: "client",
        })
    }

    async exec(interaction) {
        if (interaction.isCommand()) {
            if (interaction.commandName === "dictionary") {
                try {
                    let responce = await fetch(`${API}/define/${interaction.options._hoistedOptions[0].value}`)
                    let data = await responce.json()

                    if (data !== "Not Defined") {
                        const defined = {
                            color: 0x00FF00,
                            title: `${interaction.options._hoistedOptions[0].value.toUpperCase()}`,
                            description: `${data}`
                        }
                        interaction.reply({ embeds: [defined] })
                    }
                    if (data === "Not Defined") {
                        interaction.reply("Word not found")
                    } //Test after trials
                }
                catch (error) {
                    console.log(error)
                }
            }
        }
    }
}

module.exports = DefineTerm