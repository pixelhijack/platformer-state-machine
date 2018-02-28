import Boot from './boot';
import Menu from './menu';
import Game from './game';
import GameOver from './gameover';

const config = {
    entryPoint: {
        x: 100,
        y: 100
    },
    width: 546,
    height: 368,
    blocks: 3,
    parent: 'app',
    scaleMode: 0,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [
        Boot,
        Menu,
        Game
    ],

    backgroundPath: 'backgrounds/',
    tilesetPath: 'tilesets/',
    levelPath: 'levels/',
    textureAtlasPath: 'spritesheets/',
    textureAtlasName: 'pre2atlas',
    textureAtlasImage: 'pre2atlas.png',
    textureAtlasJson: 'pre2atlas.json'
};

export default config;
