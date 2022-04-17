import fs from 'node:fs';
import { getCommands, getCommandsMap } from './common.js';

const commands = await getCommandsMap('./commands')

console.log(commands)