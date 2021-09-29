import '../scss/main.scss'
import flatpickr from "flatpickr";

// add mask

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
    if (cvvInput.value.length > 3) {
        cvvInput.value = cvvInput.value.slice(0, 3)
    }
    cvvCard.textContent = cvvInput.value.toLocaleUpperCase();
};



// validation  
const regName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const regCvv = /^[0-9]{3}$/;
const regMonthYear = /[\d][0-9]{1}/;
const regZip = /^[0-9]{5}$/;
const regCity = /^[a-zA-Z\s]+/;
const regCard = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;
const regPhone = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;

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
    fullName.value.trim();
    fullName.value.replace(/[0-9]/g, '');
    if (fullName.value !== '' && regName.test(fullName.value)) {
        fullName.setCustomValidity('');
    }
    else if (!regName.test(fullName.value)) {
        fullName.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");
    } else {
        showError(fullName);
    }
}
)
address.addEventListener("input", function () {
    address.value.trim()
    if (address.value !== '' && regName.test(address.value)) {
        address.setCustomValidity('');
    } else {
        showError(address);
    }
}
)
contact.addEventListener("input", function () {
    if (contact.value !== '' && regPhone.test(contact.value)) {
        contact.setCustomValidity('');

    } else if (contact.value.length > 17) {
        contact.value = contact.value.slice(0, 17)
    } else if (contact.value.length < 17) {

        showError(contact);
    }
}
)
city.addEventListener("input", function () {
    city.value.trim()
    city.value.replace(/[0-9]/g, '');
    if (city.value !== '' && regName.test(city.value)) {
        city.setCustomValidity('');
    }
    else if (!regName.test(city.value)) {
        city.setCustomValidity("Can contain only letters, - ' ");
    } else {
        showError(city);
    }
}
)

zip.addEventListener("input", function () {
    if (zip.value !== '' && regZip.test(zip.value)) {
        zip.setCustomValidity('');
    } else if (zip.value.length > 5) {
        zip.value = zip.value.slice(0, 5)
    }
    else if (!regZip.test(zip.value)) {
        zip.setCustomValidity("Must contain 5 digits");
    } else {
        showError(zip);
    }
}
)

datepick.addEventListener("input", function () {
    if (datepick.value !== '') {
        datepick.setCustomValidity('');
    } else {
        showError(datepick);
    }
}
)

nameInput.addEventListener("input", function () {
    nameInput.value.trim()
    nameInput.value.replace(/[0-9]/g, '');
    if (nameInput.value !== '' && regName.test(nameInput.value)) {
        nameInput.setCustomValidity('');
    }
    else if (!regName.test(nameInput.value)) {
        nameInput.setCustomValidity("Fill in your full name(min.2 words). It can have letters, - ' ");
    } else {
        showError(nameInput);
    }
}
)

numInput.addEventListener("input", function () {
    if (numInput.value !== '' && regCard.test(numInput.value)) {
        numInput.setCustomValidity('');

    } else if (numInput.value.length > 19) {
        numInput.value = contact.numInput.slice(0, 19)
    } else if (numInput.value.length < 19) {

        showError(numInput);
    }

}
)
cvvInput.addEventListener("input", function () {
    if (cvvInput.value !== '' && regCvv.test(cvvInput.value)) {
        cvvInput.setCustomValidity('');
    } else if (cvvInput.value.length > 3) {
        cvvInput.value = cvvInput.value.slice(0, 3)
    }
    else if (!regCvv.test(cvvInput.value)) {
        cvvInput.setCustomValidity("Must contain only 3 digits");
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
