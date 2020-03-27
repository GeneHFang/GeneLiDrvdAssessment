/*
REFERENCE
export const action = (value) => {
    return {
        type: "TYPE"
        payload: value
    }
}
*/

//SET GRID TO NxN
export const setGridNum = (N) => {
    return {
        type: "SET_GRID_NUM",
        payload: N
    };
};

//SET GRID TO GRID N
export const setGrid = (N) => {
    return {
        type: "SET_GRID",
        payload: N
    };
};

//HIGHLIGHT CELL AT COORDINATE
export const hiLight = (row, col, grid, topOrBottom) => {
    let copy = JSON.parse(JSON.stringify(grid));
    let leftMove, rightMove;
    if (!copy[row][col].includes('h')) { copy[row][col] = copy[row][col]+'h'; }
    if (topOrBottom === 'top'){
        if( copy[row+1] ){
            leftMove = copy[row+1][col-1];
            rightMove = copy[row+1][col+1];
            if (leftMove === 'O') { copy[row+1][col-1] = '/';  }
            if (rightMove === 'O'){ copy[row+1][col+1] = '/';  }
        }
    }
    else {
        if ( copy[row-1] ) {
            leftMove = copy[row-1][col-1];
            rightMove = copy[row-1][col+1];
            if (leftMove === 'O') { copy[row-1][col-1] = '/';  }
            if (rightMove === 'O'){ copy[row-1][col+1] = '/';  }
        }
    }
    return {
        type: "SET_GRID",
        payload: copy
    }
}

//DEHIGHLIGHT CELLS
export const deHiLight = (grid) => {
    console.log('delight')
    let copy = JSON.parse(JSON.stringify(grid));
    copy.forEach((row, rowIndex)=>{
        row.forEach((col, colIndex)=> {
            if (col === '/')
            {
                copy[rowIndex][colIndex] = 'O';
            }
            if (col === 'Xh') { copy[rowIndex][colIndex] = 'X'; }
            if (col === '+h') { copy[rowIndex][colIndex] = '+'; }
        })
    })
    return {
        type: "SET_GRID",
        payload: copy
    }

}


//SET COLOR OF TOP OR BOTTOM PIECES TO COLOR N
export const setPieceColor = (top, N) => {
    return {
        type: "SET_PIECE_COLOR",
        payload: {
            top: top,
            color: N
        }
    };
};

//SET SHAPE OF TOP OR BOTTOM PIECES TO COLOR N
export const setPieceShape = (top, N) => {
    return {
        type: "SET_PIECE_SHAPE",
        payload: {
            top: top,
            shape: N
        }
    };
};


//TOGGLE CLICKED FLAG FOR INDIVIDUAL PIECES
export const toggleClick = () => {
    return {
        type: "CLICK"
    };
};

//STORE SELECTED PIECE COORDINATE
export const storePieceInfo = (row, col, topOrBottom) => {
    return {
        type: "STORE_PIECE_INFO",
        payload: (topOrBottom ? {row: row, col: col, topOrBottom: topOrBottom} : {}),
    }
}

//MOVE PIECE
export const movePiece = (rowDest, colDest, pieceLocation, grid) => {
    let copy = JSON.parse(JSON.stringify(grid));
    let piece= copy[pieceLocation.row][pieceLocation.col];
    copy[pieceLocation.row][pieceLocation.col] = 'O';
    copy[rowDest][colDest] = piece;

    copy.forEach((row, rowIndex)=>{
        row.forEach((col, colIndex)=> {
            if (col === '/')
            {
                copy[rowIndex][colIndex] = 'O';
            }
        })
    })

    return {
        type: "SET_GRID",
        payload: copy
    }
}

//TOGGLE PLAYER TURNS
export const setTurn = (turn) => {
    return {
        type: "TURN",
        payload: turn
    };
};

//CREATE PERSISTANT SAVE STATE
export const save = (state) => {
    return {
        type: "SAVE",
        payload: state
    }
}
