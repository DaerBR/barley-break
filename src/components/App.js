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
        const shuffled = this.arrayShuffle(this.state.completed);

        if (!this.checkSuffling(shuffled)) {
            this.shuffleTiles();
        }

        this.setState({'current' : shuffled });
    };

    arrayShuffle = (array) => {
        return array.map(a => [Math.random(), a])
            .sort((a, b) => a[0] - b[0])
            .map(a => a[1]);
    }

    checkSuffling = (shuffled) => {
        const tilesPerRow = 4;
        let inversionsCount = 0;
        const pos = shuffled.indexOf('empty-cell') + 1;
        const posRowOdd = (pos >= 1 && pos < 5) || (pos >= 9 && pos < 13);

        for (let i = 0; i < tilesPerRow * tilesPerRow - 1; i++) {
            for (let j = i + 1; j < tilesPerRow * tilesPerRow; j++) {
                if (shuffled[j] && shuffled[i] && shuffled[i] > shuffled[j]) {
                    inversionsCount++;
                }
            }
        }

        return (posRowOdd && inversionsCount % 2  === 0) || (!posRowOdd && inversionsCount % 2  !== 0)
    }

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

