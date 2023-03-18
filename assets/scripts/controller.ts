import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('controller')
export class controller extends Component {
    onLoad() {
        director.on("abc", (arg) => { console.log(arg + "abc"); });
    }

    start() {

    }

    update(deltaTime: number) {

    }
}


