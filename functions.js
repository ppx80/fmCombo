﻿//Namespace

;(function (fm, undefined) {

    //$H.isMobile = function(a){ return /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera)};

    fm.mobilePosition = function (success,error) {
        navigator.geolocation.getCurrentPosition(
		    success,
		    error,
		    { 'enableHighAccuracy': true, 'timeout': 10000, 'maximumAge': 0 }
	    );
    };

    fm.map = function (lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);

        var options = {
            zoom: 12,
            center: latlng,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'), options);

        var markers = [];
        markers.push(new google.maps.Marker({ position: latlng, map: map }));

        return { Manager: map, Positions: markers, Locations: null };
    };

    fm.removeMarkers = function (positions) {
        for (var i = 0; i < positions.length; i++) {
            positions[i].setMap(null);
        }
    };

    fm.geocode = function (address) {

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'address': address }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                return results[0].geometry.location;
            }
            else {
                return null;
            }
        });
    };

    fm.reverseGeocode = function (lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                return results[1].formatted_address;
            }
        }
        else {
            return null;
        }
    };

})(window.fm = window.fm || {});


(function (a) { isMobile = /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera);



function _mappa(lat, long) {

    var latlng = new google.maps.LatLng(lat, long);

    var options = {
        zoom: 12,
        center: latlng,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), options);

    var markers = [];
    markers.push(new google.maps.Marker({ position: latlng, map: map }));

    return { Manager: map, Positions: markers, Locations: null };
}

function gotPosition(pos) {

    return mappa(pos.coords.latitude, pos.coords.longitude);
}

function errorPosition(err) {
    if (err.code == 1) {
        alert("L'utente non ha autorizzato la geolocalizzazione");
    } else if (err.code == 2) {
        alert("Posizione non disponibile");
    } else if (err.code == 3) {
        alert("Timeout");
    } else {
        alert("ERRORE:" + err.message);
    }
}

function position() {

    navigator.geolocation.getCurrentPosition(
		gotPosition,
		errorPosition,
		{ 'enableHighAccuracy': true, 'timeout': 10000, 'maximumAge': 0 }
	);

}

function geocode(map, zoom, address, city) {

    address = address + ' - ' + city;

    var new_seg_marker, infow;

    //Inizializzo il geocoding
    var geocoder = new google.maps.Geocoder();
    //Recupero le coordinate geografiche e creo un marker
    geocoder.geocode({ 'address': address }, function (results, status) {

        //PUlisco la mappa dai markers
        for (var i = 0; i < map.Positions.length; i++) {
            map.Positions[i].setMap(null);
        }

        if (status == google.maps.GeocoderStatus.OK) {

            //Definisco la infowindow di aiuto
            var help = '<b>Definizione della posizione</b><br />Sposta il marcatore lungo la via selezionata per definire con precisione<br />' +
                           'il punto esatto di rilevazione. ';

            new_seg_marker = new google.maps.Marker(
            {
                position: results[0].geometry.location,
                map: map.Manager,
                draggable: true
                //title: 'Clicca per inserire la segnalazione in questo punto'
            });

            map.Positions.push(new_seg_marker);

            infow = new google.maps.InfoWindow({ content: help });
            infow.open(map.Manager, new_seg_marker);

            //Collego i listener ad eventi sul marker
            google.maps.event.addListener(new_seg_marker, 'mouseup', function (event) {
                map.Manager.setCenter(event.latLng);
            });

            map.Manager.setCenter(results[0].geometry.location);
            map.Manager.setZoom(zoom);

            map.Locations = results[0].geometry.location

            return map;
        }
    });
}
      