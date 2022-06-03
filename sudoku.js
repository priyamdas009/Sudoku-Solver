"use strict";

var SudokuSolver = (function () {
    var solver;

    function solve(boardString) {
        // console.log(boardString);
        var board1DArray = boardString.split("");
        var boardArray = new Array(9);
        for (var i = 0; i < 9; i++) {
            boardArray[i] = new Array(9);
        }
        var row = 0,
            col = 0;
        // console.log(board1DArray[0]);
        for (var i = 0; i < board1DArray.length; i++) {
            boardArray[row][col] = board1DArray[i];
            col++;
            if (col == 9) {
                row++;
                col = 0;
            }
            if (row == 9) {
                break;
            }
        }
        // console.log(boardArray[0][1]);
        if (boardIsInvalid(boardArray)) {
            return false;
        }
        return solveSudoku(boardArray);
    }

    function solveSudoku(boardArray) {
        if (boardIsSolved(boardArray)) {
            var board1DArray = new Array(81);
            var row = 0,
                col = 0;
            for (var i = 0; i < board1DArray.length; i++) {
                board1DArray[i] = boardArray[row][col];
                col++;
                if (col == 9) {
                    row++;
                    col = 0;
                }
                if (row == 9) {
                    break;
                }
            }
            return board1DArray.join("");
        }
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (boardArray[row][col] === "-") {
                    for (let i = 1; i <= 9; i++) {
                        let ch = i.toString();
                        if (isPossible(boardArray, row, col, ch)) {
                            boardArray[row][col] = ch;
                            if (solveSudoku(boardArray)) {
                                var board1DArray = convertTo1DArray(boardArray);
                                return board1DArray.join("");
                            } else {
                                boardArray[row][col] = "-";
                            }
                        }
                    }
                    return false;
                }
            }
        }

        var board1DArray = convertTo1DArray(boardArray);
        return board1DArray.join("");
    }

    function isPossible(boardArray, row, col, ch) {
        for (let i = 0; i < 9; i++) {
            if (i != col && boardArray[row][i] === ch) {
                return false;
            }
            if (i != row && boardArray[i][col] === ch) {
                return false;
            }
            var subBoardRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
            var subBoardCol = Math.floor(col / 3) * 3 + Math.floor(i % 3);

            if (subBoardRow == row && subBoardCol == col) {
                continue;
            }

            if (boardArray[subBoardRow][subBoardCol] === ch) {
                return false;
            }
        }
        return true;
    }

    function boardIsSolved(boardArray) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (boardArray[i][j] === "-") {
                    return false;
                }
            }
        }
        return true;
    }

    function boardIsInvalid(boardArray) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (
                    boardArray[i][j] != "-" &&
                    !isPossible(boardArray, i, j, boardArray[i][j])
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    function convertTo1DArray(boardArray) {
        var board1DArray = new Array(81);
        var r = 0,
            c = 0;
        for (var j = 0; j < board1DArray.length; j++) {
            board1DArray[j] = boardArray[r][c];
            c++;
            if (c == 9) {
                r++;
                c = 0;
            }
            if (r == 9) {
                break;
            }
        }
        return board1DArray;
    }

    solver = { solve: solve };

    return solver;
})();
