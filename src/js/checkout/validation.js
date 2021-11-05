import '../../scss/main.scss'
import './maps';
import './validation'
import flatpickr from "flatpickr";
import utils from '../utils';
import data from './checkout'
import refs from './refs';
let formData = new FormData(form);
let object = {
    "name": "",
    "address": "",
    "contact": "",
    "city": "",
    "state": "",
    "zip": "",
    "delivery_date": "",
    "checkbox": "",
    "radio": "",
    "nameSurname": "",
    "cardNumber": "",
    "cvv": "",
    "expirationMonth": "",
    "expirationYear": ""
};

// validation  

refs.form.addEventListener('input', (e) => {
    let el = e.target;
    let elValue = e.target.value;
    elValue.trim();
    // buyer
    if (el.classList.contains("name")) {
        elValue.replace(/[0-9]/g, '');

        refs.regName.test(elValue) ? (el.setCustomValidity(''), formData.append('name', elValue)) : el.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");

    } else if (el.classList.contains("address")) {
        elValue.value !== '' && refs.regName.test(elValue) ? (el.setCustomValidity(''), formData.append('address', elValue)) : el.setCustomValidity("Fill in the information");

    } else if (el.classList.contains("city")) {
        elValue.replace(/[0-9]/g, '');
        elValue.value !== '' && refs.regName.test(elValue) ? (el.setCustomValidity(''), formData.append('city', elValue)) : el.setCustomValidity("Can contain only letters, - ' ");

    } else if (el.classList.contains("contact")) {
        if (refs.contact.value !== '' && refs.regPhone.test(refs.contact.value)) {
            el.setCustomValidity('');
            formData.append('contact', elValue);
        } else if (refs.contact.value.length > 17) {
            elValue = elValue.slice(0, 17);
        } else if (refs.contact.value.length < 17) {
            el.setCustomValidity("Number is too short");
        }

    } else if (el.classList.contains("code")) {
        if (elValue !== '' && refs.regZip.test(elValue)) {
            el.setCustomValidity('');
            formData.append('zip', elValue);
        } else if (elValue.length > 5) {
            elValue = elValue.slice(0, 5);
        }
        else if (!refs.regZip.test(elValue)) {
            el.setCustomValidity("Must contain 5 digits");
        }

    } else if (el.classList.contains("datepick")) {
        formData.append('delivery_date', elValue);

        // payment
    } else if (el.classList.contains("card-name")) {
        elValue.replace(/[0-9]/g, '');
        elValue !== '' && refs.regName.test(elValue) ? (el.setCustomValidity(''), formData.append('nameSurname', elValue)) : el.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");

    } else if (el.classList.contains("card-number")) {
        if (elValue !== '' && refs.regCard.test(elValue)) {
            refs.numInput.setCustomValidity('');
            formData.append('cardNumber', elValue);
        } else if (elValue.length > 19) {
            elValue = elValue.slice(0, 19);
        }

    } else if (el.classList.contains("cvv")) {
        if (elValue !== '' && refs.regCvv.test(elValue)) {
            el.setCustomValidity('');
            formData.append('cvv', elValue);
        } else if (elValue.length > 3) {
            elValue = elValue.slice(0, 3);
        }
        else if (!refs.regCvv.test(elValue)) {
            el.setCustomValidity("Must contain only 3 digits");
        }

    } else if (el.classList.contains("month")) {
        elValue !== '' && refs.regMonthYear.test(elValue) ? (el.setCustomValidity(''), formData.append('expirationMonth', elValue)) : el.setCustomValidity("Select expiration month");

    } else if (el.classList.contains("year")) {
        elValue !== '' && refs.regMonthYear.test(elValue) ? (el.setCustomValidity(''), formData.append('expirationYear', elValue)) : el.setCustomValidity("Select expiration year");

    } else if (el.classList.contains("flat")) {
        if (elValue !== '') {
            el.setCustomValidity('');
            formData.append('flat', elValue);
        }
    };


    refs.radio.forEach(el => {
        if (el.checked) {
            formData.append('radio', el.value);
        }
    });

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
    // changes total in order section according to payment method


    for (let i = 0; i < refs.paymentRadio.length; i++) {

        if (refs.paymentRadio[i].checked) {
            refs.paymentWrap[i].classList.remove('v-hidden')
        } else if (!refs.paymentRadio[i].checked) {
            refs.paymentWrap[i].classList.add('v-hidden')
        }
        data.getData()
    }
    // check if input === option in datalist
    for (const opt of refs.stateOptions) {
        if (refs.state.value === opt.value) {
            refs.state.setCustomValidity("");
            formData.append('state', refs.state.value);
            break;
        } else {
            refs.state.setCustomValidity("Choose your city from the list below");
        }
    }
    refs.checkbox.checked ? formData.append('checkbox', true) : formData.append('checkbox', false)
})


formData.forEach(function (value, key) {
    object[key] = value;
});


// add mask on inputs

$(document).ready(function () {
    $('#contact').mask('+380 00 000 0000');
    $('#code').mask('00000');
    $("#card-number").mask("0000 0000 0000 0000");
    $("#cvv").mask('000')

    $(".cvv").focus(function () {
        $(".card").addClass('flipped')
    });
    $(".cvv").blur(function () {
        $(".card").removeClass(('flipped'))
    });

    $("#req_date").flatpickr({
        altInput: true,
        enableTime: true,
        altFormat: "d.m.Y / H:i",
        dateFormat: "d-m-Y H:i",
        disableMobile: true,
        minDate: "today",
        maxDate: new Date().fp_incr(14),
        minTime: "09:00",
        maxTime: "20:30",
        allowInput: true,
    });
});

export default object