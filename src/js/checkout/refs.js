import { getElement } from '../utils'

// Checkout Page

// validation  regular exp.
const regName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const regCvv = /^[0-9]{3}$/;
const regMonthYear = /[\d][0-9]{1}/;
const regZip = /^[0-9]{5}$/;
const regCard = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;
const regPhone = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;

// variables checkout page form
const form = getElement('.form')
const checkBtn = getElement('.form__field-btn')
const address = getElement('.address')
const contact = getElement('.contact')
const checkbox = getElement('.agreement')
const radio = document.querySelectorAll('.radio_btn')
const datepick = getElement('.datepick')
const state = getElement('.state-choice')
const stateOptions = document.querySelectorAll('.state-option')

// form notification
const detailsBuyer = getElement('.details-buyer')
const detailsPayment = getElement('.details-payment')
const formOverlay = getElement('.form-overlay');
const closeFormBtn = getElement('.form-close');
const completeWrapper = getElement('.complete__wrapper')
const sectionTitle = getElement('.section__title')
const spans = document.querySelectorAll('.progress__list span')
const completeBtn = getElement('.complete__wrapper-button')


//  variables for card in form
const nameInput = getElement('.card-name')
const nameCard = getElement('.name-surname')
const numInput = getElement('.card-number')
const numCard = getElement('.card-number_input')
const monthSelect = getElement('.month')
const monthCard = getElement('.expiration-month')
const yearSelect = getElement('.year')
const yearCard = getElement('.expiration-year')
const cvvInput = getElement('.cvv')
const cvvCard = getElement('.cvv-card')

export default {
    checkBtn,
    contact,
    radio,
    state,
    address,
    form,
    nameInput,
    nameCard,
    datepick,
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
    closeFormBtn,
    completeWrapper,
    sectionTitle,
    spans,
    completeBtn
}