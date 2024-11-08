function input_processing(text, enter_flag = false) {
	// console.log(text);
	let arr_rating = [];
	for (let i = 0; i < DATA_GROUP_TEACH.length; i++) {
		arr_rating.push({
			oid: DATA_GROUP_TEACH[i].oid,
			type: DATA_GROUP_TEACH[i].type,
			value_proc: scoreMatch(DATA_GROUP_TEACH[i].value, text),
			value_text: DATA_GROUP_TEACH[i].value
		});
	}
	arr_rating.sort((a, b) => b.value_proc - a.value_proc);
	if (arr_rating.length > 10) {
		// console.log(arr_rating.slice(0, 6));
		arr_rating = arr_rating.slice(0, 10);
	}


	if (enter_flag) {
		document.getElementById('in0').value = arr_rating[0].value_text;
		setChoice(arr_rating[0].oid, arr_rating[0].type);


	} else {
		if (isExpanded) {
			// Удаляем блок с подсказками
			const suggestions = document.querySelectorAll('.search-block');
			suggestions.forEach(suggestion => {
				suggestion.remove();
			});
			// console.log(arr_rating)
			const searchSection = document.getElementById('search-section');

			for (let i = 0; i < arr_rating.length; i++) {
				const suggestions = document.createElement('div');
				suggestions.classList.add('search-block');
				suggestions.id = arr_rating[i].oid;
				suggestions.setAttribute('name', arr_rating[i].value_text);
				suggestions.setAttribute('type', arr_rating[i].type);
				suggestions.addEventListener('click', function () {
					document.getElementById('in0').value = this.getAttribute('name');
					setChoice(this.id, this.getAttribute('type'));
				});
				suggestions.innerHTML = `<span>${arr_rating[i].value_text}</span>`;
				searchSection.append(suggestions);
			}

		}

	}

}




function render_blocks() {
	// Удаляем блок с подсказками
	const suggestions = document.querySelectorAll('.info-block');
	suggestions.forEach(suggestion => {
		suggestion.remove();
	});

	
	const searchSection = document.getElementById('info-list');
	let last_date = '';
	for (let i = 0; i < DATA_SCHEDULE.length; i++) {
		if (DATA_SCHEDULE[i].xdt != last_date) {
			last_date = DATA_SCHEDULE[i].xdt;
			const suggestions = document.createElement('div');
			suggestions.classList.add('info-block');
			suggestions.innerHTML = `<span>${getDateHumanType(DATA_SCHEDULE[i].xdt)[0]}</span>`;
			searchSection.append(suggestions);

		}
		const suggestions = document.createElement('div');
		suggestions.classList.add('info-block');
		// suggestions.id = DATA_SCHEDULE[i].oid;
		// suggestions.setAttribute('name', DATA_SCHEDULE[i].value_text);
		// suggestions.addEventListener('click', function () {
		// 	document.getElementById('in0').value = this.getAttribute('name');
		// 	setChoice(this.id);
		// });
		suggestions.innerHTML = `<span>${DATA_SCHEDULE[i].subject}</span>`;
		searchSection.append(suggestions);
	
	}

}