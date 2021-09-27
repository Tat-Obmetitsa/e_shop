
import flatpickr from "flatpickr";

$(document).ready(function () {
    $('#contact').mask('+38(000) 000 0000');
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
    });
});


(() => {
    const monthList = document.getElementById('month');
    const yearList = document.getElementById('year');

    let today = new Date();
    let year = today.getFullYear();
    let yearArr = []
    const monthsArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    yearArr.push(year - 4, year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3, year + 4)

    for (let i = 0; i < monthsArr.length; i++) {
        const el = document.createElement('option')
        el.textContent += monthsArr[i];
        el.setAttribute('value', monthsArr[i])
        monthList.appendChild(el)
    }
    for (let i = 0; i < 9; i++) {
        const el = document.createElement('option')
        let shortYear = yearArr[i].toString().slice(2)
        el.textContent += Number(shortYear)
        el.setAttribute('value', shortYear)
        yearList.appendChild(el)
    }
})();


// add value to card

const nameInput = document.getElementById('card-name')
const nameCard = document.querySelector('.name-surname')
nameInput.oninput = function () {
    nameCard.textContent = nameInput.value.toLocaleUpperCase();
};

const numInput = document.getElementById('card-number')
const numCard = document.querySelector('.card-number')
numInput.oninput = function () {
    $(numInput).mask("0000 0000 0000 0000");
    numCard.textContent = numInput.value;
};

const monthSelect = document.getElementById('month')
const monthCard = document.querySelector('.expiration-month')
monthSelect.onchange = function () {
    monthCard.textContent = monthSelect.value
};

const yearSelect = document.getElementById('year')
const yearCard = document.querySelector('.expiration-year')
yearSelect.onchange = function () {
    yearCard.textContent = yearSelect.value
};

const cvvInput = document.getElementById('cvv')
const cvvCard = document.querySelector('.cvv-card')
cvvInput.oninput = function () {
    cvvCard.textContent = cvvInput.value.toLocaleUpperCase();
};



// validation 
const regName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/
const regPhoneNum = /^\+[0-9]{2}\([0-9]{3}\)\s\d{3}\s\d{4}/;
const regCardNum = /[\d][0-9]{15}/g
const regCvv = /[\d][0-9]{2}/g
const regMonthYear = /[\d][0-9]{1}/g
const regZip = /[0-9]{5}/g
const regCity = /^[a-zA-Z]+([ ]?[a-zA-Z])+[,]{1,}[ ]?[a-zA-Z]+([ ]?[a-zA-Z])*$/g

let info = {}
let buyer = {

    name: '',
    address: '',
    contact: '',
    city: '',
    zip: '',
    delivery: '',
    agreement: ''

}
let payment = {
    method: '',
    card_name: '',
    card_number: '',
    month: '',
    year: '',
    cvv: ''

}
const checkBtn = document.querySelector('.form__field-btn')
const fullName = document.querySelector('.name')
const address = document.getElementById('address')
const contact = document.getElementById('contact')
const city = document.getElementById('city')
const state = document.getElementById('state-choice')
const stateOption = document.querySelectorAll('.state-option')
let zip = document.getElementById('code')
const checkbox = document.getElementById('agreement')
const radio = document.querySelectorAll('.radio_btn')
const datepick = document.getElementById('req_date')


const updateValue = e => e.target.setAttribute('checked', 'checked');
radio.forEach(el => {
    el.setAttribute('checked', 'unchecked')
    el.addEventListener('click', e => updateValue(e))
});


const error = ["Please, fill in form: "]
checkBtn.addEventListener('click', () => {
    if (fullName.value !== '' && fullName.value.match(regName)) {
        buyer.name = fullName.value
    } else { error.push('Full Name'); }
    if (address.value !== '') {
        buyer.address = address.value
    } else { error.push('Address') }
    if (contact.value !== '' && contact.value.match(regPhoneNum)) {
        buyer.contact = contact.value
    } else { error.push('Phone Number') }
    if (city.value !== '' && city.value.match(regName)) {
        buyer.city = city.value
    } else { error.push('City') }
    if (zip.value !== '' && zip.value.match(regZip)) {
        buyer.zip = zip.value
    } else { error.push('Zip Code') }
    if (datepick.value !== '') {
        buyer.delivery = datepick.value
    } else { error.push('choose delivery date') }

    // stateOption.forEach((el) => {
    //     if (state.value === el) {
    //         buyer.state = state.value
    //     } else { console.log('error') }
    //     console.log(state.value)
    // })

    // payment


    if (nameInput.value !== '' && nameInput.value.match(regName)) {
        payment.card_name = nameInput.value
    } else { error.push('Card Name') }

    if (numInput.value !== '' && numInput.value.match(regCardNum)) {
        payment.card_number = numInput.value
    } else { error.push('Card Number') }

    if (cvvInput.value !== '' && cvvInput.value.match(regCvv)) {
        payment.cvv = cvvInput.value
    } else { error.push('CVV') }


    if (monthSelect.value !== '' && monthSelect.value.match(regMonthYear)) {
        payment.month = monthSelect.value
    } else { error.push('Month') }

    if (yearSelect.value !== '' && yearSelect.value.match(regMonthYear)) {
        payment.year = yearSelect.value
    } else { error.push('Year') }

    for (let i = 0; i < radio.length; i++) {
        if (radio[i].type == "radio" && radio[i].checked) {
            payment.method = radio[i].value;
        } else { error.push('choose payment method') }
    }

    if (checkbox.checked) {
        buyer.agreement = true
    } else { error.push('check the agreement') }

    if (error.length > 1) {
        alert(error.join(', '))
    }
    info = Object.assign({ buyer }, { payment })
    console.log(info)

})
