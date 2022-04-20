import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"
import { clientId, token } from "./config.js"
import { getCommands } from "./common.js"

const commands = (await getCommands('./commands')).map(c => c.data.toJSON())

const rest = new REST({ version: '10' }).setToken(token)

const addCommandsToGuild = (guildId: string) => {
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then(() => console.log("Successfully registered app commands to the guild!"))
        .catch(console.error)
}

const addCommandsGlobally = () => {
    rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log("Successfully registered app commands globally!"))
    .catch(console.error)
}

if (process.argv.includes('--global')) {
    addCommandsGlobally()
} else if (process.argv.length >= 3) {
    addCommandsToGuild(process.argv.at(2)!!)
} else {
    console.log("No command line arguments specified")
}