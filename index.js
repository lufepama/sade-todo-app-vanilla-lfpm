const itemInput = document.querySelector('.item-input');
const addItemBtn = document.querySelector('.input-btn');
const itemList = document.querySelector('.item-list');

const openModalBtn = document.querySelector('.open-modal-btn')
const modalCancelBtn = document.querySelector('.cancel-btn')

const myModalContainer = document.querySelector('.my-modal-visible')


// Add item functionality
addItemBtn.addEventListener('click', () => {
    if (itemInput?.value === '') {
        alert('Ingresa una tarea!');
        return;
    }

    const task = document.createElement('li');
    task.classList.add('item-text-no-selected');
    task.innerHTML = itemInput.value;

    itemList.appendChild(task);

    itemInput.value = '';
});

//Open modal to add item
openModalBtn.addEventListener('click', () => {
    openModalBtn.setAttribute('disabled', 'disabled')
    openModalBtn.setAttribute('disabled', 'disabled')
    myModalContainer.classList.remove('no-display')
})

//Manges close modal
modalCancelBtn.addEventListener('click', () => {
    openModalBtn?.removeAttribute('disabled')
    myModalContainer.classList.add('no-display')

})