export default class Arrayutil {
    static spliceArrayToArrays<T>(data: Array<T>, spliceIndex: number): Array<Array<T>> {
        const dormsInCols: Array<Array<any>> = [];
        const colsCount = Math.ceil(data.length / spliceIndex);
        for (let i = 0; i < colsCount; i++) {
            const startIndex = i * spliceIndex;
            const endIndex = Math.min(startIndex + 6, data.length);
            dormsInCols.push(data.slice(startIndex, endIndex));
        }
        return dormsInCols;
    }
}