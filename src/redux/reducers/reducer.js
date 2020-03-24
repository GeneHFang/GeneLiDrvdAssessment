//DEFAULTS
const defaultState = {
    gridNum: 0,
}

//REDUCER
const reducer = (prevState = defaultState, action) => {
    switch (action.type){
        
        //case "EXAMPLE":
            //return {...prevState, key: action.payload}
        case "SET_GRID":
            return {...prevState, gridNum: action.payload};
        default:
            return prevState;
    }
}

//EXPORT
export default reducer