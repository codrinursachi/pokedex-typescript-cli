export function cleanInput(input: string): string[] { 
    return input
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0);
}