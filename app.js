const button = document.querySelector("button");
button.addEventListener("click", () => {
    if (navigator.geolocation) {
        button.innerText = "Allow to detect your location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else {
        button.innerText = "Geolocation is not supported by this browser.";
    }
}
);

let allDetails;
function onSuccess(position) {
    button.innerText = "Detecting your location...";
    let { latitude, longitude } = position.coords;

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e228ae2eaf8f4751afb78f864bdf52ea`)
        //parsing json data into javascript object and returning it and in another then function receiving the object that is sent by the api.
        .then(response => response.json()).then(result => {
            allDetails = result.results[0].components;//getting the details of the location
            let { town, city, state, country } = allDetails;//getting the details of the location
            console.log(town, city, state, country);
            button.innerText = `${town} , ${city} , ${state} , ${country} `;
            //document.write(`${town} , ${city} , ${state} , ${country} `) ;

            console.table(allDetails);
        });
}


























function onError(error) {
    console.log(error);
    if (error.code == 1) {//if user denied to share location
        button.innerText = "User denied the request for Geolocation.";
    }
    else if (error.code == 2) {//if location is not found
        button.innerText = "Location information is unavailable.";
    }
    else if (error.code == 3) {//if any other error occured
        button.innerText = "Something went wrong.";
    }
    button.setAttribute("disabled", "true");//if user denied the request for Geolocation, button will be disabled
}