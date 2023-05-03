// expose.js

/**
 * Change the horn image based on the horn selected
 * @param {HTMLSelectElement} select - The horn select element
 * @param {HTMLImageElement} img - The horn image element
 */
const changeHorn = (select, img) => {
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
}

/**
 * Initialize the expose page
 */
const init = () => {
	const hornSelect = document.getElementById('horn-select');
	const hornImg = document.querySelector("#expose>img");

	hornSelect.addEventListener('change', changeHorn.bind(null, hornSelect, hornImg));
}

window.addEventListener('DOMContentLoaded', init);