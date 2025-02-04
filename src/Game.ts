import {Application, FederatedPointerEvent, Sprite} from 'pixi.js';
import {Entity} from './Entity';

export class Game {
  private app: Application;
  private background: Sprite;
  private ship: Entity;
  constructor(app: Application) {
    this.app = app;

    this.background = this.createBackground('background');
    this.app.stage.addChild(this.background);

    this.ship = this.createEntity(
      'ship',
      this.app.screen.width / 2,
      this.app.screen.height / 2,
      200,
      200
    );
    this.app.stage.addChild(this.ship.view);

    this.app.stage.eventMode = 'static';
    this.app.stage.on('pointerdown', this.onPointerDown, this);
  }

  public update() {
    this.ship.update();
  }

  private onPointerDown(event: FederatedPointerEvent) {
    let {x, y} = event.global;
    const margin = 80;
    if (x <= margin) x += margin;
    if (x >= this.app.screen.width - margin) x -= margin;
    if (y <= margin) y += margin;
    if (y >= this.app.screen.height - margin) y -= margin;
    this.ship.getPointerTarget({x, y});
  }

  private createBackground(source: string) {
    const background = Sprite.from(source);

    background.anchor.set(0.5);
    background.x = this.app.screen.width / 2;
    background.y = this.app.screen.height / 2;
    background.width = this.app.screen.width;
    background.height = this.app.screen.height;

    return background;
  }

  private createEntity(
    alias: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    const entity = new Entity(alias, x, y);

    entity.view.width = width;
    entity.view.height = height;

    return entity;
  }
}
