import * as readline from 'readline';
import process from 'process';

export function cleanInput(input: string): string[] { 
    return input
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0);
}

export function startREPL(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > '
    });

    rl.prompt();

    rl.on('line', (line: string) => {
        const words = cleanInput(line);
        if (words.length === 0) {
            rl.prompt();
            return;
        }
        console.log(`Your command was: ${words[0]}`);
        rl.prompt();
    }).on('close', () => {
        console.log('Exiting Pokedex REPL. Goodbye!');
        process.exit(0);
    });
}