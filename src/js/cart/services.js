import renderCart from './renderCart'
function addServices(obj) {
    const radioCheck = document.querySelectorAll(".guarantee-check");
    const percentWrapper = document.querySelectorAll(".services-percent");
    const priceWrapper = document.querySelectorAll(".services-price");
    for (let index = 0; index < obj.length; index++) {
        const element = obj[index];
        percentWrapper[index].textContent = obj[index].services;
        priceWrapper[index].textContent = (((obj[index].price * obj[index].amount) * Number(obj[index].services)) / 100).toFixed(2)
        radioCheck.forEach(e => {

            e.addEventListener("change", (ev) => {
                if (e.parentElement.parentElement.dataset.id == element.id) {
                    obj[index].services = Number(ev.target.value);
                    percentWrapper[index].textContent = ev.target.value;
                    priceWrapper[index].textContent = (((obj[index].price * obj[index].amount) * Number(ev.target.value)) / 100).toFixed(2)
                    localStorage.setItem('cart', JSON.stringify(obj));
                    renderCart.displayCartTotal(obj)


                }
            })

        })
    }
}

export default {
    addServices
}