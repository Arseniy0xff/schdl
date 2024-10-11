function expandDiv() {
	const div = document.getElementById('s-div');
	div.classList.add('exp-0');
	const div_o = document.getElementById('search-section');
	div_o.classList.add('vis');
	div_o.classList.add('dis');
	const div_i = document.getElementById('info-list');
	div_i.classList.add('blur');
	const in0 = document.getElementById('in0');
	in0.classList.add('fake-focus');

	

	// const searchSection = document.getElementById('search-section');
	// // Если хотите добавлять подсказки через скрипт:
	// for (let i = 0; i < 5; i++) {
	// 	const suggestions = document.createElement('div');
	// 	suggestions.classList.add('search-block');
	// 	suggestions.innerHTML = `<p>Подсказка ${i + 1}</p>`;
	// 	searchSection.append(suggestions);
	// }

}

function shrinkDiv() {
	const div = document.getElementById('s-div');
	div.classList.remove('exp-0');
	const div_o = document.getElementById('search-section');
	div_o.classList.remove('vis');
	setTimeout(()=> {
		div_o.classList.remove('dis');
	},300);
	const div_i = document.getElementById('info-list');
	div_i.classList.remove('blur');
	const in0 = document.getElementById('in0');
	in0.classList.remove('fake-focus');


	// Удаляем блок с подсказками
	// const suggestions = document.querySelectorAll('.search-block');
    // suggestions.forEach(suggestion => {
    //     suggestion.remove();
    // });
}


document.addEventListener('DOMContentLoaded', () => {
	const in0 = document.getElementById('in0');

	in0.addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
			in0.blur(); // Вызываем событие onblur
		}
	});
})
