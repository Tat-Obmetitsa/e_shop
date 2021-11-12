import renderCart from './renderCart'
import utils from '../utils.js';

function addServices(obj) {
    if (!obj) return
    const radioCheck = document.querySelectorAll(".guarantee-check");
    const percentWrapperDesktop = document.querySelectorAll(".desktop .services-percent");
    const percentWrapperMobile = document.querySelectorAll(".mobile .services-percent");
    const priceWrapperDesktop = document.querySelectorAll(".desktop .services-price");
    const priceWrapperMobile = document.querySelectorAll(".mobile .services-price");
    for (let index = 0; index < obj.length; index++) {
        const element = obj[index];
        if (percentWrapperDesktop[index]) {
            percentWrapperDesktop[index].textContent = obj[index].services;
        } else if (percentWrapperMobile[index]) {
            percentWrapperMobile[index].textContent = obj[index].services;
        }
        if (priceWrapperDesktop[index]) {
            priceWrapperDesktop[index].textContent = (((obj[index].price * obj[index].amount) * Number(obj[index].services)) / 100).toFixed(2);
        } else if (priceWrapperMobile[index]) {
            priceWrapperMobile[index].textContent = (((obj[index].price * obj[index].amount) * Number(obj[index].services)) / 100).toFixed(2)
        }

        radioCheck.forEach(e => {    //change services
            e.addEventListener("change", (ev) => {
                if (e.parentElement.parentElement.dataset.id == element.id) {
                    obj[index].services = Number(ev.target.value);
                    percentWrapperDesktop[index].textContent = ev.target.value;
                    percentWrapperMobile[index].textContent = ev.target.value;
                    priceWrapperDesktop[index].textContent = (((obj[index].price * obj[index].amount) * Number(ev.target.value)) / 100).toFixed(2)
                    priceWrapperMobile[index].textContent = (((obj[index].price * obj[index].amount) * Number(ev.target.value)) / 100).toFixed(2)
                    localStorage.setItem('cart', JSON.stringify(obj));
                    renderCart.displayCartTotal(obj)
                }
            })

        })
    }

}

function addPaymentMethod(obj) {
    if (!obj) return

    let payments = utils.getStorageItem("payments")
    const allPaymentNumbers = document.querySelectorAll(".payments__number");
    const allSelects = document.querySelectorAll("select");
    const allPrices = document.querySelectorAll(".payments__price")
    const allBankNames = document.querySelectorAll(".bank__name")
    const allSubmitBtns = document.querySelectorAll(".payments__approve")
    let totalPrice = [];
    let total = obj.reduce((total, cartItem) => {
        return (total += cartItem.price * cartItem.amount);
    }, 0);


    for (let index = 0; index < allSelects.length; index++) {
        const element = allSelects[index]
        allPaymentNumbers[index].textContent = Number(allSelects[index].value) + 1
        totalPrice.push(((Number(total) * (100 + Number(allSelects[index].value))) / 100).toFixed(2))
        allPrices[index].textContent = (Number(totalPrice[index]) / (Number(allSelects[index].value) + 1)).toFixed(2);

         

        $(function () {
            $(element).alwaysChange(function (val) {
                val = Number(val)
                allPaymentNumbers[index].textContent = Number(val) + 1;
                allPrices[index].textContent = (((Number(total) * (100 + val)) / 100) / (Number(val) + 1)).toFixed(2);


            });
        })
        allSubmitBtns[index].addEventListener('click', () => {
            if (document.querySelector(".payment-info") !== null) { document.querySelector(".table__price").lastChild.remove() }


            document.querySelector(".price").textContent = `$${totalPrice[index]}`
            document.querySelector(".price").classList.add('free')
            const paymentInfo = document.createElement('span')
            document.querySelector(".table__price").appendChild(paymentInfo);
            paymentInfo.textContent = `*${allPaymentNumbers[index].textContent} payments $${allPrices[index].textContent} for ${Number(allPaymentNumbers[index].textContent) - 1} months via ${allBankNames[index].textContent}`
            paymentInfo.classList.add('free', "payment-info")

            if (document.querySelector(".discount-price") !== null) { document.querySelector(".discount-price").classList.add('v-hidden') }
            document.querySelector(".credit.section").classList.add("modal-hidden")
            payments.installmentsPrice = {
            paymentsNumber: allPaymentNumbers[index].textContent, paymentPrice: allPrices[index].textContent, paymentsDuration: `${Number(allPaymentNumbers[index].textContent)}`, bank: allBankNames[index].textContent, totalPrice: totalPrice[index]
        } 
            utils.setStorageItem('payments', payments) 

        })

    }


    $.fn.alwaysChange = function (callback) {
        return this.filter('select').each(function () {
            var elem = this;
            var $this = $(this);

            $this.change(function () {
                callback($this.val());
            }).focus(function () {
                elem.selectedIndex = -1;
                elem.blur();
            });
        });
    }
}


export default {
    addServices, addPaymentMethod
}