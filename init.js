function startup() {
	loadData_GT();
}

function fast_start() {
	let vals = JSON.parse(localStorage.getItem('fast_start'));
	if (vals == null) return
	document.getElementById('in0').value = vals.in0;
	getSchedule(vals.oid, vals.type, formatDate(), formatDate(60), render_blocks_n);
}


document.addEventListener('DOMContentLoaded', () => {
	startup();
	fast_start();
	const in0 = document.getElementById('in0');
	in0.addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
			input_processing(in0.value, true);
			in0.blur(); // Вызываем событие onblur
			shrinkDiv();
		}
	});
	in0.addEventListener('input', function () {
		// console.log(`Вы ввели: ${input.value}`);
		input_processing(in0.value);
	});
})
