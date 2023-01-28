//Input and item selectors
const itemInput = document.querySelector('.item-input');
const addItemBtn = document.querySelector('.input-btn');
let itemList = document.querySelector('.item-list');
let elementsList = document.querySelectorAll('.item-list li')

//Main app selectors
const appMainContainer = document.querySelector('.app-main-container')

//Modal and basic operation selectors
const openModalBtn = document.querySelector('.open-modal-btn')
const deleteBtn = document.querySelector('.delete-btn')
const redoBtn = document.querySelector('.redo-btn')
const modalCancelBtn = document.querySelector('.cancel-btn')
const myModalContainer = document.querySelector('.my-modal-visible')


//Global variables
let temporalList = []
let temporalIdList = []
let trackEvents = {}

////////////////////////////////////////////////***EVENTS****/////////////////////////////////////////////////////////////


// Add item functionality
addItemBtn.addEventListener('click', () => {
    if (itemInput?.value === '') {
        alert('This field cannot be empty!');
        return;
    }
    //Create dom element
    const task = document.createElement('li');
    const idGenerated = generateRandomId()
    if (idGenerated) task.setAttribute('id', idGenerated)
    task.classList.add('item-text-no-selected');
    task.innerHTML = itemInput.value;

    //Append child and reconfigure attribs
    itemList.appendChild(task);
    itemInput.value = '';
    myModalContainer.classList.add('no-display')
    appMainContainer.classList.remove('on-brightness-class')
    openModalBtn.removeAttribute('disabled')
    deleteBtn.removeAttribute('disabled')
    redoBtn.removeAttribute('disabled')
    itemList = document.querySelector('.item-list')
    elementsList = document.querySelectorAll('.item-list li')

    //Keep track of changes
    const itemData = {
        title: itemInput.value,
        id: idGenerated,
    }
    const trackData = {
        operation: 'Add',
        data: new Array(itemData)
    }
    trackEvents = trackData

    //Regenerate click event in new items added in the list
    updateItemList()
    updateDeleteAction()
});

//Open modal to add item
openModalBtn.addEventListener('click', () => {
    //Activate filter
    appMainContainer.classList.add('on-brightness-class')

    //Update attbs
    myModalContainer.classList.remove('no-display')
    openModalBtn.setAttribute('disabled', 'disabled')
    deleteBtn.setAttribute('disabled', 'disabled')
    redoBtn.setAttribute('disabled', 'disabled')

})

//Manges close modal
modalCancelBtn.addEventListener('click', () => {

    //Deactivate filter
    appMainContainer.classList.remove('on-brightness-class')

    //Update attbs
    openModalBtn?.removeAttribute('disabled')
    deleteBtn?.removeAttribute('disabled')
    redoBtn?.removeAttribute('disabled')
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
        //Verify if item is in temporalList before add it into lists
        if (!temporalIdList.includes(id)) {
            temporalIdList.push(id)
            temporalList.push(itemData)
        }
    })
})

//Handle delete click action
deleteBtn.addEventListener('click', () => {
    elementsList.forEach((item) => {
        if (temporalIdList.includes(item.id)) {
            try {
                itemList.removeChild(item)
                updateItemList()
            } catch (error) {
                console.log('error',)
            }
        }
    })

    //Keep track of changes
    const trackData = {
        operation: 'Del',
        data: temporalList
    }
    trackEvents = trackData

})

//Handle redo action
redoBtn.addEventListener('click', () => {

    if (trackEvents.operation == 'Add') {
        elementsList.forEach(item => {
            if (item.id === trackEvents.data[0].id) {
                try {
                    itemList.removeChild(item)
                    itemList = document.querySelector('.item-list')
                    elementsList = document.querySelectorAll('.item-list li')
                    updateItemList()
                    updateDeleteAction()
                } catch (error) {
                    console.log('')
                }

            }
        })
        trackEvents = {}
        temporalIdList = []
        temporalList = []

    } else if (trackEvents.operation == 'Del') {
        trackEvents.data.map((item) => {
            const task = document.createElement('li');
            task.setAttribute('id', item.id)
            task.classList.add('item-text-no-selected');
            task.innerHTML = item.title;
            itemList?.appendChild(task)
            itemList = document.querySelector('.item-list')
            elementsList = document.querySelectorAll('.item-list li')
            updateItemList()
            updateDeleteAction()
        })
    }
    trackEvents = {}
    temporalIdList = []
    temporalList = []
})


////////////////////////////////////////////////***Methods****/////////////////////////////////////////////////////////////


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
            if (!temporalIdList.includes(id)) {
                temporalIdList.push(id)
                temporalList.push(itemData)
            }
        })
    })
}

//Allows maintain delete action even when list is updated
function updateDeleteAction() {
    deleteBtn.addEventListener('click', () => {
        elementsList.forEach((item) => {
            if (temporalIdList.includes(item.id)) {
                try {
                    itemList.removeChild(item)
                    updateItemList()
                } catch (error) {
                    console.log('error',)
                }
            }
        })
    })
}