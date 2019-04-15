import * as SINT from 'sint.js'
import io from 'socket.io-client';

import * as Tone from 'tone'


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

var loadingTxt = new SINT.TextClip(game.initWidth / 2, 600, '0%', {
	fontFamily: 'Arial',
	fontSize: 42,
	fontWeight: 'bold',
	fill: ['#d2497d', '#5a7cd3']
})
loadingTxt.anchor.set(0.5)
game.add(loadingTxt)

game.preload({
	assets: assets1,
	loading: loading,
	loaded: create,
})

function loading(e) {
	console.log("loading1_" + e.progress)
	loadingTxt.text = Math.floor(e.progress) + '%'
}


function create() {
	game.remove(loadingTxt)

	console.log(SINT.loader.resources);

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

		s0.play();
	})

}



var synth = new Tone.PolySynth(8, Tone.Synth).toMaster();

var socket = io('http://127.0.0.1:3040/');
socket.on('aArr', aArrFrame);


var aArr = [0,0,0,0,0,0,0,0,0];

function aArrFrame(_d) {
	// let depth8Arr = pako.inflate(depthBuffer);

	// console.log(_d);
    if(aArr[_d] == 0 )
    {
    	var _num =_d;
    	aArr[_num] = 1;
    	console.log(aArr);
    	var _name = "C"+(_num+2);
    	console.log(_name);

    	synth.triggerAttackRelease(_name,.1);

    	setTimeout(function(){
    		aArr[_num] = 0;
    	},1000);
    }


	

	// synth.triggerAttackRelease(["C4", "E4", "A4"], "4n");
	
}