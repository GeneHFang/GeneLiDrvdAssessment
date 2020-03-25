//DEFAULTS
const defaultState = {
    gridNum: 5,
    topColor: 'red',
    topShape: 'circle',
    bottomColor: 'black',
    bottomShape: 'circle',
    clicked: false,
    topTurn: true,
    grid: []
}

//REDUCER
const reducer = (prevState = defaultState, action) => {
    switch (action.type){
        //case "EXAMPLE":
            //return {...prevState, key: action.payload}
        
        //MIN VALUE FOR GRID IS 5, MAX IS 20
        case "SET_GRID_NUM":
            if (action.payload < 5) { return {...prevState, gridNum: 5}; }
            else if (action.payload > 20) { return {...prevState, gridNum: 20}; }
            else { return {...prevState, gridNum: action.payload}; }

        //SET GRID TO PAYLOAD
        case "SET_GRID":
            return {...prevState, grid: action.payload};
        
        //SET COLOR FOR PIECES
        case "SET_PIECE_COLOR":
            if (action.payload.top) { return {...prevState, topColor: action.payload.color}; }
            else { return {...prevState, bottomColor: action.payload.color}; }

        //SET SHAPE FOR PIECES
        case "SET_PIECE_SHAPE":
            if (action.payload.top) { return {...prevState, topShape: action.payload.shape}; }
            else { return {...prevState, bottomShape: action.payload.shape}; }
        
        //TOGGLE FLAG FOR CLICKED PIECE
        case "CLICK":
            return {...prevState, clicked: !prevState.clicked };

        //TOGGLE PLAYER TURNS
        case "TURN":
            return {...prevState, topTurn: !prevState.topTurn };

        default:
            return prevState;
    }
}

//EXPORT
export default reducer