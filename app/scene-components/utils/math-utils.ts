function randomFitToInt(num: number, start: number, range: number): number {
    return Math.floor(num * range + start);
}


export { randomFitToInt };