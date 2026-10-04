import fsp from 'node:fs/promises';
import { type Command } from './types/command.ts';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const getModulesFromFiles = (files: string[]): Promise<Command[]> =>
    Promise.all(
        files.filter(file => file.endsWith('.ts'))
            .map(async file => {
                const { default: command } = await import(`${file}`)
                console.log(`Loaded ${file}`)
                return command
            })
    );

const getFilesRecursively = async (dir: string): Promise<string[]> => {
    console.log(import.meta.url)
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const files = await fsp.readdir(`${__dirname}/${dir}`, { withFileTypes: true })
    const commandsFiles = await Promise.all(files.map(file => {
        const path = `${dir}/${file.name}`
        return file.isDirectory() ? getFilesRecursively(path) : Promise.resolve([path]);
    }));
    return Array.prototype.concat(...commandsFiles)
}

const getCommands = async (dir: string): Promise<Command[]> => getModulesFromFiles(await getFilesRecursively(dir));

const getCommandsMap = async (dir: string): Promise<Map<string, Command>> =>
    (await getCommands(dir)).reduce((map, command) => {
        const { data: { name } } = command
        map.set(name, command)
        return map;
    }, new Map<string, Command>())

export { getCommands, getCommandsMap };