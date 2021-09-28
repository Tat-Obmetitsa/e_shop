import '../scss/main.scss'
import flatpickr from "flatpickr";

// add mask
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


// year and month select, short forms
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
const regName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const regCvv = /^[0-9]{3}$/;
const regMonthYear = /[\d][0-9]{1}/;
const regZip = /^[0-9]{5}$/;
const regCity = /^[a-zA-Z\s]+/;
const regCard = /^(?:\d[\s]*?){16,19}$/;

const checkBtn = document.querySelector('.form__field-btn')
const fullName = document.querySelector('.name')
const address = document.getElementById('address')
const contact = document.getElementById('contact')
const city = document.getElementById('city')
const zip = document.getElementById('code')
const checkbox = document.getElementById('agreement')
const radio = document.querySelectorAll('.radio_btn')
const datepick = document.getElementById('req_date')


const updateValue = e => e.target.setAttribute('checked', 'checked');
radio.forEach(el => {
    el.setAttribute('checked', 'unchecked')
    el.addEventListener('click', e => updateValue(e))
});

function showError(el) {
    if (el.validity.valueMissing) {
        el.setCustomValidity('You need to fill in the field');
    } else if (el.validity.tooShort) {
        el.setCustomValidity(`The field should contain at least ${el.minLength} characters(or words); you've entered ${el.value.length}.`);
    } else if (el.validity.tooLong) {
        el.setCustomValidity(`The field should not contain more than ${el.minLength} characters(or words); you've entered ${el.value.length}.`);
    }
}


fullName.addEventListener("input", function () {
    if (fullName.value !== '' && fullName.validity.valid) {
        fullName.setCustomValidity('');
    } else if (!regName.test(fullName.value)) {
        fullName.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");
        showError(fullName);
    }
}
)
address.addEventListener("input", function () {
    if (address.value !== '' && address.validity.valid) {
        address.setCustomValidity('');
    } else {
        showError(address);
    }
}
)
contact.addEventListener("input", function () {
    if (contact.value !== '' && contact.validity.valid) {
        contact.setCustomValidity('');
    } else {
        showError(contact);
    }
}
)
city.addEventListener("input", function () {
    console.log(regCity.test(city.value))
    if (city.value !== '' && city.validity.valid) {
        city.setCustomValidity('');
    } else if (!regCity.test(city.value)) {
        city.setCustomValidity("Can contain only letters, - ' ");
    } else {
        showError(city);
    }
}
)

zip.addEventListener("input", function () {
    if (zip.value !== '' && zip.validity.valid) {
        zip.setCustomValidity('');
    } else if (!regZip.test(zip.value)) {
        zip.setCustomValidity("Must contain 5 digits");
    } else {
        showError(zip);
    }
}
)

datepick.addEventListener("input", function () {
    if (datepick.value !== '' && datepick.validity.valid) {
        datepick.setCustomValidity('');
    } else {
        showError(datepick);
    }
}
)

nameInput.addEventListener("input", function () {
    if (nameInput.value !== '' && nameInput.validity.valid) {
        nameInput.setCustomValidity('');
    } else {
        showError(nameInput);
    }
}
)

numInput.addEventListener("input", function () {
    console.log(numInput.value)
    if (numInput.value !== '' && numInput.validity.valid) {
        numInput.setCustomValidity('');
    } else {
        showError(numInput);
    }
}
)
cvvInput.addEventListener("input", function () {
    if (cvvInput.value !== '' && cvvInput.validity.valid) {
        cvvInput.setCustomValidity('');
    } else if (!regCvv.test(cvvInput.value)) {
        cvvInput.setCustomValidity("Must contain 3 digits");
    } else {
        showError(cvvInput);
    }
}
)
yearSelect.addEventListener("input", function () {
    if (yearSelect.value !== '' && yearSelect.validity.valid) {
        yearSelect.setCustomValidity('');
    } else if (!regMonthYear.test(yearSelect.value)) {
        yearSelect.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");
    } else {
        showError(yearSelect);
    }
}
)
monthSelect.addEventListener("input", function () {
    if (monthSelect.value !== '' && monthSelect.validity.valid) {
        monthSelect.setCustomValidity('');
    } else if (!regMonthYear.test(monthSelect.value)) {
        monthSelect.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");
    } else {
        showError(monthSelect);
    }
}
)
checkBtn.addEventListener('click', () => {
    if (regName.test(fullName.value) && address.validity.valid && contact.validity.valid && regCity.test(city.value) && regZip.test(zip.value) && datepick.value !== '' && nameInput.validity.valid && numInput.validity.valid && regCvv.test(cvvInput.value) && regMonthYear.test(yearSelect.value) && regMonthYear.test(monthSelect.value) && checkbox.checked) {
        alert('Submit successful!')
    }
});
