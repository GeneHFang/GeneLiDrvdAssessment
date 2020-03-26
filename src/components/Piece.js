import React, {useState} from 'react';

//REDUX DEPENDENCIES
import { connect } from 'react-redux';
import { toggleClick, hiLight, deHiLight, storePieceInfo } from '../redux/actions/action';
const mapStateToProps = (state) => {
    return({
        grid: state.grid,
        gridNum: state.gridNum,
        topColor: state.topColor,
        topShape: state.topShape,
        bottomColor: state.bottomColor,
        bottomShape: state.bottomShape,
        clicked: state.clicked,
        turn: state.turn,
    });
};
const mapDispatchToProps = {
    toggleClick,
    hiLight,
    deHiLight,
    storePieceInfo
}

const Piece = (props) => {
    //LOCAL STATE
    const [clicked, setClicked] = useState(false);

    //DETERMINE SHAPE OF PIECES BASED ON USER SELECTION
    const shape = (topOrBottom) => {
        let shapeKey = topOrBottom+"Shape";
        let colorKey = topOrBottom+"Color";

        switch (props[shapeKey]){
            //TRIANGULAR SHAPE RESTS ON BOTTOM OF CELL
            case "triangle":
                return( <div className='triangle' style={{ borderBottom: `40px solid ${props[colorKey]}` }}/> );
            
            //SQUARE IS CENTERBOUND, LIKE CIRCLE
            case "square":
                return( <div className='square' style={{ background: props[colorKey] }}/> );
            
            //DEFAULT SHAPE IS CIRCLE
            default:
                return( <div className='circle' style={{ background: props[colorKey] }} /> );
        }
    }

    

    //PIECE CLICK HANDLER
    const handleClick = (e) => {
        if (!props.clicked) {
            //ONLY FUNCTIONS IF IT IS CORRESPONDING PLAYER'S TURN
            if (props.turn === props.color){
                props.toggleClick();
                setClicked(true);
                props.hiLight(props.row, props.col, props.grid, props.color);
                props.storePieceInfo(props.row, props.col, props.color);
            }
        }
        else if (clicked && props.clicked)
        {
            props.toggleClick();
            setClicked(false);
            props.deHiLight(props.grid);
            props.storePieceInfo();
        }

    }

    return(
        <div onClick={handleClick} className="piece" style={clicked ? {border:'3px solid #ccff15'} : {}}>
            {shape(props.color)}
        </div>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(Piece);