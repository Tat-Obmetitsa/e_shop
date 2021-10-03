import '../scss/main.scss'
import flatpickr from "flatpickr";
import { getElement } from './utils.js';
import {
    checkBtn,
    contact,
    radio,
    state,
    form,
    nameInput,
    nameCard,
    numInput,
    numCard,
    monthSelect,
    monthCard,
    yearSelect,
    yearCard,
    cvvInput,
    cvvCard,
    stateOptions,
    regName,
    regCvv,
    regMonthYear,
    regZip,
    regCard,
    regPhone,
    checkbox,
    detailsBuyer,
    detailsPayment,
    formOverlay,
    closeFormBtn
} from './refs'

let buyer = {
    name: "",
    address: "",
    contact: "",
    city: "",
    state: "",
    zip: "",
    delivery_date: "",
    agreement: ''
};
let payment = {
    method: "",
    card_name: "",
    card_num: "",
    cvv: "",
    exp_month: "",
    exp_year: ""
};

// year and month select, short forms
(() => {
    let today = new Date();
    let year = today.getFullYear();
    let yearArr = []
    const monthsArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    yearArr.push(year - 4, year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3, year + 4)

    for (let i = 0; i < monthsArr.length; i++) {
        const el = document.createElement('option')
        el.textContent += monthsArr[i];
        el.setAttribute('value', monthsArr[i])
        monthSelect.appendChild(el)
    }
    for (let i = 0; i < 9; i++) {
        const el = document.createElement('option')
        let shortYear = yearArr[i].toString().slice(2)
        el.textContent += Number(shortYear)
        el.setAttribute('value', shortYear)
        yearSelect.appendChild(el)
    }
})();

// add value to card

nameInput.oninput = function () {
    nameCard.textContent = nameInput.value.toLocaleUpperCase();
};

numInput.oninput = function () {
    $(numInput).mask("0000 0000 0000 0000");
    numCard.textContent = numInput.value;
};

monthSelect.onchange = function () {
    monthCard.textContent = monthSelect.value
};

yearSelect.onchange = function () {
    yearCard.textContent = yearSelect.value
};

cvvInput.oninput = function () {
    if (cvvInput.value.length > 3) {
        cvvInput.value = cvvInput.value.slice(0, 3)
    }
    cvvCard.textContent = cvvInput.value.toLocaleUpperCase();
};


// validation  

form.addEventListener('input', (e) => {
    let el = e.target;
    let elValue = e.target.value;
    elValue.trim();

    // buyer
    if (el.classList.contains("name")) {
        elValue.replace(/[0-9]/g, '');

        regName.test(elValue) ? (el.setCustomValidity(''), buyer.name = elValue) : el.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");

    } else if (el.classList.contains("address")) {
        elValue.value !== '' && regName.test(elValue) ? (el.setCustomValidity(''), buyer.address = elValue) : el.setCustomValidity("Fill in the information");

    } else if (el.classList.contains("city")) {
        elValue.replace(/[0-9]/g, '');
        elValue.value !== '' && regName.test(elValue) ? (el.setCustomValidity(''), buyer.city = elValue) : el.setCustomValidity("Can contain only letters, - ' ");

    } else if (el.classList.contains("contact")) {
        if (contact.value !== '' && regPhone.test(contact.value)) {
            el.setCustomValidity('');
            buyer.contact = elValue;
        } else if (contact.value.length > 17) {
            elValue = elValue.slice(0, 17);
        } else if (contact.value.length < 17) {
            el.setCustomValidity("Number is too short");
        }

    } else if (el.classList.contains("code")) {
        if (elValue !== '' && regZip.test(elValue)) {
            el.setCustomValidity('');
            buyer.zip = elValue;
        } else if (elValue.length > 5) {
            elValue = elValue.slice(0, 5);
        }
        else if (!regZip.test(elValue)) {
            el.setCustomValidity("Must contain 5 digits");
        }

    } else if (el.classList.contains("datepick")) {
        buyer.delivery_date = elValue

        // payment
    } else if (el.classList.contains("card-name")) {
        elValue.replace(/[0-9]/g, '');
        elValue !== '' && regName.test(elValue) ? (el.setCustomValidity(''), payment.card_name = elValue) : el.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");

    } else if (el.classList.contains("card-number")) {
        if (elValue !== '' && regCard.test(elValue)) {
            numInput.setCustomValidity('');
            payment.card_num = elValue;
        } else if (elValue.length > 19) {
            elValue = elValue.slice(0, 19);
        }

    } else if (el.classList.contains("cvv")) {
        if (elValue !== '' && regCvv.test(elValue)) {
            el.setCustomValidity('');
            payment.cvv = elValue
        } else if (elValue.length > 3) {
            elValue = elValue.slice(0, 3);
        }
        else if (!regCvv.test(elValue)) {
            el.setCustomValidity("Must contain only 3 digits");
        }

    } else if (el.classList.contains("month")) {
        elValue !== '' && regMonthYear.test(elValue) ? (el.setCustomValidity(''), payment.exp_month = elValue) : el.setCustomValidity("Select expiration month");

    } else if (el.classList.contains("year")) {
        elValue !== '' && regMonthYear.test(elValue) ? (el.setCustomValidity(''), payment.exp_year = elValue) : el.setCustomValidity("Select expiration year");

    };

    radio.forEach(el => {
        if (el.checked) {
            payment.method = el.value
        }
    });

    // check if input === option in datalist
    for (const opt of stateOptions) {
        if (state.value === opt.value) {
            state.setCustomValidity("");
            buyer.state = state.value
            break;
        } else {
            state.setCustomValidity("Choose your city from the list below");
        }
    }

    checkbox.checked ? buyer.agreement = true : buyer.agreement = false

})

// add into to notification card

function checkInputs() {
    detailsBuyer.innerHTML = `
    <li><h3>Full Name:</h3><span>${buyer.name}</span></li>
    <li><h3>Address:</h3><span>${buyer.address}</span></li>
    <li><h3>Contact</h3><span>${buyer.contact}</span></li>
    <li><h3>City:</h3><span>${buyer.city}</span></li>
    <li><h3>State:</h3><span>${buyer.state}</span></li>
    <li><h3>Zip Code:</h3><span>${buyer.zip}</span></li>
    <li><h3>Delivery date</h3><span>${buyer.delivery_date}</span></li>
    `
    detailsPayment.innerHTML = `
    <li><h3>Payment Method:</h3><span>${payment.method}</span></li>
    <li><h3>Name on Card:</h3><span>${payment.card_name}</span></li>
    <li><h3>Card Number:</h3><span>${payment.card_num}</span></li>
    <li><h3>CVV Code:</h3><span>${payment.cvv}</span></li>
    <li><h3>Expiration Month:</h3><span>${payment.exp_month}</span></li>
    <li><h3>Expiration Year:</h3><span>${payment.exp_year}</span></li>
    `
    let b = Object.values(buyer).every(e => e !== '')
    let p = Object.values(payment).every(e => e !== '')
    if (b && p && checkbox.checked) {
        formOverlay.classList.add('show')
    }
    return false;
}


checkBtn.addEventListener('click', () => {
    checkInputs()
})

// on close notification

closeFormBtn.addEventListener('click', () => {
    formOverlay.classList.remove('show');
    form.action = "index.html"
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


