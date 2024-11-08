


let isExpanded = false;

function expandDiv() {
	if (!isExpanded) {
		isExpanded = true;

		const div = document.getElementById('s-div');
		div.classList.add('exp-0');
		const div_o = document.getElementById('search-section');
		div_o.classList.add('vis');
		div_o.classList.add('dis');
		const div_i = document.getElementById('info-list');
		div_i.classList.add('blur');
		const in0 = document.getElementById('in0');
		in0.classList.add('fake-focus');

		input_processing(in0.value);

		// const searchSection = document.getElementById('search-section');
		// // Если хотите добавлять подсказки через скрипт:
		// for (let i = 0; i < 5; i++) {
		// 	const suggestions = document.createElement('div');
		// 	suggestions.classList.add('search-block');
		// 	suggestions.innerHTML = `<span>Подсказка ${i + 1}</span>`;
		// 	searchSection.append(suggestions);
		// }

	}

}

function shrinkDiv() {
	if (isExpanded) {
		isExpanded = false;

		const div = document.getElementById('s-div');
		div.classList.remove('exp-0');
		const div_o = document.getElementById('search-section');
		div_o.classList.remove('vis');
		setTimeout(() => {
			div_o.classList.remove('dis');
		}, 300);
		const div_i = document.getElementById('info-list');
		div_i.classList.remove('blur');
		const in0 = document.getElementById('in0');
		in0.classList.remove('fake-focus');


		// Удаляем блок с подсказками
		const suggestions = document.querySelectorAll('.search-block');
		suggestions.forEach(suggestion => {
			suggestion.remove();
		});

	}

}



function setChoice(oid, type) {
	console.log(oid);
	document.getElementById('in0').blur();
	shrinkDiv();
	getSchedule(oid, type, formatDate(), formatDate(7), render_blocks);
	// setTimeout(()=>{
	// 	console.log(DATA_SCHEDULE);
	// },500)
}




