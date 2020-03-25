//REACT DEPENDENCIES
import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

//LOCAL DEPENDENCIES
import Cell from '../components/Cell';

//REDUX DEPENDENCIES
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return({
        gridNum: state.gridNum,
        topColor: state.topColor,
        bottomColor: state.bottomColor,
    })
};


const GridContainer = (props) => {
    //LOCALLY KEEP TRACK OF WHICH CELL IS WHICH COLOR
    let black = true;

    //CREATE GRID
    const createGrid = () => {
        let arr = [];
        for (var i = 0 ; i < props.gridNum ; i++){
            arr.push(createGridRow(i))
        }
        return arr;
    }

    //CREATE ROW FOR GRID
    const createGridRow = (rowNum) => {
        //TOGGLE FOR EVEN NUMBERED GRIDS TO KEEP CELLS CORRECT COLOR 
        if (props.gridNum % 2 === 0 ) { black=!black }

        //FLAG FOR GENERATING PIECE
        let piece = rowWithPieces(rowNum);

        return (
            <Row>
                {(piece 
                    ? createGridCell(piece)
                    : createGridCell())}
            </Row>
        )
    }

    //CREATE CELL FOR GRID ROW AND PIECE IF pieceFlag CONTAINS A VALUE
    const createGridCell = (pieceFlag = false) => {
        let arr = [];
        for (var i = 0 ; i < props.gridNum ; i++){
            if (black) { arr.push(<Col> <Cell piece={pieceFlag} color="gray"/> </Col>); }
            else { arr.push(<Col> <Cell piece={pieceFlag} color="white"/> </Col>); }

            //TOGGLE BLACK OR WHITE
            black=!black;
        }
        return arr;
    }

    //RETURNS "top" FOR FIRST TWO ROWS, "bottom" FOR BOTTOM TWO ROWS, AND BOOLEAN false FOR ALL OTHER ROWS  
    const rowWithPieces = (rowNum) => {
        if (rowNum <= 1) { return "top"; }
        else if (rowNum >= props.gridNum-2) { return "bottom"; }
        else { return false; }
    }


    return(
        <div id="grid">
            <Grid fluid >
                {createGrid()}
            </Grid>
        </div>
    )
}


export default connect(mapStateToProps)(GridContainer);