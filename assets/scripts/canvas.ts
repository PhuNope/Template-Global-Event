import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('canvas')
export class canvas extends Component {
    onLoad() {
        director.on("abc", (arg) => { console.log(arg); });
    }

    update(deltaTime: number) {

    }
}


