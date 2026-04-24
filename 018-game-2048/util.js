
/**
 * 返回当前矩阵生成的新 数字块
 * @param {当前矩阵} currentMatrix 
 */
const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";
const randomBox = (currentMatrix) => {
    const emptyPos = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (!currentMatrix[i][j]) {
                emptyPos.push([i, j])
            }
        }
    }
    if (!emptyPos.length) {
        return ['over']
    }
    const genPos = Math.floor(Math.random() * emptyPos.length);
    const n = Math.random() < 0.9 ? 2 : 4;
    const [i, j] = emptyPos[genPos];
    return [i, j, n];
}

const rotateMatrix = (matrix, direction) => {
    const arr = matrixToArr(matrix)
    let nextMatrix = [];
    switch (direction) {
        case DOWN:
            arr.reverse()
            nextMatrix = arrToMatrix(arr);
            break;
        case UP:
            nextMatrix = matrix;
            break;
        case LEFT:
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    nextMatrix[i] = nextMatrix[i] || [];
                    nextMatrix[i].push(matrix[j][3 - i])
                }
            }
            break;
        case RIGHT:
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    nextMatrix[i] = nextMatrix[i] || [];
                    nextMatrix[i].push(matrix[3 - j][i])
                }
            }
            break;
    }
    return nextMatrix;

}
const mergeMatrix = (matrix) => {
    const topMatrix = matrix.map((row) => {
        let topRow = row.filter(a => a)
        topRow.length = 4;
        let hasAdded;
        do {
            hasAdded = false;
            for (let i = 0; i < topRow.length - 1; i++) {
                if (topRow[i] && topRow[i] == topRow[i + 1]) {
                    topRow[i] = topRow[i] * 2;
                    topRow[i + 1] = null;
                    topRow = topRow.filter(a => a); 
                    topRow.length = 4;
                    hasAdded = true;
                    break;
                }
            }
            topRow = topRow.filter(a => a)
            topRow.length = 4;
        } while (hasAdded)
        return topRow;
    })
    return topMatrix
}
const arrToMatrix = (arr) => {
    const matrix = [];
    for (let i = 0; i < 4; i++) {
        matrix.push(arr.slice(i * 4, (i + 1) * 4))
    }
    return matrix;
}
const matrixToArr = (matrix) => {
    matrix.map((item) => {
        item.length = 4;
    });
    return matrix[0].concat(matrix[1]).concat(matrix[2]).concat(matrix[3]);
}