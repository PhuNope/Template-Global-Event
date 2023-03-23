import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playedGround')
export class playedGround extends Component {
    start() {
        director.emit("abc", "123");
    }

    update(deltaTime: number) {

    }

    onClick() {
        director.emit("abc", this.node);
    }
}


