import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"
import { clientId, guildId } from "./config.js"
import dotenv from 'dotenv'
import { getCommands } from "./common.js"
dotenv.config()

const commands = (await getCommands('./commands')).map(c => c.data.toJSON())

const rest = new REST({version: 10}).setToken(process.env.DISCORD_TOKEN)

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered app commands!"))
    .catch(console.error)