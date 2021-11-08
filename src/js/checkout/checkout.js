import '../../scss/main.scss'
import './maps';
import './np-map';
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


    refs.itemsServices.textContent = `$${payments.services}`
    refs.itemsTotalPrice.textContent = `$${payments.finalTotal}`
    refs.deliveryPrice[0].textContent = `$${Number(0).toFixed(2)}`;
    refs.deliveryPrice[1].textContent = `$${payments.shipping}`;
    refs.deliveryPrice[2].textContent = `$${(Number(payments.shipping) + 20).toFixed(2)} `;
    refs.itemsTotalPrice.textContent = `$${(Number(payments.finalTotal) - Number(payments.shipping) + Number(refs.itemsShipping.textContent.slice(1))).toFixed(2)}`

    refs.paymentPrice.textContent = `${((Number(refs.itemsTotalPrice.textContent.slice(1)) * 5) / 100).toFixed(2)}`;
    if (!refs.paymentRadio[0].checked) {
        refs.itemsTotalPrice.textContent = `$${(Number(payments.finalTotal) - Number(payments.shipping) + Number(refs.itemsShipping.textContent.slice(1))).toFixed(2)}`
    } else {
        refs.itemsTotalPrice.textContent = `${Number(refs.itemsTotalPrice.textContent.slice(1)) + Number(refs.paymentPrice.textContent)}`
    }


    if (payments.installmentsPrice !== undefined) {
        refs.installmetPrice.innerHTML = `
        * ${payments.installmentsPrice.paymentsNumber} payments $${payments.installmentsPrice.paymentPrice} for ${payments.installmentsPrice.paymentsDuration} months via ${payments.installmentsPrice.bank} `

        refs.installmetPrice.classList.remove('hidden')
    }

}
getData()

// add info to notification card

function checkInputs() {

    // add into to submit notification
    const notificationDOM = `
    <li><h3>Full Name:</h3><span>${object.name}</span></li >
    <li><h3>Contact</h3><span>${object.contact}</span></li>
    <li><h3>Delivery Method:</h3><span>${object.deliveryMethod}</span></li>
    <li><h3>Address:</h3><span>${object.address}</span></li>    `;

    if (object.deliveryMethod === 'Courier Delivery') {
        refs.detailsBuyer.innerHTML = notificationDOM + `<li><h3>Zip Code:</h3><span>${object.zip}</span></li>
        <li><h3>Delivery date</h3><span>${object.delivery_date}</span></li>`
    } else {
        refs.detailsBuyer.innerHTML = notificationDOM
    }

    if (object.payment.paymentMethod === 'Online') {
        refs.detailsPayment.innerHTML = `
        <li><h3>Payment Method:</h3><span>${object.payment.paymentMethod}</span></li >
        <li><h3>Pay by:</h3><span>${object.payment.payBy}</span></li>
         <li><h3>Name on Card:</h3><span>${object.payment.cardName}</span></li>
          <li><h3>Card Number:</h3><span>${object.payment.cardNumber}</span></li>
           <li><h3>CVV Code:</h3><span>${object.payment.cvv}</span></li>
         <li><h3>Expiration Month:</h3><span>${object.payment.expirationMonth}</span></li>
          <li><h3>Expiration Year:</h3><span>${object.payment.expirationYear}</span></li>`
    } else if (object.payment.paymentMethod === 'On Delivery') {
        refs.detailsPayment.innerHTML = `
            <li><h3>Payment Method:</h3><span>${object.payment.paymentMethod}</span></li >
            <li><h3>Postage Percent Method:</h3><span>5%</span></li >
            <li><h3>Postage fees:</h3><span>$${object.payment.postageFees}</span></li >
        `
    }
    let finalObj = Object.values(object).every(e => e !== "" && e !== undefined)
    let payments = utils.getStorageItem("payments");
    payments.shipping = document.querySelector(".items-shipping").textContent;
    payments.finalTotal = document.querySelector(".items-total-price").textContent;
    if (finalObj) {
        refs.formOverlay.classList.add('show')
        refs.completeWrapper.classList.add('show')
        refs.form.classList.add('hide')
        document.querySelector(".order").classList.add('v-hidden')
        document.querySelector(".cart-amount").textContent = 0;
        refs.sectionTitle.classList.add('hidden')
        refs.spans.forEach(el => el.classList.add('active'))

        let cart = utils.getStorageItem("cart");
        // make single json of the order
        let order = {}
        order.items = cart
        order.delivery = object
        order.payments = payments;
        localStorage.clear();
        utils.setStorageItem("order", JSON.stringify(order));
    };

}

refs.checkBtn.addEventListener('click', () => {
    document.getElementsByName("address").forEach(e => {
        if (e.value !== '') {
            object.address = e.value + " " + document.getElementById("flat").value;
        }
    })
    checkInputs();


})

// on close notification
refs.closeFormBtn.addEventListener('click', () => {
    refs.formOverlay.classList.remove('show');
    refs.form.action = "checkout.html"
});

export default { getData }