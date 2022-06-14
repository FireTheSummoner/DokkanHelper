const { Listener } = require('discord-akairo');

class Ready extends Listener {
    constructor() {
        super('online', {
            event: 'ready',
            emitter: "client",
        })
    }

    exec() {
        /*              Override Code for Blacklisted Servers
            for (const [serverID, server] of map) {
                if (BLServers.includes(serverID)) {
                    let ServerCache = this.client.guilds.cache.get(`${serverID}`)
                    ServerCache.leave()
                }
            }
        */
        console.log(`In ${this.client.guilds.cache.size} guilds`)
        this.client.user.setActivity("Dokkan Simps", {
            type: "STREAMING",
            url: "https://www.twitch.tv/firethesummoner"
        })
    }
}

module.exports = Ready;