import React from "react";

const Barley = ({shuffled, moveTile}) => {
    const moveCurrentTile = (tile) => {
        const targetIndex = shuffled.indexOf(tile);
        const emptyCellIndex = shuffled.indexOf('empty-cell');

        if (targetIndex !== -1) {
            const positions = {
                'newEmptyCellPosition' : targetIndex,
                'newTilePosition' : null
            };

            switch (emptyCellIndex) {
                case (targetIndex - 1) :
                    positions.newTilePosition = targetIndex - 1;
                    break;
                case targetIndex + 1 :
                    positions.newTilePosition = targetIndex + 1;
                    break;
                case targetIndex - 4 :
                    positions.newTilePosition = targetIndex - 4;
                    break;
                case targetIndex + 4 :
                    positions.newTilePosition = targetIndex + 4;
                    break;
                default :
                    return null;
            }

            return moveTile(positions);
        }
    }
    const renderBarley = shuffled.map((tile) => {
        return (
            <div
                key={tile}
                className={`barley-cell ${tile === 'empty-cell' ? tile : ''}`}
                onClick={() => moveCurrentTile(tile) }
            >
                { tile !== 'empty-cell' ? tile : '' }
            </div>
        );
    });

    return <div className="barley-body">{renderBarley}</div>
}

export default Barley;