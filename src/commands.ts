import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"
import { clientId, guildId, token } from "./config.js"
import { getCommands } from "./common.js"

const commands = (await getCommands('./commands')).map(c => c.data.toJSON())

const rest = new REST({version: '10'}).setToken(token)

const addCommandsToGuild = () => {
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => console.log("Successfully registered app commands!"))
        .catch(console.error)
}

const addCommandsGlobally = () => {
    
}

if (process.argv.includes('--global')) {
    addCommandsGlobally()
} else {
    addCommandsToGuild()
}