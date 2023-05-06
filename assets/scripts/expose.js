// expose.js

/**
 * Change the horn image based on the horn selected
 * @param {HTMLSelectElement} select - The horn select element
 * @param {HTMLImageElement} img - The horn image element
 */
const changeHorn = (select, img, audio) => {
	// Change the horn image
	const horn = select.value;

	switch (horn) {
		case 'air-horn':
			img.src = 'assets/images/air-horn.svg';
			img.alt = 'Air Horn';
			break;
		case 'car-horn':
			img.src = 'assets/images/car-horn.svg';
			img.alt = 'Car Horn';
			break;
		case 'party-horn':
			img.src = 'assets/images/party-horn.svg';
			img.alt = 'Party Horn';
			break;
		default:
			img.src = 'assets/images/no-image.png';
			img.alt = 'No Image';
			break;
	}

	// Change the audio source
	audio.src = `assets/audio/${select.value}.mp3`;
}

/**
 * Change the volume icon based on the volume slider
 * @param {HTMLInputElement} slider - The volume slider
 * @param {HTMLImageElement} icon - The volume icon
 * @param {HTMLAudioElement} audio - The audio element
 */
const changeVolume = (slider, icon, audio) => {
	const volume = Number(slider?.value)

	switch (true) {
		case (volume === 0):
			icon.src = 'assets/icons/volume-level-0.svg'
			icon.alt = 'Volume level 0'
			break
		case (volume < 33):
			icon.src = 'assets/icons/volume-level-1.svg'
			icon.alt = 'Volume level 1'
			break
		case (volume < 67):
			icon.src = 'assets/icons/volume-level-2.svg'
			icon.alt = 'Volume level 2'
			break
		default:
			icon.src = 'assets/icons/volume-level-3.svg'
			icon.alt = 'Volume level 3'
			break
	}

	audio.volume = volume / 100
}

/**
 * Play the audio
 * Disable the button until the audio is finished playing
 * If the party horn is selected, play the confetti animation
 * @param {HTMLAudioElement} audio - The audio element
 * @param {HTMLButtonElement} button - The button element
 * @param {HTMLSelectElement} select - The horn select element
 * @param {ConfettiGenerator} confetti - The confetti generator
 */
const play = async (audio, button, select, confetti) => {
	// Play the audio
	audio.play()

	// If the party horn is selected, play the confetti animation
	if (select.value === 'party-horn') {
		confetti.addConfetti()
	}

	// Disable the button until the audio is finished playing 
	// or change to different horn
	button.disabled = true
	await new Promise(resolve => {
		audio.addEventListener('ended', resolve)
		select.addEventListener('change', resolve)
	})
	button.disabled = false
}


/**
 * Initialize the expose page
 */
const init = async () => {
	// image element
	const hornSelect = document.getElementById('horn-select')
	const hornImg = document.querySelector("#expose>img")
	// audio element
	const audio = document.querySelector('#expose>audio')
	const volumeSlider = document.getElementById('volume')
	const volumeIcon = document.querySelector('#volume-controls>img')
	// button element
	const button = document.querySelector('#expose>button')
	// confetti element
	const confetti = new JSConfetti()

	hornSelect?.addEventListener('change', changeHorn.bind(null, hornSelect, hornImg, audio))
	volumeSlider?.addEventListener('input', changeVolume.bind(null, volumeSlider, volumeIcon, audio))
	button?.addEventListener('click', play.bind(null, audio, button, hornSelect, confetti))
}


window.addEventListener('DOMContentLoaded', init)