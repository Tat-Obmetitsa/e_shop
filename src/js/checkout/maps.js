//  map with Rozetka Stores
function initMapStores() {
    const kyiv = { lat: 50.230, lng: 30.596 };
    const mapStores = new google.maps.Map(document.getElementById("map-canvas"), {
        center: kyiv,
        zoom: 9,
        mapId: "8d193001f940fde3",
    });
    const service = new google.maps.places.PlacesService(mapStores);

    service.nearbySearch(
        { location: kyiv, radius: 20000, name: "Rozetka", type: "store" },
        (results, status) => {
            if (status !== "OK" || !results) return;
            addPlaces(results, mapStores);
        }
    );
}

function addPlaces(places, map) {
    const placesList = document.getElementById("places");

    for (const place of places) {
        if (place.geometry && place.geometry.location) {
            const image = {
                url: place.icon,

                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };
            const infoWindow = new google.maps.InfoWindow();
            const marker = new google.maps.Marker({
                map,
                placeId: place.place_id,
                address: place.vicinity,
                icon: image,
                title: place.name + "   " + place.vicinity,
                position: place.geometry.location,
            });
            marker.addListener("click", () => {
                infoWindow.close();
                infoWindow.setContent(marker.getTitle());
                infoWindow.open(marker.getMap(), marker);
                document.querySelector(".store-address").value = marker.address
            });

            const li = document.createElement("li");
            li.textContent = place.name;
            placesList.appendChild(li);

            li.addEventListener("click", () => {
                map.setCenter(place.geometry.location);
                document.querySelector(".store-address").value = place.vicinity;
                // document.querySelector(".store-address").setAttribute('readonly', true);
            });
        }
    }
}

//  map with autocomplete

var placeSearch, autocomplete;
var componentForm = {
    street_number: 'long_name',
    route: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    locality: 'long_name',
    postal_code: 'short_name'
};

function initAutocompleteForm() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.749933, lng: -73.98633 },
        zoom: 13,
        mapTypeControl: false,
    });
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete-address')), {
        types: ['address'],
        strictBounds: false,
        componentRestrictions: { country: 'ua' }
    });
    autocomplete.bindTo("bounds", map);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content")
    infowindow.setContent(infowindowContent);

    const marker = new google.maps.Marker({
        map,
        anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener('place_changed', fillInAddress);

    function fillInAddress() {
        infowindow.close();
        marker.setVisible(false);
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent =
            place.formatted_address;
        infowindow.open(map, marker);

        var fetched_address = [];
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                fetched_address[addressType] = val;
            }
        }
        // Prefill
        var combined_address = "";

        if (typeof (fetched_address['street_number']) != "undefined") {
            combined_address = fetched_address['street_number'];
        }

        if (typeof (fetched_address['route']) != "undefined") {
            if (combined_address != "") {
                combined_address += " ";
            }
            combined_address += fetched_address['route'];
        }
        if (typeof (fetched_address['postal_code']) == "undefined") {
            fetched_address['postal_code'] = '-';
        }
        if (typeof (fetched_address['administrative_area_level_1']) == "undefined") {
            fetched_address['administrative_area_level_1'] = '-';
        }

        $('#bill_address').val(combined_address);
        $('#city').val(fetched_address['locality']);
        $('#bill_state').val(fetched_address['administrative_area_level_1']);
        $('#code').val(fetched_address['postal_code']);
        $('#bill_country').val(fetched_address['country']);

        var $addressform = $('#address-mini-form');
        $addressform.addClass('has-success has-feedback');

        if (!$addressform.find('.form-control-feedback').length) {
            $addressform.append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
        }
    }

}


$(function () {
    var geolocate = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());
            });
        }
    };
    $('.address-container').on('focus', '#address', function (e) {
        geolocate();
    });

    $('#address-mini-form input').on('keyup', function (e) {
        var $this = $(this),
            $parent = $this.parents('#address-mini-form');

        $parent.removeClass('has-success has-feedback');
        $parent.find('.form-control-feedback').remove();
    });

    $('[data-show-fullform]').click(function (e) {
        e.preventDefault();

        var $target = $($(this).attr('href'));
        $target.show();

        $('#address-mini-form').hide();
    });
});










google.maps.event.addDomListener(window, 'load', initMapStores,);

google.maps.event.addDomListener(window, 'load', initAutocompleteForm,);
