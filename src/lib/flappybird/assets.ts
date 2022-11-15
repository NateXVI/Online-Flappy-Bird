import { Howl } from 'howler';
import type p5 from 'p5';

export type Assets = ReturnType<typeof getAssets>;

export let assets: Assets;

export const initializeAssets = (p: p5) => {
	assets = getAssets(p);
};

export function getAssets(p: p5) {
	return {
		image: {
			bronzeMedal: p.loadImage('/assets/medal_bronze.png'),
			silverMedal: p.loadImage('/assets/medal_silver.png'),
			goldMedal: p.loadImage('/assets/medal_gold.png'),
			platinumMedal: p.loadImage('/assets/medal_platinum.png'),
			birdSprite: p.loadImage('/assets/bird.png'),
			pipeSpriteDown: p.loadImage('/assets/pipespritedown.png'),
			pipeSpriteUp: p.loadImage('/assets/pipespriteup.png'),
			backgroundImage: p.loadImage('/assets/background.png'),
			groundImage: p.loadImage('/assets/ground.png'),
			scorePanel: p.loadImage('/assets/panel_score.png'),
			newHighScoreLabel: p.loadImage('/assets/label_new.png'),
			gameOverLabel: p.loadImage('/assets/label_game_over.png'),
			flappyLogo: p.loadImage('/assets/flappylogo.png')
		},
		font: {
			titleScreen: p.loadFont('/assets/Pixeled.ttf'),
			score: p.loadFont('/assets/flappy.TTF')
		},
		sound: {
			wing: new Howl({
				src: ['/assets/wing.mp3']
			}),
			die: new Howl({
				src: ['/assets/die.mp3']
			}),
			swoosh: new Howl({
				src: ['/assets/swoosh.mp3']
			}),
			point: new Howl({
				src: ['/assets/point.mp3']
			}),
			hit: new Howl({
				src: ['/assets/hit.mp3']
			})
		}
	};
}
