import React from "react";

import './App.css';
import Barley from "./Barley";


class App extends React.Component {
    state = {
        current: [],
        victory: false
    };

    completed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'empty-cell'];

    moveTile = (positions) => {

        if (positions) {
            const newCurrent = [...this.state.current];
            [newCurrent[positions.newEmptyCellPosition], newCurrent[positions.newTilePosition]] =
                [newCurrent[positions.newTilePosition], newCurrent[positions.newEmptyCellPosition]];
            this.setState({current : newCurrent});

            if (this.arraysMatch(this.state.current, this.completed)) {
                this.setState({ 'victory' : true });
            }

        }
    }

    arraysMatch = (array1, array2) => {
        if (array1.length !== array2.length) {
            return false;
        }
        for (let i = 0; i < array1.length; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    };

    componentDidMount() {
        this.shuffleTiles();
    }

    shuffleTiles = () => {
        const shuffled = this.arrayShuffle(this.completed);

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

