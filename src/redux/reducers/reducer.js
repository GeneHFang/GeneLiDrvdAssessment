//DEFAULTS
const defaultState = {
    gridNum: 5,
}

//REDUCER
const reducer = (prevState = defaultState, action) => {
    switch (action.type){
        //case "EXAMPLE":
            //return {...prevState, key: action.payload}
        
        //MIN VALUE FOR GRID IS 5, MAX IS 20
        case "SET_GRID":
            if (action.payload < 5) { return {...prevState, gridNum: 5}; }
            else if (action.payload > 20) { return {...prevState, gridNum: 20}; }
            else { return {...prevState, gridNum: action.payload}; }
        

        default:
            return prevState;
    }
}

//EXPORT
export default reducer