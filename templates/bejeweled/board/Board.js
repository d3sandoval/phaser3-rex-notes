// methods
import Init from './Init.js'
import Reset from './Reset.js';
import Fill from './Fill.js';
import BreakMatch3 from './BreakMatch3.js';
import PreTest from './PreTest.js';
import Fall from './Fall.js';
import GetMatchLines from './match/GetMatchLines.js';
import AnyMatchLine from './match/AnyMatchLine.js';

const GetValue = Phaser.Utils.Objects.GetValue;
class Board {
    constructor(scene, config) {
        this.board = scene.rexBoard.add.board(GetValue(config, 'board', undefined));
        this.match = scene.rexBoard.add.match(GetValue(config, 'match', undefined));
        this.match.setBoard(this.board);

        this.initSymbolsMap = GetValue(config, 'initMap', undefined); // 2d array
        // configuration of chess
        this.chessTileZ = GetValue(config, 'chess.tileZ', 1);
        this.candidateSymbols = GetValue(config, 'chess.symbols', undefined);
        this.chessCallbackScope = GetValue(config, 'chess.scope', undefined);
        this.chessCreateCallback = GetValue(config, 'chess.create', undefined);

    }

    setBoardWidth(width) {
        this.board.setBoardWidth(width);
        return this;
    }

    setBoardHeight(height) {
        this.board.setBoardHeight(height);
        return this;
    }

    setChessCreateCallback(callback, scope) {
        this.chessCallbackScope = callback;
        this.chessCallbackScope = scope;
        return this;
    }

    setCandidateSymbols(symbols) {
        this.candidateSymbols = symbols;
        return this;
    }

    setChessTileZ(tileZ) {
        this.chessTileZ = tileZ;
        return this;
    }

    setInitSymbolsMap(map) {
        this.initSymbolsMap = map; // 2d array
        return this;
    }

    onPointerDown(callback, scope) {
        this.board
            .setInteractive()
            .on('gameobjectdown', callback, scope);
        return this;
    }

    onPointerMove(callback, scope) {
        this.board
            .setInteractive()
            .on('gameobjectmove', function (pointer, gameObject) {
                if (!pointer.isDown) {
                    return;
                }
                callback.call(scope, pointer, gameObject);
            });
        return this;
    }

    onPointerUp(callback, scope) {
        this.board
            .setInteractive()
            .on('gameobjectup', callback, scope);
        return this;
    }
}

var methods = {
    init: Init,
    reset: Reset,
    fill: Fill,
    breakMatch3: BreakMatch3,
    preTest: PreTest,
    fall: Fall,
    getMatchLines: GetMatchLines,
    anyMatchLine: AnyMatchLine,
}
Object.assign(
    Board.prototype,
    methods
);
export default Board;