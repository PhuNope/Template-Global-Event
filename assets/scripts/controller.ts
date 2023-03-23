import { _decorator, Component, director, Graphics, Node, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('controller')
export class controller extends Component {
    @property(Graphics)
    graphicss: Graphics = null;

    @property(Node)
    buttonNode: Node = null;

    moving: boolean = false;

    onLoad() {
        director.on("abc", (arg) => { console.log(arg + "abc"); });
    }

    start() {
        // let that = this;

        // tween(this.buttonNode.position)

        //     .to(3, new Vec3(250, 0, 0), {
        //         onStart() {
        //             that.moving = true;
        //         },
        //         onUpdate(target: Vec3, ratio) {
        //             that.buttonNode.position = target;
        //         },
        //         onComplete() {
        //             that.moving = false;
        //         }
        //     })
        // .start();


    }

    update(deltaTime: number) {
        // if (!this.moving) return;

        // this.graphicss.clear();
        // this.graphicss.moveTo(0, 0);
        // this.graphicss.lineTo(0, 100);
        // this.graphicss.lineTo(this.buttonNode.position.x, this.buttonNode.position.y);
        // this.graphicss.stroke();
    }
}


