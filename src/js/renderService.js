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
        let arrDecriptions = []
        let arrShipping = [0, 10, 20];
        let arrShipp = []
        let random = Math.floor(Math.random() * arrShipping.length);
        let arrManufacturer = []

        const maxObject = hitsObj.reduce((prev, current) => prev.likes > current.likes ? prev : current, {});
        let maxLikes = maxObject.likes
        let star = 0

        for (const key in dataObj) {
            if (Object.hasOwnProperty.call(dataObj, key)) {
                arrPrices.push(dataObj[key].price);
                arrDecriptions.push(dataObj[key].description)
                arrShipp.push(arrShipping[random])
                arrManufacturer.push(dataObj[key].manufacturer)
            }
        }
        for (let i = 0; i < arrPrices.length;) {

            for (const jey in hitsObj) {


                if (hitsObj[jey].likes < ((maxLikes * 20) / 100)) {
                    star = 1
                } else if (hitsObj[jey].likes >= ((maxLikes * 20) / 100) && hitsObj[jey].likes < ((maxLikes * 40) / 100)) {
                    star = 2
                } else if (hitsObj[jey].likes >= ((maxLikes * 40) / 100) && hitsObj[jey].likes < ((maxLikes * 60) / 100)) {
                    star = 3
                } else if (hitsObj[jey].likes >= ((maxLikes * 60) / 100) && hitsObj[jey].likes < ((maxLikes * 80) / 100)) {
                    star = 4
                } else if (hitsObj[jey].likes >= ((maxLikes * 80) / 100)) {
                    star = 5
                }

                Object.assign(hitsObj[jey], {
                    price: `${arrPrices[i]}`, description: `${arrDecriptions[i]}`,
                    reviews: [{ id: `${hitsObj[jey].id}`, user: `${hitsObj[jey].user}`, userImageURL: `${hitsObj[jey].userImageURL}`, description: `${arrDecriptions[i]}`, star: `${star}` }],
                    shipping: `${arrShipp[i]}`,
                    manufacturer: `${arrManufacturer[i]}`,
                    star: `${star}`
                });
                i += 1

            }
        }

        // , reviews: [`${ reviews[jey]}`] 
        commonArray.push(...hitsObj)
        return commonArray
    })
}


const init = async () => {
    await getCommonData();
}


export default { init, commonArray };