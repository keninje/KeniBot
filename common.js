import fsp from 'node:fs/promises';

const getModulesFromFiles = (files) =>
    Promise.all(
        files.filter(file => file.endsWith('.js'))
            .map(async file => {
                const { default: command } = await import(`${file}`)
                console.log(`Loaded ${file}`)
                return command
            })
    );

const getFilesRecursively = async (dir) => {
    const files = await fsp.readdir(dir, { withFileTypes: true })
    const commandsFiles = await Promise.all(files.map(file => {
        const path = `${dir}/${file.name}`
        return file.isDirectory() ? getFilesRecursively(path) : path;
    }));
    return Array.prototype.concat(...commandsFiles)  
}

const getCommands = async (dir) => getModulesFromFiles(await getFilesRecursively(dir));

const getCommandsMap = async (dir) => (await getCommands(dir)).reduce((map, command) => {
    const { data: { name } } = command
    map.set(name, command)
    return map;
}, new Map())

export { getCommands, getCommandsMap };