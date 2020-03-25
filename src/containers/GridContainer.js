import React, {useState} from 'react';
import Cell from '../components/Cell';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

const mapStateToProps = (state) => {
    return({
        gridNum: state.gridNum,
    })
};


const GridContainer = (props) => {

    let black = true;

    const createGrid = () => {
        let arr = [];
        for (var i = 0 ; i < props.gridNum ; i++){
            arr.push(createGridRow())
        }
        return arr;
    }

    const createGridRow = () => {
        if (props.gridNum % 2 === 0 ) { black=!black }
        return (
            <Row>
                {createGridCell()}
            </Row>
        )
    }
    
    const createGridCell = () => {
        let arr = [];
        for (var i = 0 ; i < props.gridNum ; i++){
            if (black) { 
                arr.push(<Col> <Cell color="black"/>  </Col>); 
            }
            else { 
                arr.push(<Col> <Cell color="white"/>  </Col>); 
            }
            black=!black;
        }
        return arr;
    }

    const getColor = (i) => {
        return 
    }


    return(
        <div >
            <Grid fluid id="grid">
                {createGrid()}
            </Grid>
        </div>
    )
}


export default connect(mapStateToProps)(GridContainer);