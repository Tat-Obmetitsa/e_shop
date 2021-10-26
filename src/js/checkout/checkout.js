import '../../scss/main.scss'
import flatpickr from "flatpickr";
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

    };

    refs.radio.forEach(el => {
        if (el.checked) {
            formData.append('radio', el.value);
        }
    });

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

// add into to notification card

function checkInputs() {
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    const json = JSON.stringify(object);
    //  json with data for future submit
    // console.log(json)

    refs.detailsBuyer.innerHTML = `
    <li><h3>Full Name:</h3><span>${object.name}</span></li>
    <li><h3>Address:</h3><span>${object.address}</span></li>
    <li><h3>Contact</h3><span>${object.contact}</span></li>
    <li><h3>City:</h3><span>${object.city}</span></li>
    <li><h3>State:</h3><span>${object.state}</span></li>
    <li><h3>Zip Code:</h3><span>${object.zip}</span></li>
    <li><h3>Delivery date</h3><span>${object.delivery_date}</span></li>
    `
    refs.detailsPayment.innerHTML = `
    <li><h3>Payment Method:</h3><span>${object.radio}</span></li>
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

