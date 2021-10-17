import 'regenerator-runtime/runtime.js';
import ApiService from './apiServer';
import RenderService from './render';
const apiService = new ApiService();

const commonArray = []
const getCommonData = async () => {
    const popularPics = apiService.getPics(200, 'clothes');
    const popularPrice = apiService.getPrice(200);
    // let itemsNum;
    await Promise.all([popularPics, popularPrice]).then(values => {
        // itemsNum = 16;
        let hitsObj = values[0].hits
        let dataObj = values[1].data;
        let arrPrices = []
        for (const key in dataObj) {
            if (Object.hasOwnProperty.call(dataObj, key)) {
                arrPrices.push(dataObj[key].price);
            }
        }
        for (let i = 0; i < arrPrices.length;) {

            for (const jey in hitsObj) {
                Object.assign(hitsObj[jey], { price: `${arrPrices[i]}` });
                i += 1
            }

        }
        commonArray.push(...hitsObj)
        return commonArray
    })
}

// let index = 0
// let pages = []

// function displayButtons(container, page, activeIndex) {
//     let btns = page.map((_, pageIndex) => {
//         return `<button class="page-btn ${activeIndex === pageIndex ? 'active-btn' : 'null '
//             }" data-index="${pageIndex}">
//                         ${pageIndex + 1}
//                         </button>`
//     })

//     btns.push(`<button class="next-btn">next</button>`)
//     btns.unshift(`<button class="prev-btn">prev</button>`)
//     container.innerHTML = btns.join('')
// }

const init = async () => {
    await getCommonData();
    // const renderService = new RenderService(commonArray);
    // let response = await renderService.paginate()
    // pages.push(...response)
}


export default { init, commonArray, };