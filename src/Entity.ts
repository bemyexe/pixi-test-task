import {Sprite} from 'pixi.js';

interface PointerTarget {
  x: number;
  y: number;
}

const SPEED_AMPLITUDE = 0.13;
const FLIGHT_AMPLITUDE = 0.7;
const FLIGHT_SPEED = 0.02;

export class Entity {
  private _view: Sprite;
  private flightTime: number = 0;
  private target: PointerTarget;
  constructor(alias: string, x: number, y: number) {
    this._view = Sprite.from(alias);
    this._view.anchor.set(0.5);
    this.x = x;
    this.y = y;
    this.target = {x, y};
  }

  get view() {
    return this._view;
  }

  get x() {
    return this._view.x;
  }

  get y() {
    return this._view.y;
  }

  set x(x: number) {
    this._view.x = x;
  }

  set y(y: number) {
    this._view.y = y;
  }

  public update() {
    this.animateFlight();
    this.move();
  }

  public getPointerTarget({x, y}: PointerTarget) {
    this.target = {x, y};
  }

  private animateFlight() {
    this.flightTime += SPEED_AMPLITUDE;
    this._view.y += Math.sin(this.flightTime) * FLIGHT_AMPLITUDE;
  }

  private move() {
    this.x += (this.target.x - this.x) * FLIGHT_SPEED;
    this.y += (this.target.y - this.y) * FLIGHT_SPEED;
  }
}
