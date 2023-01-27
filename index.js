//Input instances
const itemInput = document.querySelector('.item-input');
const addItemBtn = document.querySelector('.input-btn');
const itemList = document.querySelector('.item-list');

//Main app instances
const appMainContainer = document.querySelector('.app-main-container')


//Modal instances
const openModalBtn = document.querySelector('.open-modal-btn')
const modalCancelBtn = document.querySelector('.cancel-btn')
const myModalContainer = document.querySelector('.my-modal-visible')


// Add item functionality
addItemBtn.addEventListener('click', () => {
    if (itemInput?.value === '') {
        alert('This field cannot be empty!');
        return;
    }
    const task = document.createElement('li');
    task.classList.add('item-text-no-selected');
    task.innerHTML = itemInput.value;

    itemList.appendChild(task);
    itemInput.value = '';
    myModalContainer.classList.add('no-display')
    appMainContainer.classList.remove('on-brightness-class')
    openModalBtn?.removeAttribute('disabled')

});

//Open modal to add item
openModalBtn.addEventListener('click', () => {
    //Activate filter
    appMainContainer.classList.add('on-brightness-class')

    myModalContainer.classList.remove('no-display')
    openModalBtn.setAttribute('disabled', 'disabled')

})

//Manges close modal
modalCancelBtn.addEventListener('click', () => {

    //Deactivate filter
    appMainContainer.classList.remove('on-brightness-class')

    openModalBtn?.removeAttribute('disabled')
    myModalContainer.classList.add('no-display')
})