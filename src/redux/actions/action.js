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

//TOGGLE PLAYER TURNS
export const toggleTurn = () => {
    return {
        type: "TURN"
    };
};