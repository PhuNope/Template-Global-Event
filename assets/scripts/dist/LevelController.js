"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LevelController = void 0;
var cc_1 = require("cc");
var ccclass = cc_1._decorator.ccclass, property = cc_1._decorator.property;
var TypeBlocks;
(function (TypeBlocks) {
    TypeBlocks[TypeBlocks["LEFT_TOP"] = 1] = "LEFT_TOP";
    TypeBlocks[TypeBlocks["TOP_RIGHT"] = 2] = "TOP_RIGHT";
    TypeBlocks[TypeBlocks["TOP"] = 3] = "TOP";
    TypeBlocks[TypeBlocks["LEFT_BOT"] = 4] = "LEFT_BOT";
    TypeBlocks[TypeBlocks["LEFT"] = 5] = "LEFT";
    TypeBlocks[TypeBlocks["RIGHT"] = 6] = "RIGHT";
    TypeBlocks[TypeBlocks["BOT_RIGHT"] = 8] = "BOT_RIGHT";
    TypeBlocks[TypeBlocks["LEFT_BOT_RIGHT"] = 9] = "LEFT_BOT_RIGHT";
    TypeBlocks[TypeBlocks["TOP_LEFT_BOT"] = 10] = "TOP_LEFT_BOT";
    TypeBlocks[TypeBlocks["LEFT_TOP_RIGHT"] = 11] = "LEFT_TOP_RIGHT";
    TypeBlocks[TypeBlocks["TOP_RIGHT_BOT"] = 12] = "TOP_RIGHT_BOT";
    TypeBlocks[TypeBlocks["EMPTY"] = 13] = "EMPTY";
    TypeBlocks[TypeBlocks["TOP_BOT"] = 14] = "TOP_BOT";
    TypeBlocks[TypeBlocks["LEFT_RIGHT"] = 15] = "LEFT_RIGHT";
})(TypeBlocks || (TypeBlocks = {}));
var DirectMove;
(function (DirectMove) {
    DirectMove[DirectMove["LEFT"] = 0] = "LEFT";
    DirectMove[DirectMove["RIGHT"] = 1] = "RIGHT";
    DirectMove[DirectMove["TOP"] = 2] = "TOP";
    DirectMove[DirectMove["BOT"] = 3] = "BOT";
})(DirectMove || (DirectMove = {}));
var LevelController = /** @class */ (function (_super) {
    __extends(LevelController, _super);
    function LevelController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tiledLayer = null;
        _this.nodes = null;
        _this._col = 0;
        _this._row = 4;
        _this._preNode = null;
        _this._vecStart = null;
        return _this;
    }
    LevelController.prototype.onLoad = function () {
        this.node.on(cc_1.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc_1.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    };
    LevelController.prototype.start = function () {
        this.nodes.worldPosition = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node.worldPosition.add(new cc_1.Vec3(50, 50, 0));
    };
    LevelController.prototype.onTouchStart = function (event) {
        this._vecStart = event.getUILocation();
    };
    LevelController.prototype.onTouchEnd = function (event) {
        var vecDirect = event.getUILocation().subtract(this._vecStart);
        var directMove = this.checkDirectMove(vecDirect);
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
    };
    LevelController.prototype.checkDirectMove = function (directVec) {
        if (directVec.x > 0 && Math.abs(directVec.x) > Math.abs(directVec.y))
            return DirectMove.RIGHT;
        if (directVec.x < 0 && Math.abs(directVec.x) > Math.abs(directVec.y))
            return DirectMove.LEFT;
        if (directVec.y > 0 && Math.abs(directVec.y) > Math.abs(directVec.x))
            return DirectMove.TOP;
        if (directVec.y < 0 && Math.abs(directVec.y) > Math.abs(directVec.x))
            return DirectMove.BOT;
    };
    LevelController.prototype.checkNodeMove = function (directMove) {
        switch (this.tiledLayer.getTiledTileAt(this._col, this._row, true).grid) {
            case TypeBlocks.LEFT_TOP:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.TOP)
                    return false;
                return true;
            case TypeBlocks.TOP_RIGHT:
                if (directMove === DirectMove.TOP || directMove === DirectMove.RIGHT)
                    return false;
                return true;
            case TypeBlocks.TOP:
                if (directMove === DirectMove.TOP)
                    return false;
                return true;
            case TypeBlocks.LEFT_BOT:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.BOT)
                    return false;
                return true;
            case TypeBlocks.LEFT:
                if (directMove === DirectMove.LEFT)
                    return false;
                return true;
            case TypeBlocks.RIGHT:
                if (directMove === DirectMove.RIGHT)
                    return false;
                return true;
            case TypeBlocks.BOT_RIGHT:
                if (directMove === DirectMove.BOT || directMove === DirectMove.RIGHT)
                    return false;
                return true;
            case TypeBlocks.LEFT_BOT_RIGHT:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.BOT || directMove === DirectMove.RIGHT)
                    return false;
                return true;
            case TypeBlocks.TOP_LEFT_BOT:
                if (directMove === DirectMove.TOP || directMove === DirectMove.LEFT || directMove === DirectMove.BOT)
                    return false;
                return true;
            case TypeBlocks.LEFT_TOP_RIGHT:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.TOP || directMove === DirectMove.RIGHT)
                    return false;
                return true;
            case TypeBlocks.TOP_RIGHT_BOT:
                if (directMove === DirectMove.TOP || directMove === DirectMove.RIGHT || directMove === DirectMove.BOT)
                    return false;
                return true;
            case TypeBlocks.EMPTY:
                return true;
            case TypeBlocks.TOP_BOT:
                if (directMove === DirectMove.TOP || directMove === DirectMove.BOT)
                    return false;
                return true;
            case TypeBlocks.LEFT_RIGHT:
                if (directMove === DirectMove.LEFT || directMove === DirectMove.RIGHT)
                    return false;
                return true;
        }
    };
    LevelController.prototype.makeMove = function () {
        var _this = this;
        var pos = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node.worldPosition.add(new cc_1.Vec3(50, 50, 0));
        var that = this;
        cc_1.tween(this.nodes.worldPosition)
            .to(0.3, pos, {
            onUpdate: function (target, ratio) {
                that.nodes.worldPosition = target;
            }
        })
            .call(function () {
            _this.checkContinueMove();
        })
            .start();
    };
    LevelController.prototype.checkContinueMove = function () {
        var checkNodeLeft = null;
        var checkNodeTop = null;
        var checkNodeRight = null;
        var checkNodeBot = null;
        switch (this.tiledLayer.getTiledTileAt(this._col, this._row, true).grid) {
            case TypeBlocks.LEFT_TOP:
                checkNodeBot = this.tiledLayer.getTiledTileAt(this._col, this._row + 1, true).node;
                if (this._preNode === checkNodeBot) {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._col++;
                    this.makeMove();
                }
                else {
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
                }
                else {
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
                }
                else {
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
                }
                else {
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
                }
                else {
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
                }
                else {
                    this._preNode = this.tiledLayer.getTiledTileAt(this._col, this._row, true).node;
                    this._row--;
                    this.makeMove();
                }
        }
    };
    LevelController.prototype.update = function (deltaTime) {
    };
    __decorate([
        property(cc_1.TiledLayer)
    ], LevelController.prototype, "tiledLayer");
    __decorate([
        property(cc_1.Node)
    ], LevelController.prototype, "nodes");
    LevelController = __decorate([
        ccclass('LevelController')
    ], LevelController);
    return LevelController;
}(cc_1.Component));
exports.LevelController = LevelController;
