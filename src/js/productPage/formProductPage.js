//  comment form
const reviewsSection = document.querySelector(".reviews__wrapper");
const formReview = document.querySelector(".review__form")
let formData = new FormData(formReview);

const radio = document.querySelectorAll('.radio')

formReview.addEventListener('input', (e) => {
    let el = e.target;
    let elValue = e.target.value;
    elValue.trim();
    if (el.classList.contains("name") && el.validity.valid) {
        formData.append("user", elValue);
    }

    if (el.classList.contains("email") && el.validity.valid) {
        formData.append("email", elValue);
    }
    if (el.classList.contains("comment") && el.validity.valid) {
        formData.append("description", elValue)
    }
})

function renderReviews(obj) {
    reviewsSection.innerHTML = " "
    for (let i = 0; i < obj.length; i++) {
        const e = obj[i];
        let liItem = document.createElement('li')
        if (e.userImageURL === undefined || e.userImageURL === null || e.userImageURL === "") {
            e.userImageURL = "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png"
        }
        liItem.classList.add('reviews__wrapper-item');
        liItem.innerHTML = `
            <div class="reviews__wrapper-item_info">
             <img src=${e.userImageURL} class="user__image"   alt="avatar">
             <h4 class="user__name">${e.user}</h4>
              <div class="wrapper__description-icons" data-id=${e.id}>
     </div >
        </div>
        <p class="user__review"  >${e.description}</p>
        `
        reviewsSection.appendChild(liItem)
    }

}

function checkInputs(ob) {
    let object = {
        "user": "",
        "email": "",
        "description": "",
        "star": "",
        "id": window.location.search.replace("?", "").replace("=", "")
    };
    radio.forEach(el => {
        if (el.checked) {
            formData.append("star", el.value);
        }
    });
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    const json = JSON.stringify(object);
    let finalObj = Object.values(object).every(e => e !== "")
    if (finalObj) {

        let commentArray = JSON.parse(localStorage.getItem('comment')) || [];
        commentArray.push(object);
        localStorage.setItem('comment', JSON.stringify(commentArray));
        document.querySelector(".name.input").value = "";
        document.querySelector(".email.input").value = "";
        document.querySelector("textarea").value = "";
        ob.push(object)
        formData.forEach(function (value, key) {
            formData.delete(key)
        });
        renderReviews(ob)

    }

}

export default { checkInputs, renderReviews }