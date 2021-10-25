const getElement = (selection) => {
    const element = document.querySelector(selection)
    if (element) return element
    throw new Error(`Please check "${selection}" selector, no such element exist`)
}
const getStorageItem = (item) => {
    let storageItem = localStorage.getItem(item)
    if (storageItem) {
        storageItem = JSON.parse(localStorage.getItem(item))
    } else {
        storageItem = []
    }
    return storageItem
}

const setStorageItem = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item))
}


const counter = (item) => {
    let counterValueRef = document.querySelector('.counter-amount');
    let addCounter = document.querySelector('.counter-increase');
    let removeCounter = document.querySelector('.counter-decrease');
    if (item.quantity == 0) {
        counterValueRef.textContent = 0;
        addCounter.classList.add('hidden');
        removeCounter.classList.add('hidden')
        return
    }
    let counterValue = 1;
    function onIncrementClick() {
        if (counterValueRef.textContent < item.quantity && item.quantity > 0) {
            counterValueRef.textContent = counterValue += 1;
            if (counterValueRef.textContent == item.quantity) {
                addCounter.classList.add("unavailable-btn")
            }
        }
    }
    function onDecrementClick() {
        if (counterValueRef.textContent > 1 && item.quantity > 0) {
            counterValueRef.textContent = counterValue -= 1;
            if (addCounter.classList.contains("unavailable-btn")) {
                addCounter.classList.remove("unavailable-btn")
            }
        } else if (counterValueRef.textContent === 1 && item.quantity > 0) {
            counterValueRef.textContent = 1
        }

    }


    addCounter.addEventListener('click', onIncrementClick);
    removeCounter.addEventListener('click', onDecrementClick);
};

function generateStars(obj, wrapper) {

    obj.forEach((e, i) => {

        const starSign = '<i width="24" height="24" class="fas fa-star"></i>'
        if (e.star == "1") {
            wrapper[i].innerHTML = starSign;
        } else if (e.star == "2") {
            wrapper[i].innerHTML = starSign + starSign;
        } else if (e.star == "3") {
            wrapper[i].innerHTML = starSign + starSign + starSign;
        } else if (e.star == "4") {
            wrapper[i].innerHTML = starSign + starSign + starSign + starSign;
        } else if (e.star == "5") {
            wrapper[i].innerHTML = starSign + starSign + starSign + starSign + starSign;
        }

    })
}

export {
    getElement, getStorageItem, setStorageItem, counter, generateStars
}