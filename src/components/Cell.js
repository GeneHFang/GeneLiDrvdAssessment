//REACT DEPENDENCIES
import React from 'react';

//LOCAL DEPENDENCIES
import Piece from './Piece';

//REDUX DEPENDENCIES
import { connect } from 'react-redux';
import { movePiece, deHiLight, toggleClick, setTurn } from '../redux/actions/action';
const mapStateToProps = (state) => {
    return({
        hilightedPiece: state.hilightedPiece,
        grid: state.grid,
    });
};
const mapDispatchToProps = {
    movePiece,
    deHiLight, 
    toggleClick, 
    setTurn
}

const Cell = (props) => {
    //CLICK HANDLER, ONLY FUNCTIONS IF CELL IS HILIGHTED BY SELECTING PIECE
    const movePiece = (e) => {
        if(props.hilight){
            props.movePiece(props.row, props.col, props.hilightedPiece, props.grid);
            props.toggleClick();
            props.setTurn((props.hilightedPiece.topOrBottom === 'top' ? 'bottom' : 'top'));
        }
    }

    return(
        <div className="cell" style={{backgroundColor:`${props.color}`}} onClick={movePiece}>
            {props.piece
             ? <Piece color={props.piece} row={props.row} col={props.col} />
             : null}
            {props.hilight
             ?  <div className="hilight"/> 
             : null}
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Cell);