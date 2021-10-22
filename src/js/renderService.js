import 'regenerator-runtime/runtime.js';
import ApiService from './apiServer';
const apiService = new ApiService();

const commonArray = []
const getCommonData = async () => {
    const popularPics = apiService.getPics(200, 'clothes');
    const popularPrice = apiService.getPrice(200);
    await Promise.all([popularPics, popularPrice]).then(values => {
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


const init = async () => {
    await getCommonData();
}


export default { init, commonArray };