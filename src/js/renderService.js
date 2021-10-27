import 'regenerator-runtime/runtime.js';
import ApiService from './apiServer';
const apiService = new ApiService();
import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

const commonArray = []
const getCommonData = async () => {
    const popularPics = apiService.getPics(200, 'clothes');
    const popularPrice = apiService.getPrice(200);

    await Promise.all([popularPics, popularPrice]).then(values => {
        let hitsObj = values[0].hits
        let dataObj = values[1].data;
        let arrPrices = []
        let arrDecriptions = []
        let arrManufacturer = []

        const maxObject = hitsObj.reduce((prev, current) => prev.likes > current.likes ? prev : current, {});
        let maxLikes = maxObject.likes
        let star = 0
        let quantity = 0
        let shipping = 0

        for (const key in dataObj) {
            if (Object.hasOwnProperty.call(dataObj, key)) {
                arrPrices.push(dataObj[key].price);
                arrDecriptions.push(dataObj[key].description)
                arrManufacturer.push(dataObj[key].manufacturer)
            }
        }
        for (let i = 0; i < arrPrices.length;) {

            for (const jey in hitsObj) {


                if (hitsObj[jey].likes < ((maxLikes * 20) / 100)) {
                    star = 1
                } else if (hitsObj[jey].likes >= ((maxLikes * 30) / 100) && hitsObj[jey].likes < ((maxLikes * 40) / 100)) {
                    star = 2
                } else if (hitsObj[jey].likes >= ((maxLikes * 40) / 100) && hitsObj[jey].likes < ((maxLikes * 55) / 100)) {
                    star = 3
                } else if (hitsObj[jey].likes >= ((maxLikes * 55) / 100) && hitsObj[jey].likes < ((maxLikes * 80) / 100)) {
                    star = 4
                } else if (hitsObj[jey].likes >= ((maxLikes * 80) / 100)) {
                    star = 5
                }

                Object.assign(hitsObj[jey], {
                    price: `${arrPrices[i]}`, description: `${arrDecriptions[i]}`,
                    quantity: quantity,
                    reviews: [{
                        id: `${hitsObj[jey].id}`, user: `${hitsObj[jey].user}`, userImageURL: `${hitsObj[jey].userImageURL}`, description: `${lorem.generateParagraphs(1)}`, star: `${star}`,
                    },
                    {
                        id: `${hitsObj[jey].id}`, user: `MyComment`, userImageURL: "", description: `${lorem.generateSentences(2)}`, star: `${star < 5 ? star + 1 : star - 1}`,
                    }],
                    shipping: shipping,
                    manufacturer: `${arrManufacturer[i]}`,
                    star: `${star}`
                });
                i += 1
                quantity += 1
                shipping += 10
                if (quantity > 9) {
                    quantity = 0
                } else if (shipping > 50) { shipping = 0 }
            }
        }

        commonArray.push(...hitsObj);
        let commentArray = JSON.parse(localStorage.getItem('comment')) || [];
        if (commentArray !== []) {
            commentArray.forEach(el => {
                commonArray.forEach(e => {
                    if (el.id == e.id) {
                        e.reviews.push(el)
                        e.likes = e.likes + Number(el.star)
                    }
                    return commonArray
                })

            });
        }

        return commonArray
    })
}


const init = async () => {
    await getCommonData();
}


export default { init, commonArray };