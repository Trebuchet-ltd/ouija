import {letterToPosition} from "./utils";

export interface Position {
    x: number,
    y: number
}

export default class Animator2D {
    private speed: number = 0.01;

    private position: Position = {x: 0, y: 0};
    private nextPosition: Position = {x: 0, y: 0};
    private text: string = "";

    setText(text: string) {
        this.text = text;
        this.setNextPosition(letterToPosition(this.text[0]));
    }

    step() {
        const dx = (this.nextPosition.x - this.position.x)
        const dy = (this.nextPosition.y - this.position.y)
        this.position.x +=  dx * this.speed;
        this.position.y += dy * this.speed;

        if(Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
            this.position = this.nextPosition;
            if(this.text.length > 1) {
                this.text = this.text.slice(1);
                this.setNextPosition(letterToPosition(this.text[0]));
            }
        }

        return this.position;
    }

    isDone() {
        return this.text.length === 0;
    }

    private setNextPosition(position: Position) {
        this.nextPosition = position;
    }
}