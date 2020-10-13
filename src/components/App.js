import React from "react";

import './App.css';
import Barley from "./Barley";


class App extends React.Component {
    state = {
        completed : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'empty-cell'],
        current: [],
        victory: false
    };

    moveTile = (positions) => {

        if (positions) {
            const newCurrent = [...this.state.current];
            [newCurrent[positions.newEmptyCellPosition], newCurrent[positions.newTilePosition]] =
                [newCurrent[positions.newTilePosition], newCurrent[positions.newEmptyCellPosition]];
            this.setState({'current' : newCurrent});

            if (JSON.stringify([...this.state.current]) === JSON.stringify([...this.state.completed])) {
                this.setState({ 'victory' : true });
            }
        }

    }
    componentDidMount() {
        this.shuffleTiles();
    }

    shuffleTiles = () => {
        const shuffled = this.state.completed
            .map(a => [Math.random(), a])
            .sort((a, b) => a[0] - b[0])
            .map(a => a[1]);
        this.setState({'current' : shuffled });
    };


    render() {
        return (
            <div className="barley-wrapper">
                <Barley shuffled={this.state.current} moveTile = { this.moveTile }/>
                {this.state.victory && <div className="victory">Congratulations! (✿◠‿◠)</div>}
            </div>
        )
    }
}

export default App;

