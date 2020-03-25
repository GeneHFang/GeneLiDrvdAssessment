//REACT DEPENDENCIES
import React, { useEffect } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

//LOCAL DEPENDENCIES
import Cell from '../components/Cell';

//REDUX DEPENDENCIES
import { connect } from 'react-redux';
import { setGrid } from '../redux/actions/action';
const mapStateToProps = (state) => {
    return({
        grid: state.grid,
        gridNum: state.gridNum,
        topColor: state.topColor,
        bottomColor: state.bottomColor,
    })
};
const mapDispatchToProps = {
    setGrid,
}

const GridContainer = (props) => {
    //LOCALLY KEEP TRACK OF WHICH CELL IS WHICH COLOR
    let black = true;
    
    //CREATE GRID MATRIX BASED ON GRIDNUM
    useEffect( () => {
        let arr = [];
        for (var i = 0 ; i < props.gridNum ; i++)
        {
            let row = [];
            for (var j = 0; j < props.gridNum ; j++)
            {
                if (i<2) { row.push("X"); }
                else if (i > props.gridNum-3 ) { row.push("+"); }
                else { row.push("O"); }
            }
            arr.push(row);
        }    
        props.setGrid(arr);
    }, [props.gridNum]);

    // //DEGUGGING
    // useEffect(()=>{
    //     console.log(props.grid)
    // }, [props.grid]);


    //CREATE GAME BOARD BASED ON GRID MATRIX
    const createBoard = () => {
        return props.grid.map(row => { 
            if (props.gridNum % 2 === 0 ) { black=!black } //OFFSET TO ACCOUNT FOR EVEN GRID DIMENSIONS
            return (
                <Row>
                    {createCells(row)}
                </Row>
            )
        })
    }
    const createCells = (row) => {
        return row.map(cell => {
            let color = (black ? 'gray' : 'white'); //CHANGED 'black' TO 'gray' TO GIVE BLACK PIECES BETTER VISIBILITY
            black = !black;
            if (cell === "X" || cell === "+") {   
                    let pieceFlag = (cell === 'X' ? 'top' : 'bottom');
                    return (<Col> <Cell piece={pieceFlag} color={color} /> </Col>);
                }
            else  { return (<Col> <Cell color={color} /> </Col>); }
            })
    }

    return(
        <div id="grid">
            <Grid fluid >
                {createBoard()}
            </Grid>
        </div>
    )
}


export default connect(mapStateToProps,mapDispatchToProps)(GridContainer);