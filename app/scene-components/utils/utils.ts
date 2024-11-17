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


export { randomFitToInt, simpleHash };