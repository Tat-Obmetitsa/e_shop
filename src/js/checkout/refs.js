import utils from '../utils'

// Checkout Page

//  delivery 
const deliveryRadio = document.querySelectorAll(".delivery-check");
const deliveryDetails = document.querySelectorAll(".delivery-details");
const deliveryPrice = document.querySelectorAll(".shipping__delivery-cost");

const paymentRadio = document.querySelectorAll(".payment-check");
const paymentWrap = document.querySelectorAll(".payment__wrap");
const paymentPrice = utils.getElement(".postage__price")
// order
const itemsPrice = utils.getElement(".items-total")
const itemsDiscount = utils.getElement(".items-discount");
const itemsServices = utils.getElement(".items-services");
const itemsShipping = utils.getElement(".items-shipping");
const itemsTotalPrice = utils.getElement(".items-total-price");
const installmetPrice = utils.getElement(".installment-payment")

// validation  regular exp.
const regName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const regCvv = /^[0-9]{3}$/;
const regMonthYear = /[\d][0-9]{1}/;
const regZip = /^[0-9]{5}$/;
const regCard = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;
const regPhone = /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;

// variables checkout page form
const form = utils.getElement('.form')
const checkBtn = utils.getElement('.form__field-btn')
const address = utils.getElement('.address')
const contact = utils.getElement('.contact')
const checkbox = utils.getElement('.agreement')
const radio = document.querySelectorAll('.radio_btn')
const datepick = utils.getElement('.datepick')
const state = utils.getElement('.state-choice')
const stateOptions = document.querySelectorAll('.state-option')

// form notification
const detailsBuyer = utils.getElement('.details-buyer')
const detailsPayment = utils.getElement('.details-payment')
const formOverlay = utils.getElement('.form-overlay');
const closeFormBtn = utils.getElement('.form-close');
const completeWrapper = utils.getElement('.complete__wrapper')
const sectionTitle = utils.getElement('.section__title')
const spans = document.querySelectorAll('.progress__list span')
const completeBtn = utils.getElement('.complete__wrapper-button')


//  variables for card in form
const nameInput = utils.getElement('.card-name')
const nameCard = utils.getElement('.name-surname')
const numInput = utils.getElement('.card-number')
const numCard = utils.getElement('.card-number_input')
const monthSelect = utils.getElement('.month')
const monthCard = utils.getElement('.expiration-month')
const yearSelect = utils.getElement('.year')
const yearCard = utils.getElement('.expiration-year')
const cvvInput = utils.getElement('.cvv')
const cvvCard = utils.getElement('.cvv-card')

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
    completeBtn,
    itemsPrice,
    itemsDiscount,
    itemsServices,
    itemsShipping,
    itemsTotalPrice,
    installmetPrice,
    deliveryRadio,
    deliveryDetails,
    deliveryPrice,
    paymentWrap,
    paymentRadio,
    paymentPrice
}