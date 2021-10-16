
import popularTpl from '../templates/popularGallery.hbs';
import featuredTpl from '../templates/featuredGallery.hbs';
import ApiService from './apiServer';

const apiService = new ApiService();
import RenderService from './render';



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
        // upBtn.addEventListener('click', () => {
        //     productGallery.innerHTML = '';

        //     let arr = sortUp(commonArray)
        //     productGallery.insertAdjacentHTML('beforeend', productListTpl(arr));



        // })
        // downBtn.addEventListener('click', () => {
        //     productGallery.innerHTML = '';
        //     let arr = sortDown(commonArray)
        //     productGallery.insertAdjacentHTML('beforeend', productListTpl(arr));



        // })

        // view.textContent = `${itemsNum} of ${values[0].total}`

        return commonArray
    })
}


const init = async () => {
    await getCommonData()
};

export default { init, commonArray };