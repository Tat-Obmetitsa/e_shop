import '../../scss/main.scss'
import './maps';
import object from './validation'
import flatpickr from "flatpickr";
import utils from '../utils';
import refs from './refs';
// let formData = new FormData(form);


// year and month select, short forms
(() => {
    utils.displayCartItemCount()
    let today = new Date();
    let year = today.getFullYear();
    let yearArr = []
    const monthsArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    yearArr.push(year - 4, year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3, year + 4)

    for (let i = 0; i < monthsArr.length; i++) {
        const el = document.createElement('option')
        el.textContent += monthsArr[i];
        el.setAttribute('value', monthsArr[i])
        refs.monthSelect.appendChild(el)
    }
    for (let i = 0; i < 9; i++) {
        const el = document.createElement('option')
        let shortYear = yearArr[i].toString().slice(2)
        el.textContent += Number(shortYear)
        el.setAttribute('value', shortYear)
        refs.yearSelect.appendChild(el)
    }
})();

// add value to card

refs.nameInput.oninput = function () {
    refs.nameCard.textContent = refs.nameInput.value.toLocaleUpperCase();
};

refs.numInput.oninput = function () {
    $('.card-number').mask("0000 0000 0000 0000");
    refs.numCard.textContent = refs.numInput.value;
};

refs.monthSelect.onchange = function () {
    refs.monthCard.textContent = refs.monthSelect.value
};

refs.yearSelect.onchange = function () {
    refs.yearCard.textContent = refs.yearSelect.value
};

refs.cvvInput.oninput = function () {
    if (refs.cvvInput.value.length > 3) {
        refs.cvvInput.value = refs.cvvInput.value.slice(0, 3)
    }
    refs.cvvCard.textContent = refs.cvvInput.value.toLocaleUpperCase();
};


function getData() {
    let payments = utils.getStorageItem("payments");
    refs.itemsPrice.textContent = `$${payments.totalItemsPrice}`
    refs.itemsDiscount.textContent = `${payments.discount ? payments.discount : 0}%`
    refs.itemsShipping.textContent = `$${payments.shipping}`
    refs.itemsServices.textContent = `$${payments.services}`
    refs.itemsTotalPrice.textContent = `$${payments.finalTotal}`
    console.log(payments.installmentsPrice)
    if (payments.installmentsPrice !== undefined) {
        refs.installmetPrice.innerHTML = `
        * ${payments.installmentsPrice.paymentsNumber} payments $${payments.installmentsPrice.paymentPrice} for ${payments.installmentsPrice.paymentsDuration} months via ${payments.installmentsPrice.bank} `

        refs.installmetPrice.classList.remove('hidden')
    }

}
getData()


// add info to notification card

function checkInputs() {


    const json = JSON.stringify(object);
    //  json with data for future submit 
    console.log(json)
    refs.detailsBuyer.innerHTML = `
        < li ><h3>Full Name:</h3><span>${object.name}</span></li >
    <li><h3>Address:</h3><span>${object.address}</span></li>
    <li><h3>Contact</h3><span>${object.contact}</span></li>
    <li><h3>City:</h3><span>${object.city}</span></li>
    <li><h3>State:</h3><span>${object.state}</span></li>
    <li><h3>Zip Code:</h3><span>${object.zip}</span></li>
    <li><h3>Delivery date</h3><span>${object.delivery_date}</span></li>
    `
    refs.detailsPayment.innerHTML = `
        < li ><h3>Payment Method:</h3><span>${object.radio}</span></li >
    <li><h3>Name on Card:</h3><span>${object.nameSurname}</span></li>
    <li><h3>Card Number:</h3><span>${object.cardNumber}</span></li>
    <li><h3>CVV Code:</h3><span>${object.cvv}</span></li>
    <li><h3>Expiration Month:</h3><span>${object.expirationMonth}</span></li>
    <li><h3>Expiration Year:</h3><span>${object.expirationYear}</span></li>
    `
    let finalObj = Object.values(object).every(e => e !== "" && e !== undefined)

    if (finalObj && refs.checkbox.checked) {
        refs.formOverlay.classList.add('show')
        refs.completeWrapper.classList.add('show')
        refs.form.classList.add('hide')
        refs.sectionTitle.classList.add('hidden')
        refs.spans.forEach(el => el.classList.add('active'))
    }


}


refs.checkBtn.addEventListener('click', () => {
    checkInputs();
})

// on close notification

refs.closeFormBtn.addEventListener('click', () => {
    refs.formOverlay.classList.remove('show');
    refs.form.action = "checkout.html"
});

