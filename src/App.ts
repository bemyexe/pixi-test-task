import {Application, Assets} from 'pixi.js';
import {ASSETS, CONFIG} from './config';
import {Game} from './Game';

class AppInit {
  private app: Application;
  private game!: Game;
  constructor() {
    this.app = new Application();
  }

  public async init() {
    await this.app.init(CONFIG);
    await this.preload();

    document.body.appendChild(this.app.canvas);

    this.game = new Game(this.app);
    this.app.ticker.add(this.game.update, this.game);
  }

  private async preload() {
    await Assets.load(ASSETS);
  }
}

export const App = new AppInit();
