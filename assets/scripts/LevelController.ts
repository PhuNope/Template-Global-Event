import { _decorator, CCFloat, Component, EventTouch, Node, TiledLayer, TiledMap, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum TypeBlocks {
    LEFT_TOP = 1,
    TOP_RIGHT = 2,
    TOP = 3,
    LEFT_BOT = 4,
    LEFT = 5,
    RIGHT = 6,
    BOT_RIGHT = 8,
    LEFT_BOT_RIGHT = 9,
    TOP_LEFT_BOT = 10,
    LEFT_TOP_RIGHT = 11,
    TOP_RIGHT_BOT = 12,
    EMPTY = 13,
    TOP_BOT = 14,
    LEFT_RIGHT = 15
}

enum DirectMove {
    LEFT,
    RIGHT,
    TOP,
    BOT
}

@ccclass('LevelController')
export class LevelController extends Component {
    @property(TiledLayer)
    tiledLayer: TiledLayer = null;

    @property(Node)
    nodes: Node = null;

    _col = 0;
    _row = 4;

    _preNode: Node = null;

    _vecStart: Vec2 = null;

    onLoad() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    start() {
        this.nodes.worldPosition = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node.worldPosition.add(new Vec3(50, 50, 0));
    }

    onTouchStart(event: EventTouch) {
        this._vecStart = event.getUILocation();
    }

    onTouchEnd(event: EventTouch) {
        let vecDirect: Vec2 = event.getUILocation().subtract(this._vecStart);

        let directMove = this.checkDirectMove(vecDirect);
        if (this.checkNodeMove(directMove)) {
            this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;

            switch (directMove) {
                case DirectMove.LEFT:
                    this._col--;
                    break;

                case DirectMove.RIGHT:
                    this._col++;
                    break;

                case DirectMove.TOP:
                    this._row--;
                    break;

                case DirectMove.BOT:
                    this._row++;
                    break;
            }

            this.makeMove();
        }
    }

    checkDirectMove(directVec: Vec2): DirectMove {
        if (directVec.x > 0 && Math.abs(directVec.x) > Math.abs(directVec.y)) return DirectMove.RIGHT;

        if (directVec.x < 0 && Math.abs(directVec.x) > Math.abs(directVec.y)) return DirectMove.LEFT;

        if (directVec.y > 0 && Math.abs(directVec.y) > Math.abs(directVec.x)) return DirectMove.TOP;

        if (directVec.y < 0 && Math.abs(directVec.y) > Math.abs(directVec.x)) return DirectMove.BOT;
    }

    checkNodeMove(directMove: DirectMove): boolean {
        switch (this.tiledLayer.getTiledTileAt(this._col, this._row, true).grid) {
            case TypeBlocks.LEFT_TOP:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.TOP) return false;
                return true;

            case TypeBlocks.TOP_RIGHT:
                if (directMove === DirectMove.TOP || directMove === DirectMove.RIGHT) return false;
                return true;

            case TypeBlocks.TOP:
                if (directMove === DirectMove.TOP) return false;
                return true;

            case TypeBlocks.LEFT_BOT:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.BOT) return false;
                return true;

            case TypeBlocks.LEFT:
                if (directMove === DirectMove.LEFT) return false;
                return true;

            case TypeBlocks.RIGHT:
                if (directMove === DirectMove.RIGHT) return false;
                return true;

            case TypeBlocks.BOT_RIGHT:
                if (directMove === DirectMove.BOT || directMove === DirectMove.RIGHT) return false;
                return true;

            case TypeBlocks.LEFT_BOT_RIGHT:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.BOT || directMove === DirectMove.RIGHT) return false;
                return true;

            case TypeBlocks.TOP_LEFT_BOT:
                if (directMove === DirectMove.TOP || directMove === DirectMove.LEFT || directMove === DirectMove.BOT) return false;
                return true;

            case TypeBlocks.LEFT_TOP_RIGHT:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.TOP || directMove === DirectMove.RIGHT) return false;
                return true;

            case TypeBlocks.TOP_RIGHT_BOT:
                if (directMove === DirectMove.TOP || directMove === DirectMove.RIGHT || directMove === DirectMove.BOT) return false;
                return true;

            case TypeBlocks.EMPTY:
                return true;

            case TypeBlocks.TOP_BOT:
                if (directMove === DirectMove.TOP || directMove === DirectMove.BOT) return false;
                return true;

            case TypeBlocks.LEFT_RIGHT:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.RIGHT) return false;
                return true;
        }
    }

    makeMove() {
        let pos: Vec3 = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node.worldPosition.add(new Vec3(50, 50, 0));
        let that = this;

        tween(this.nodes.worldPosition)
            .to(0.3, pos, {
                onUpdate(target: Vec3, ratio) {
                    that.nodes.worldPosition = target;
                },
            })
            .call(() => {
                this.checkContinueMove();
            })
            .start();
    }

    checkContinueMove() {
        let checkNodeLeft: Node = null;
        let checkNodeTop: Node = null;
        let checkNodeRight: Node = null;
        let checkNodeBot: Node = null;

        switch (this.tiledLayer.getTiledTileAt(this._col, this._row, true).grid) {
            case TypeBlocks.LEFT_TOP:
                checkNodeBot = this.tiledLayer.getTiledTileAt(this._col, this._row + 1, true).node;
                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col++;
                    this.makeMove();
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row++;
                    this.makeMove();
                }
                break;

            case TypeBlocks.TOP_RIGHT:
                checkNodeBot = this.tiledLayer.getTiledTileAt(this._col, this._row + 1, true).node;
                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col--;
                    this.makeMove();
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row++;
                    this.makeMove;
                }
                break;

            case TypeBlocks.LEFT_BOT:
                checkNodeRight = this.tiledLayer.getTiledTileAt(this._col + 1, this._row, true).node;
                if (this._preNode === checkNodeRight) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row--;
                    this.makeMove();
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col++;
                    this.makeMove();
                }
                break;

            case TypeBlocks.BOT_RIGHT:
                checkNodeLeft = this.tiledLayer.getTiledTileAt(this._col - 1, this._row, true).node;
                if (this._preNode === checkNodeLeft) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row--;
                    this.makeMove();
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col--;
                    this.makeMove();
                }
                break;

            case TypeBlocks.TOP_BOT:
                checkNodeLeft = this.tiledLayer.getTiledTileAt(this._col - 1, this._row, true).node;
                if (this._preNode === checkNodeLeft) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col++;
                    this.makeMove();
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col--;
                    this.makeMove();
                }
                break;

            case TypeBlocks.LEFT_RIGHT:
                checkNodeTop = this.tiledLayer.getTiledTileAt(this._col, this._row + 1, true).node;
                if (this._preNode === checkNodeTop) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row++;
                    this.makeMove();
                } else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row--;
                    this.makeMove();
                }
        }
    }

    update(deltaTime: number) {

    }
}