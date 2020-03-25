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
export const setGrid = (N) => {
    return {
        type: "SET_GRID",
        payload: N
    };
};
