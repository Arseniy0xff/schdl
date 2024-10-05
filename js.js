function expandDiv() {
    const div = document.getElementById('s-div');
    div.classList.add('exp-0');
	const div_o = document.getElementById('search-section');
    div_o.classList.add('vis');
	const div_i = document.getElementById('info-list');
    div_i.classList.add('blur');
    // Если хотите добавлять подсказки через скрипт:
    // const suggestions = document.createElement('div');
    // suggestions.classList.add('suggestions');
    // suggestions.innerHTML = '<p>Подсказка 1</p><p>Подсказка 2</p>';
    // div.appendChild(suggestions);
}

function shrinkDiv() {
    const div = document.getElementById('s-div');
    div.classList.remove('exp-0');
	const div_o = document.getElementById('search-section');
    div_o.classList.remove('vis');
	const div_i = document.getElementById('info-list');
    div_i.classList.remove('blur');
    // Удаляем блок с подсказками
    // const suggestions = document.querySelector('.suggestions');
    // if (suggestions) {
    //     div.removeChild(suggestions);
    // }
}
