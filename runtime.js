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


function render_blocks_n(type_card) {
	// Удаляем блок с подсказками
	const suggestions = document.querySelectorAll('.info-card');
	suggestions.forEach(suggestion => {
		suggestion.remove();
	});

	let card, date;

	function create_one_subj(num, teacher, subject, type, class_n) {
		let info_block_n = document.createElement('div');
		info_block_n.classList.add('info-block-n');


		let info_block_ingrid_num = document.createElement('div');
		info_block_ingrid_num.classList.add('info-block-ingrid-num');
		info_block_ingrid_num.innerText = num;
		info_block_n.append(info_block_ingrid_num);
		

		let info_block_ingrid_t = document.createElement('div');
		info_block_ingrid_t.classList.add('info-block-ingrid-t');
		info_block_ingrid_t.innerText = teacher;
		info_block_n.append(info_block_ingrid_t);


		let info_block_ingrid_s = document.createElement('div');
		info_block_ingrid_s.classList.add('info-block-ingrid-s');
		info_block_ingrid_s.innerText = subject;
		info_block_n.append(info_block_ingrid_s);

		let info_block_ingrid_c = document.createElement('div');
		info_block_ingrid_c.classList.add('info-block-ingrid-c');
		info_block_ingrid_c.innerText = type;
		info_block_n.append(info_block_ingrid_c);

		let info_block_ingrid_w = document.createElement('div');
		info_block_ingrid_w.classList.add('info-block-ingrid-w');
		info_block_ingrid_w.innerText = class_n;
		info_block_n.append(info_block_ingrid_w);

		return info_block_n;
	}
	
	const searchSection = document.getElementById('info-list');
	let last_date = '';
	for (let i = 0; i < DATA_SCHEDULE.length; i++) {
		if (DATA_SCHEDULE[i].xdt != last_date) {
			last_date = DATA_SCHEDULE[i].xdt;
			
			if (card) {
				searchSection.append(card);
			}
			
			card = document.createElement('div');
			card.classList.add('info-card');

			date = document.createElement('div');
			date.classList.add('info-date');
			let hd = getDateHumanType(DATA_SCHEDULE[i].xdt);
			date.innerHTML = `<span>${hd[0]} ${hd[1]}</span>`;

			card.append(date);
			

		}

		let num_pair = getPairNumber(DATA_SCHEDULE[i].nf, DATA_SCHEDULE[i].kf);
		let info_block_n;
		if (type_card == 0) {
			info_block_n = create_one_subj(num_pair, DATA_SCHEDULE[i].teacher, DATA_SCHEDULE[i].subject, getLessonType(DATA_SCHEDULE[i].type), DATA_SCHEDULE[i].number);
		} else {
			info_block_n = create_one_subj(num_pair, DATA_SCHEDULE[i].group, DATA_SCHEDULE[i].subject, getLessonType(DATA_SCHEDULE[i].type), DATA_SCHEDULE[i].number);
		}
		
		card.append(info_block_n);
	
	}

}