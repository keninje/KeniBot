import fs from 'node:fs';

const getCommands = async (dir) => {
    const commands =
        fs.readdirSync(dir)
            .filter(file => file.endsWith('.js'))
            .map(async file => {
                const { default: command } = await import(`${dir}/${file}`)
                console.log(`Loaded ${file}`)
                return command
            });
    return Promise.all(commands);
}

const getCommandsMap = async (dir) => (await getCommands(dir)).reduce((map, command) => {
    const { data: { name } } = command
    map.set(name, command)
    return map;
}, new Map())

export { getCommands, getCommandsMap };