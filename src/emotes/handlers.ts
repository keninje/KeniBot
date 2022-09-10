import { Guild, GuildEmoji, Message } from "discord.js";
import CustomClient from "../types/custom-client";

const registerEmoteHandlers = (client: CustomClient) => {

    client.on('messageCreate', (message: Message<boolean>) => {
        const emoteRegex = /(<a?:.+?:(\d{18})>)/
        const emote = emoteRegex.exec(message.content)
        console.log(emote)
        console.log(emote?.at(0))
        const eList = message.guild?.emojis.cache.map(e => e.toString())
        console.log(eList)
    })
    
    client.on('emojiCreate', (emote: GuildEmoji) => {
        console.log(`new emote => ${emote.toString()}`)
    })

    client.on('emojiDelete', (emote: GuildEmoji) => {
        console.log(`emote deleted: ${emote.toString()}`)
    })

    client.on('emojiUpdate', (oldEmote: GuildEmoji, newEmote: GuildEmoji) => {
        
    })

    client.on('guildCreate', (guild: Guild) => {
        const guilds = client.dbClient.db().collection('guilds')
        guilds.insertOne({
            "guildId": guild.id,
            "emotes": guild.emojis.cache.map(e => e.toString())
        })
    })

}

export { registerEmoteHandlers }