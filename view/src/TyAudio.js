
export default class TyAudio {

	constructor(_synth, _num) {

		this.midiArr = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
		this.synth = _synth;
		this.curMidiNum = _num;

		this.isPlaying = false;

		this.life = 1000;
	}


	attack() {
		this.life = 1000;
		if (this.isPlaying)return;

		this.synth.triggerAttack(this.midiArr[this.curMidiNum]);
		this.isPlaying = true;
	}

	release() {
		if (!this.isPlaying) return;

		this.synth.triggerRelease(this.midiArr[this.curMidiNum]);
		this.isPlaying = false;
	}


	update() {

		if (this.life > 0) {
			this.life -= 50;
		} else {
			this.life = 0;
			this.release();
		}
	}
}