import * as SINT from 'sint.js'
import io from 'socket.io-client';

import * as Tone from 'tone';
import TyAudio from './TyAudio';


const config = {
	domElement: document.querySelector('#webglContainer'), // 画布容器
	initWidth: 750,
	initHeight: 1334,
	showFPS: true,
	backgroundColor: 0x2a3145,
};

const assets1 = {
	bg: './assets/bg.png',
	pic1: './assets/pic1.png',
	sound0: './assets/sound/bg.mp3',
	sound1: './assets/sound/s1.mp3',
	sound2: './assets/sound/s2.mp3',
}

var game = new SINT.Game(config);
game.preload({
	assets: assets1,
	loaded: create,
})
function create() {
	// audio
	var s0 = SINT.Audios.add('sound1');

	//bg image
	var bg = new SINT.SpriteClip(0, 0, 'bg');
	game.add(bg);


	//btn
	var btn1 = new SINT.SpriteClip(288, 292, 'pic1');
	game.add(btn1);
	btn1.anchor.set(0.5);
	btn1.interactive = true;
	btn1.on('pointerdown', function() {
		SINT.Tween.to(btn1.scale, .6, {
			x: 1.2,
			y: 1.2,
			ease: Elastic.easeOut,
			onComplete: function() {
				SINT.Tween.to(btn1.scale, .4, {
					x: 1,
					y: 1,
				});

			}
		});

		// s0.play();
		audioArr[0].attack();
	})

	btn1.on('pointerup', function() {
		// audioArr[1].release();
		console.log(audioArr[0].life)
	})


	//update
	game.ticker.add(update);
}



var socket = io('http://127.0.0.1:3040/');
socket.on('aArr', aArrFrame);

var synth = new Tone.PolySynth(8, Tone.Synth).toMaster();
var audioArr = [];
for (var i = 0; i < 7; i++) {
	var _audio = new TyAudio(synth, i);
	audioArr.push(_audio);
}


function aArrFrame(_d) {
	// let depth8Arr = pako.inflate(depthBuffer);
	var _num = _d;
	audioArr[_num].attack();
}



function update() {

	for (var i = 0; i < audioArr.length; i++) {
		audioArr[i].update();
	}

}