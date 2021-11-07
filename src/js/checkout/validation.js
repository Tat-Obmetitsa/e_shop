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
        e.addEventListener('change', ev => {
            document.getElementsByName("address").forEach(e => {
                e.value = ''
            })
            // refs.deliveryRadio.forEach(e => e.classList.remove('active'))
            // ev.target.classList.add("active")
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

    if (refs.paymentRadio[1].checked) { // validation of online payment
        const paymentOnline = {}
        object.payment = ''
        document.querySelectorAll(".payment__wrap input").forEach(el => {
            let elValue = el.value
            el.required = true

            if (el.classList.contains("card-name")) {
                elValue.replace(/[0-9]/g, '');
                elValue !== '' && refs.regName.test(elValue) ? (el.setCustomValidity(''), paymentOnline.cardName = elValue) : el.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");

            } else if (el.classList.contains("card-number")) {
                if (elValue !== '' && refs.regCard.test(elValue)) {
                    refs.numInput.setCustomValidity('');
                    paymentOnline.cardNumber = elValue;
                } else if (elValue.length > 19) {
                    elValue = elValue.slice(0, 19);
                }

            } else if (el.classList.contains("cvv")) {
                if (elValue !== '' && refs.regCvv.test(elValue)) {
                    el.setCustomValidity('');
                    paymentOnline.cvv = elValue;
                } else if (elValue.length > 3) {
                    elValue = elValue.slice(0, 3);
                }
                else if (!refs.regCvv.test(elValue)) {
                    el.setCustomValidity("Must contain only 3 digits");
                }

            }


        }
        )
        refs.radio.forEach(el => {
            if (el.checked) {
                paymentOnline.payBy = el.value;
            }
        });
        const monthSelect = document.querySelector(".month")
        const yearSelect = document.querySelector(".year")

        monthSelect.required = true
        monthSelect.value !== '' && refs.regMonthYear.test(monthSelect.value) ? (monthSelect.setCustomValidity(''), paymentOnline.expirationMonth = monthSelect.value) : monthSelect.setCustomValidity("Select expiration month");

        yearSelect.required = true
        yearSelect.value !== '' && refs.regMonthYear.test(yearSelect.value) ? (yearSelect.setCustomValidity(''), paymentOnline.expirationYear = yearSelect.value) : yearSelect.setCustomValidity("Select expiration year");
        paymentOnline.paymentMethod = 'Online';
        object.payment = paymentOnline;
    } else if (refs.paymentRadio[0].checked) {
        object.payment = ''
        object.payment = { paymentMethod: 'On Delivery', postagePercent: "5%", postageFees: Number(document.querySelector(".postage__price").textContent) }
    }
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

})


function validateDelivery(el) {
    if (refs.deliveryRadio[0].checked) {     // validates pick-up delivery
        document.querySelector(".store-address").required = true;
        object.deliveryMethod = 'Pick from Store';
        if (el.classList.contains("store-address")) {
            el.value !== '' ? (el.setCustomValidity(''), object.address = el.value) : el.setCustomValidity("Choose the store");
        }

    } else {
        document.querySelector(".store-address").required = false;

    }
    if (refs.deliveryRadio[1].checked) {      // validates Post delivery 
        object.deliveryMethod = 'Pick from Post Office';
        const cityInput = document.querySelector(".city")
        const addressInput = document.querySelector(".office-address")
        cityInput.required = true;
        addressInput.required = true
        if (el.classList.contains("city")) {
            el.value !== '' && refs.regCity.test(el.value) ? el.setCustomValidity('') : el.setCustomValidity("Can contain only letters, - ' in Russian or Ukrainian.Choose address from the list ");
        }
        if (el.classList.contains("office-address")) {
            el.value !== '' ? (el.setCustomValidity(''), object.address = el.value, el.setAttribute('readonly', true)) : el.setCustomValidity("Choose the office from the list");
        }


    } else {
        document.querySelector(".city").required = false;
        document.querySelector(".office-address").required = false;
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