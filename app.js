// Globals values
let DATA_GROUP_TEACH = [], DATA_SCHEDULE = [];



function getTAndG(customFunc = () => {}) {
	let data_out;
	fetch('http://services.niu.ranepa.ru/API/public/teacher/teachersAndGroupsList')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			//console.log(data);
			DATA_GROUP_TEACH = data;
			customFunc();
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
	return data_out;
}


function getSchedule(group_id, group_type, date_b, date_e, customFunc = () => { }) {
	const data = {
		id: group_id,
		dateBegin: date_b,
		dateEnd: date_e
	};
	if (Boolean(group_type)) {
		fetch('http://services.niu.ranepa.ru/API/public/teacher/getSchedule', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				DATA_SCHEDULE = data;
				customFunc();

			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});
	} else {
		fetch('http://services.niu.ranepa.ru/API/public/group/getSchedule', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				DATA_SCHEDULE = data;
				customFunc();

			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
			});

	}




}


function saveData_GT() {
	for (let i = 0; i < DATA_GROUP_TEACH.length; i++) {
		DATA_GROUP_TEACH[i].next_node = `gt${i + 1}`;
		localStorage.setItem(`gt${i}`, JSON.stringify(DATA_GROUP_TEACH[i]));
	}
	DATA_GROUP_TEACH[DATA_GROUP_TEACH.length - 1].next_node = null;
	localStorage.setItem(`gt${DATA_GROUP_TEACH.length - 1}`, JSON.stringify(DATA_GROUP_TEACH[DATA_GROUP_TEACH.length - 1]));
	
	localStorage.setItem('gt_m', JSON.stringify({
		date: formatDate()

	}));
}



// time of relevance TOR
function loadData_GT() {

	if (JSON.parse(localStorage.getItem('gt0')) != null) { // && dateDifference(JSON.parse(localStorage.getItem('gt_tor')).date, formatDate()) < 10
		let n_Node = 'gt0';
		while (n_Node != null) {
			DATA_GROUP_TEACH.push(JSON.parse(localStorage.getItem(n_Node)));
			n_Node = DATA_GROUP_TEACH[DATA_GROUP_TEACH.length - 1].next_node;
		}
	} else {
		getTAndG(saveData_GT);
		
	}
}


function formatDate(changeDay = 0, changeMonth = 0, changeYear = 0) {
	const date = new Date();

	date.setDate(date.getDate() + changeDay);
	date.setMonth(date.getMonth() + changeMonth);
	date.setFullYear(date.getFullYear() + changeYear);

	const formattedDay = String(date.getDate()).padStart(2, '0');
	const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
	const formattedYear = date.getFullYear();

	return `${formattedDay}.${formattedMonth}.${formattedYear}`;
}


function dateDifference(dateStr1, dateStr2) {
	function parseDate(dateStr) {
		const [day, month, year] = dateStr.split('.').map(Number);
		return new Date(year, month - 1, day);
	}

	const date1 = parseDate(dateStr1);
	const date2 = parseDate(dateStr2);
	const differenceInTime = Math.abs(date2 - date1);

	return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
}


function getDateHumanType(dateString) {
	const date = new Date(dateString);
	const months = ["янв.", "фев.", "мар.", "апр.", "май", "июн.", "июл.", "авг.", "сен.", "окт.", "ноя.", "дек."];
	const day = date.getDate();
	const month = months[date.getMonth()];
	const weekdays = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
	const weekday = weekdays[date.getDay()];
	return [`${day} ${month}`, weekday];
}


function calcMatchWord(str, substring) {
	const lowerStr = str.toLowerCase();
	const lowerSubstring = substring.toLowerCase();

	for (let i = 1; i <= lowerSubstring.length; i++) {
		if (!lowerStr.includes(lowerSubstring.slice(0, i))) {
			return (i - 1) * 100 / lowerSubstring.length// * (lowerSubstring.length / lowerStr.length);
		}
	}

	return 100// * (lowerSubstring.length / lowerStr.length);
}


function max(arr) {
	if (arr.length === 0) {
		return undefined;
	}

	let maxElement = arr[0];

	for (let i = 1; i < arr.length; i++) {
		if (arr[i] > maxElement) {
			maxElement = arr[i];
		}
	}

	return maxElement;
}


function scoreMatch(str, substring) {
	let arr_words_str = str.split(' ');
	let arr_words_sub = substring.trim().split(' ');
	let all_match = [];

	arr_words_str.forEach(w => {
		arr_words_sub.forEach(w_sub => {
			all_match.push(calcMatchWord(w, w_sub));
		});
	});
	// all_match /= arr_words_str.length;
	return max(all_match);
}



function checkTheme() {
	const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
	if (isDarkMode) {
		console.log('Пользователь использует темную тему.');
	} else {
		console.log('Пользователь использует светлую тему.');
	}
}


// Примеры использования функции
// console.log(formatDate()); // Текущая дата
// console.log(formatDate(-1)); // Уменьшаем на 1 день
// console.log(formatDate(0, 0, 1)); // Увеличиваем на 1 год
// console.log(formatDate(0, 1)); // Увеличиваем на 1 месяц

//const user = { name: 'John', age: 30 };
//localStorage.setItem('user', JSON.stringify(user));

//const retrievedUser = JSON.parse(localStorage.getItem('user'));
//console.log(retrievedUser.name); // 'John'
