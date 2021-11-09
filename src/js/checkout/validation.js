import '../../scss/main.scss'
import './maps';
import './validation'
import flatpickr from "flatpickr";
import utils from '../utils';
import data from './checkout'
import refs from './refs';
let object = {
    "name": "",
    "contact": "",
    "agreement": "",
    "address": "",
    "payment": ""
};
const paymentOnline = {
    cardName: "",
    cardNumber: "",
    cvv: ""
}
let date, zip
// validation  
refs.form.addEventListener('input', (e) => {


    let el = e.target;
    let elValue = e.target.value;
    elValue.trim();
    // buyer: full name, contact, agreement
    if (el.classList.contains("name")) {
        elValue.replace(/[0-9]/g, '');

        refs.regName.test(elValue) ? (el.setCustomValidity(''), object.name = elValue) : el.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");

    } else if (el.classList.contains("contact")) {
        if (refs.contact.value !== '' && refs.regPhone.test(refs.contact.value)) {
            el.setCustomValidity('');
            object.contact = elValue;
        } else if (refs.contact.value.length > 17) {
            elValue = elValue.slice(0, 17);
        } else if (refs.contact.value.length < 17) {
            el.setCustomValidity("Number is too short");
        }

    }
    refs.checkbox.checked ? object.agreement = true : object.agreement = false;


    // delivery
    refs.deliveryRadio.forEach(e => {
        e.addEventListener('change', () => {
            document.getElementsByName("address").forEach(e => {
                e.value = '';
                e.required = false
            })
            validateDelivery(el);

        })
    })

    // changes shipping and total in order section according to delivery method
    for (let i = 0; i < refs.deliveryRadio.length; i++) {
        if (refs.deliveryRadio[i].checked) {
            refs.deliveryDetails[i].classList.remove('v-hidden')
            refs.itemsShipping.textContent = refs.deliveryPrice[i].textContent
            data.getData()
        } else if (!refs.deliveryRadio[i].checked) {
            refs.deliveryDetails[i].classList.add('v-hidden')
        }

    }

    // payment 

    if (el.classList.contains("card-name")) {
        el.value.replace(/[0-9]/g, '');
        el.value !== '' && refs.regName.test(elValue) ? (el.setCustomValidity(''), paymentOnline.cardName = elValue) : el.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");

    }
    if (el.classList.contains("card-number")) {
        if (el.value !== '' && el.value.length == 19) {
            el.setCustomValidity('');
            paymentOnline.cardNumber = el.value;
        } else if (el.value.length > 19) {
            el.value = el.value.slice(0, 19);
        } else if (el.value.length < 19) {
            el.setCustomValidity('Enter full card number');
        }
    }
    if (el.classList.contains("cvv")) {
        el.value.replace(/[a-zA-Zа-яА-Я]/g, '');
        if (el.value !== '' && refs.regCvv.test(el.value)) {
            el.setCustomValidity('');
            paymentOnline.cvv = el.value;
        } else if (el.value.length > 3) {
            el.value = el.value.slice(0, 3);
        }
        else if (!refs.regCvv.test(el.value) || el.value.length < 3 || el.value > 3) {
            el.setCustomValidity("Must contain only 3 digits");
        }
    }


    refs.radio.forEach(el => {
        if (el.checked) {
            paymentOnline.payBy = el.value;
        }
    });
    const monthSelect = document.querySelector(".month")
    const yearSelect = document.querySelector(".year")

    monthSelect.value !== '' && refs.regMonthYear.test(monthSelect.value) ? (monthSelect.setCustomValidity(''), paymentOnline.expirationMonth = monthSelect.value) : monthSelect.setCustomValidity("Select expiration month");


    yearSelect.value !== '' && refs.regMonthYear.test(yearSelect.value) ? (yearSelect.setCustomValidity(''), paymentOnline.expirationYear = yearSelect.value) : yearSelect.setCustomValidity("Select expiration year");


    refs.paymentRadio.forEach(e => {
        e.addEventListener('change', () => {
            validatePayment()

        })
    })
    for (let i = 0; i < refs.paymentRadio.length; i++) {

        if (refs.paymentRadio[i].checked) {
            refs.paymentWrap[i].classList.remove('v-hidden')
        } else if (!refs.paymentRadio[i].checked) {
            refs.paymentWrap[i].classList.add('v-hidden')
        }
        data.getData()
    }


    // changes total in order section according to payment method

    if (document.querySelector(".datepick").value !== '' || document.querySelector(".code").value !== '') {
        object.delivery_date = document.querySelector(".datepick").value;
        object.zip = document.querySelector(".code").value
    }

    paymentOnline.paymentMethod = 'Online';
    object.payment = paymentOnline;
})


function validateDelivery(el) {
    el.required = false
    if (refs.deliveryRadio[0].checked) {     // validates pick-up delivery
        el = document.querySelector(".store-address")
        el.required = true;
        object.deliveryMethod = 'Pick from Store';
        if (el.value === '' || (el.value !== "Akademika Hlushkova Ave, 31А, Kyiv" && el.value !== "вул. Оптимістична, 1, Hatne" && el.value !== "Kyivska St, 166, Obukhiv")) {
            el.setCustomValidity("Choose the store from the list")
        } else if ((el.value === "Akademika Hlushkova Ave, 31А, Kyiv" || el.value === "вул. Оптимістична, 1, Hatne" || el.value === "Kyivska St, 166, Obukhiv")) {
            el.setCustomValidity('');
            el.setAttribute("readonly", true);
        }
    } else {
        document.querySelector(".store-address").required = false;
    }
    if (refs.deliveryRadio[1].checked) {      // validates Post delivery 
        object.deliveryMethod = 'Pick from Post Office';
        const cityInput = document.querySelector(".city")
        cityInput.required = true;
        if (el.classList.contains("city")) {
            el.value !== '' && refs.regCity.test(el.value) ? el.setCustomValidity('') : el.setCustomValidity("Can contain only letters, - ' in Russian or Ukrainian.Choose address from the list ");
        }


    } else {
        document.querySelector(".city").required = false;
    }
    if (refs.deliveryRadio[2].checked) {     // validates courier delivery
        object.deliveryMethod = 'Courier Delivery';
        document.querySelector(".autocomplete-address").required = true;

        if (el.classList.contains("autocomplete-address")) {
            el.value !== '' ? (el.setCustomValidity(''), object.address = `${document.querySelector(".flat.form-control").value === '' ? el.value : el.value + ", " + document.querySelector(".flat.form-control").value}`,
                zip = document.querySelector(".code").value)
                : el.setCustomValidity("Fill in the address, choose from the list");
        }

        const datepick = document.querySelectorAll(".datepick");
        datepick.forEach(e => {
            e.required = true;
        })

    } else {
        const datepick = document.querySelectorAll(".datepick");
        document.querySelector(".autocomplete-address").required = false;
        datepick.forEach(e => {
            e.required = false;
        })
    }

}

function validatePayment() {
    let cardName = document.querySelector(".card-name");

    let cardCvv = document.querySelector(".cvv")
    let cardNum = document.querySelector(".card-number")
    if (refs.paymentRadio[1].checked) { // validation of online payment
        object.payment = ''
        cardName.required = true
        cardNum.required = true
        cardCvv.required = true
        object.payment = paymentOnline;
    }
    if (refs.paymentRadio[0].checked) {
        cardName.required = false
        cardNum.required = false
        cardCvv.required = false
        object.payment = ''
    }
}
// add mask on inputs

export default object