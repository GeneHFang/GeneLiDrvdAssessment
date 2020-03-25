//DEPENDENCIES
import React from 'react';
import Cell from '../components/Cell';
import { Grid, Row, Col } from 'react-flexbox-grid';

//REDUX DEPENDENCIES
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return({
        gridNum: state.gridNum,
    })
};


const GridContainer = (props) => {
    //LOCALLY KEEP TRACK OF WHICH CELL IS WHICH COLOR
    let black = true;

    //CREATE GRID
    const createGrid = () => {
        let arr = [];
        for (var i = 0 ; i < props.gridNum ; i++){
            arr.push(createGridRow())
        }
        return arr;
    }
    //CREATE ROW FOR GRID
    const createGridRow = () => {
        //TOGGLE FOR EVEN NUMBERED GRIDS TO KEEP CELLS CORRECT COLOR 
        if (props.gridNum % 2 === 0 ) { black=!black }
        return (
            <Row>
                {createGridCell()}
            </Row>
        )
    }
    //CREATE CELL FOR GRID ROW
    const createGridCell = () => {
        let arr = [];
        for (var i = 0 ; i < props.gridNum ; i++){
            if (black) { arr.push(<Col> <Cell color="black"/> </Col>); }
            else { arr.push(<Col> <Cell color="white"/> </Col>); }

            //TOGGLE BLACK OR WHITE
            black=!black;
        }
        return arr;
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