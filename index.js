//Input instances
const itemInput = document.querySelector('.item-input');
const addItemBtn = document.querySelector('.input-btn');
var itemList = document.querySelector('.item-list');
var elementsList = document.querySelectorAll('.item-list li')

//Main app instances
const appMainContainer = document.querySelector('.app-main-container')

//Modal and basic operation instances
const openModalBtn = document.querySelector('.open-modal-btn')
const deleteBtn = document.querySelector('.delete-btn')
const modalCancelBtn = document.querySelector('.cancel-btn')
const myModalContainer = document.querySelector('.my-modal-visible')


//Global variables
var temporalList = []
var temporalIdList = []
var trackEvents = []

// Add item functionality
addItemBtn.addEventListener('click', () => {
    if (itemInput?.value === '') {
        alert('This field cannot be empty!');
        return;
    }
    const task = document.createElement('li');
    const idGenerated = generateRandomId()
    if (idGenerated) task.setAttribute('id', idGenerated)
    task.classList.add('item-text-no-selected');
    task.innerHTML = itemInput.value;

    itemList.appendChild(task);
    itemInput.value = '';
    myModalContainer.classList.add('no-display')
    appMainContainer.classList.remove('on-brightness-class')
    openModalBtn?.removeAttribute('disabled')
    itemList = document.querySelector('.item-list')
    elementsList = document.querySelectorAll('.item-list li')

    //Regenerate click event in new items added in the list
    updateItemList()
    updateDeleteAction()
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

//Handle click action in items
elementsList.forEach((item) => {
    item.addEventListener('click', () => {
        item.classList.remove('item-text-no-selected')
        item.classList.add('item-text-selected')
        const title = item.innerHTML
        const id = item.id
        const itemData = { title, id }
        temporalList.push(itemData)
        temporalIdList.push(id)
    })
})

//Handle delete click action
deleteBtn.addEventListener('click', () => {
    console.log('list', temporalIdList)
    elementsList.forEach((item) => {
        if (temporalIdList.includes(item.id)) {
            try {
                itemList.removeChild(item)
                updateItemList()
            } catch (error) {
                console.log('error', error)
            }
        }
    })

})




//--->Methods<-----

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//Generate randomg stringid which is then used in 'li' items.
function generateRandomId(length = 10) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//Allows add click event in updated list
function updateItemList() {
    elementsList.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.remove('item-text-no-selected')
            item.classList.add('item-text-selected')
            const title = item.innerHTML
            const id = item.id
            const itemData = { title, id }
            temporalList.push(itemData)
            temporalIdList.push(id)
        })
    })
}

function updateDeleteAction() {
    deleteBtn.addEventListener('click', () => {
        elementsList.forEach((item) => {
            if (temporalIdList.includes(item.id)) {
                try {
                    itemList.removeChild(item)
                    updateItemList()
                } catch (error) {
                    console.log('error', error)
                }
            }
        })

    })
}