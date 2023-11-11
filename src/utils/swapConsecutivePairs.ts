export const swapConsecutivePairs = <T>(arr: T[]): T[] => {
    const newArr = [...arr];

    for (let i = 0; i < newArr.length - 1; i += 2) {
        const temp = newArr[i];
        newArr[i] = newArr[i + 1];
        newArr[i + 1] = temp;
    }


    

    
    return newArr;
};
