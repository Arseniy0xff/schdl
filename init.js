function startup() {
	loadData_GT();
}



document.addEventListener('DOMContentLoaded', () => {
	startup();
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
