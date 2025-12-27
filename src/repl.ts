import * as readline from "readline";
import process from "process";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from "./command.js";

export function cleanInput(input: string): string[] {
    return input
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
}

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays help information",
            callback: commandHelp,
        },
    };
}
export function startREPL() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt();

    rl.on("line", (line: string) => {
        const words = cleanInput(line);
        if (words.length === 0) {
            rl.prompt();
            return;
        }
        if (words[0] in getCommands()) {
            const command = getCommands()[words[0]];
            command.callback(getCommands());
        } else {
            console.log(`Unknown command`);
        }
        rl.prompt();
    }).on("close", commandExit);
}
