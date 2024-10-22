/* eslint-disable @typescript-eslint/no-unused-vars */
function randomMatrix(itemCount: number, itemLength: number): Array<Array<number>> {
    return [...Array(itemCount)].map((_) => [...Array(itemLength)].map((__) => Math.random()))
}

function randomFitToInt(num: number, range: number, start: number = 0): number {
    return Math.floor(num * range + start);
}


export { randomMatrix, randomFitToInt };