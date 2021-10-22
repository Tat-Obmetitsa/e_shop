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


const counter = () => {
    let counterValueRef = document.querySelector('.counter-amount');
    let addCounter = document.querySelector('.counter-increase');
    let removeCounter = document.querySelector('.counter-decrease');

    let counterValue = 1;
    function onIncrementClick() {
        counterValueRef.textContent = counterValue += 1;
    }
    function onDecrementClick() {
        if (counterValueRef.textContent > 1) {
            counterValueRef.textContent = counterValue -= 1;
        } else { counterValueRef.textContent = 1 }
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
// open  product page
function getItems(wrapper) {
    wrapper.forEach(item => {
        item.addEventListener('click', () => {
            let viewedArray = JSON.parse(localStorage.getItem('viewed')) || [];
            viewedArray.push(item.dataset.id)
            localStorage.setItem('viewed', JSON.stringify(viewedArray));
            window.location.href = `http://localhost:3000/productPage.html?=${item.dataset.id}`
        })
    })

}

export {
    getElement, getStorageItem, setStorageItem, counter, generateStars, getItems
}