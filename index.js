const itemInput = document.querySelector('.itemInput');
const addItemBtn = document.querySelector('.addItemBtn');
const itemList = document.querySelector('.itemList');


// Agregar tarea
addItemBtn.addEventListener('click', function () {
    if (itemInput.value === '') {
        alert('Ingresa una tarea!');
        return;
    }

    const task = document.createElement('li');
    task.classList.add('item');
    task.innerHTML = itemInput.value;

    itemList.appendChild(task);

    itemInput.value = '';
});