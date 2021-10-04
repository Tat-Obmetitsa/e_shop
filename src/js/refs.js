import { getElement } from './utils'


// Checkout Page

// validation  regular exp.
export const regName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
export const regCvv = /^[0-9]{3}$/;
export const regMonthYear = /[\d][0-9]{1}/;
export const regZip = /^[0-9]{5}$/;
export const regCard = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;
export const regPhone = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;

// variables checkout page form
export const form = getElement('.form')
export const checkBtn = getElement('.form__field-btn')
export const address = getElement('.address')
export const contact = getElement('.contact')
export const checkbox = getElement('.agreement')
export const radio = document.querySelectorAll('.radio_btn')
export const datepick = getElement('.datepick')
export const state = getElement('.state-choice')
export const stateOptions = document.querySelectorAll('.state-option')

// form notification
export const detailsBuyer = getElement('.details-buyer')
export const detailsPayment = getElement('.details-payment')
export const formOverlay = getElement('.form-overlay');
export const closeFormBtn = getElement('.form-close');
export const completeWrapper = getElement('.complete__wrapper')
export const sectionTitle = getElement('.section__title')
export const spans = document.querySelectorAll('.progress__list span')
export const completeBtn = getElement('.complete__wrapper-button')


//  variables for card in form
export const nameInput = getElement('.card-name')
export const nameCard = getElement('.name-surname')
export const numInput = getElement('.card-number')
export const numCard = getElement('.card-number_input')
export const monthSelect = getElement('.month')
export const monthCard = getElement('.expiration-month')
export const yearSelect = getElement('.year')
export const yearCard = getElement('.expiration-year')
export const cvvInput = getElement('.cvv')
export const cvvCard = getElement('.cvv-card')