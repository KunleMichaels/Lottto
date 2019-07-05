import React, { Component } from 'react';
import GridCell from './GridCell';

class Grid extends Component {
    state = {
        rows: 9,
        columns: 10,
        cellMatrix: new Array(10 * 9).fill(1),
        tracker: [],
        maxClick: 5,
    }

    onCellClick = (index) => {
        let cellMatrix = this.state.cellMatrix;
        let tracker = this.state.tracker;
        let search = tracker.findIndex(x => x === index)
        if(search === -1 && tracker.length < this.state.maxClick){
            cellMatrix[index-1] = 0;
            tracker.push(index)
            this.setState({
                cellMatrix,
                tracker
            })
        }
        if(search !== -1) {
            cellMatrix[index-1] = 1;
            tracker.splice(search, 1)
            this.setState({
                cellMatrix,
                tracker
            })
        }
    }

    handleSelect = (event) => {
        let cellMatrix = this.state.cellMatrix;
        let tracker = this.state.tracker
        tracker.splice(event.target.value)
        cellMatrix = cellMatrix.map(function(x, i){
                if(tracker.includes(i+1))
                    return 0
                return 1
            });
        this.setState({
            maxClick: event.target.value,
            cellMatrix,
            tracker,
        })
    }

    render() {
        
        const { rows, columns, cellMatrix } = this.state;

        const cellSize = 400 / columns;

        let gridCells = new Array(rows);
        let count = 1;
        for (let i = 0; i < rows; i++) {
            let gridCellsRow = [];
            for (let j = 0; j < columns; j++) {

                let index = count - 1;

                gridCellsRow.push((
                    <GridCell
                        key={count}
                        count={count}
                        onClick={() => { this.onCellClick(index+1) }}
                        size={cellSize}
                        filled={cellMatrix[index] === 1 ? true : false}
                    />
                ));
                count++;
            }

            gridCells[i] = (
                <div key={i}>{gridCellsRow}</div>
            );
        }

        return (
            <div className="mw9 center ph3-ns">
                <div className="cf ph2-ns">
                    <div className="fl w-50-ns pa2">
                        <section className="Grid">
                            <section className='outline bg-light-green' style={{ width: '420px', height: '100px', }}>
                                <select onChange={this.handleSelect} className="form-control" value={this.state.maxClick}>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                {/* <button className='btn btn-success'> Quick pick</button> */}
                            </section>
                            <section>
                            {gridCells}
                            </section>
                        </section>
                    </div>
                    <div className="fl w-50-ns pa2">
                        <section className='Grid'>
                            <div className='outline bg-green pv4'>
                               <ul style={{ fontSize: '16px', color: 'white'}}>
                                   { this.state.tracker.map((num, index) => (
                                       <li key={index}>{num}</li>
                                   )) }
                               </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Grid;