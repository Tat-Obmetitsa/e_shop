import 'regenerator-runtime/runtime.js';
import ApiService from '../apiServer';
const apiService = new ApiService();

function initMapPost(places) {
    const mapOffices = new google.maps.Map(document.getElementById("map-offices"), {
        center: { lat: 50.230, lng: 30.596 },
        zoom: 9,
        mapId: "8d193001f940fde3",
    });
    addPlaces(places, mapOffices)

}


function addPlaces(places, map) {
    const placesList = document.getElementById("offices");
    placesList.innerHTML = ''
    for (const place of places) {

        const infoWindow = new google.maps.InfoWindow();
        const marker = new google.maps.Marker({
            map,
            position: { lat: place.lat, lng: place.lng },
            address: place.address,
            title: place.description
        });
        marker.addListener("click", () => {
            infoWindow.close();
            infoWindow.setContent(marker.getTitle());
            infoWindow.open(marker.getMap(), marker);
            document.querySelector(".office-address").value = marker.address;
            document.querySelector(".office-type").value = place.description.split(":")[0]
        });

        const li = document.createElement("li");
        li.textContent = place.description;
        placesList.appendChild(li);

        li.addEventListener("click", () => {
            map.setCenter({ lat: place.lat, lng: place.lng });
            document.querySelector(".office-address").value = place.address
            document.querySelector(".office-type").value = place.description.split(":")[0]
        });

    }
}


function getPostData() {
    const data = JSON.parse("{\r\n\"apiKey\": \"fd127c11026542ba1c33e03f917d813d\",\r\n \"modelName\": \"AddressGeneral\",\r\n \"calledMethod\": \"getWarehouses\",\r\n \"methodProperties\": {\r\n \"CityName\": \"Київ\"    }\r\n}")
    data.methodProperties.CityName = document.getElementById("office-address").value

    var settings = {
        "async": "true",
        "crossDomain": "true",
        "url": "https://api.novaposhta.ua/v2.0/json/AddressGeneral/getWarehouses",
        "method": "POST",
        "headers": {
            "content-type": "application/json",

        },
        "processData": "false",
        "data": JSON.stringify(data)
    }
    const datums = $.ajax(settings).done(function (response) {
        let locations = []
        for (const key in response.data) {
            if (Object.hasOwnProperty.call(response.data, key)) {
                const element = response.data[key];
                locations.push({ lat: Number(element.Latitude), lng: Number(element.Longitude), address: element.ShortAddress, description: element.Description })
            }
        }
        if (document.getElementById("office-address").value == "") {
            locations = []
        }
        initMapPost(locations)
        return locations;
    });
    return datums
}
document.querySelector(".search-address").addEventListener("click", () => getPostData())



google.maps.event.addDomListener(window, 'load', getPostData,);