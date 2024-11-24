function randomFitToInt(num: number, start: number, range: number): number {
    return Math.floor(num * range + start);
}

function simpleHash(s: string): string {
    var hash = 0,
        i, chr;
    if (s.length === 0) return hash.toString();
    for (i = 0; i < s.length; i++) {
        chr = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function randomString(length: number): string {
    const chars: string[] = [];
    for (let i = 0; i < length; i++) {
        chars.push(
            characters.charAt(Math.floor(Math.random() * characters.length))
        );
    }
    return chars.join("");
}

export { randomFitToInt, simpleHash, randomString };