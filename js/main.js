let searchInput = document.querySelector(".search-input");
let dayOne = document.querySelector(".day-one-data");
let dayTwo = document.querySelector(".day-two-data");
let dayThree = document.querySelector(".day-three-data");
let dataTable = document.querySelector(".data-table");
let searchBtn = document.querySelector(".search-btn");

let allData = [];
let forecastData = [];
let myHttpReq = new XMLHttpRequest();
myHttpReq.open("GET", "https://api.weatherapi.com/v1/forecast.json?key=c7e2ff2508c8495fbbf71549221306&q=cairo&days=3");
myHttpReq.send();
myHttpReq.addEventListener("readystatechange", function () {
    if (myHttpReq.readyState == 4 && myHttpReq.status == 200) {
        allData = JSON.parse(myHttpReq.response);
        forecastData = JSON.parse(myHttpReq.response).forecast.forecastday;
        console.log(allData);
        console.log(forecastData)
        displayDefault(allData)
    }
});

let searchData = [];
searchBtn.addEventListener("click", function () {
    myHttpReqSearch = new XMLHttpRequest();
    myHttpReqSearch.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=c7e2ff2508c8495fbbf71549221306&q=${searchInput.value}&days=3`);
    myHttpReqSearch.send();
    myHttpReqSearch.addEventListener("readystatechange", function () {
        if (myHttpReqSearch.readyState == 4 && myHttpReqSearch.status == 200) {
            searchData = JSON.parse(myHttpReqSearch.response);
            forecastData = JSON.parse(myHttpReqSearch.response).forecast.forecastday;
            displayDefault(searchData);
            clear();
        }
        else {
            dataTable.innerHTML = `<div class="alert alert-danger text-center"><h1>Not found</h1></div>`
            clear();
        }
    });
})

function clear(){
    searchInput.value = "";
}


function displayDefault(arr) {
    let divs = `

    <div class="col-md-4 forecast-outer day-one-data">
                    <div class="forecast-head row">
                        <div class="date">
                            ${forecastData[0].date}
                        </div>
                    </div>

                    <div class="forecast-body py-5">
                        <p class="city">${arr.location.name}</p>
                        <div class="row justify-content-between">
                            <div class="temperature col-md-6">
                                <h1>${forecastData[0].day.maxtemp_c}<sup>o</sup>C</h1>
                            </div>
                            <div class="weather-photo col-md-6"><img class="w-100" src="imgs/logo-removebg-preview.png"
                                    alt=""></div>
                        </div>
                        <div class="weather-desc">${forecastData[0].day.condition.text}</div>
                    </div>
                </div>
                <div class="col-md-4 middle day-two-data">
                    <div class="forecast-head row">
                        <div class="date">
                        ${forecastData[1].date} 
                        </div>

                    </div>

                    <div class="forecast-body text-center py-5">
                        <div class="weather-photo-middle col-md-6 mx-auto"><img class="w-100"
                                src="imgs/logo-removebg-preview.png" alt=""></div>
                        <div class="max-temp">
                            <h1>${forecastData[1].day.maxtemp_c}<sup>o</sup>C</h1>
                        </div>
                        <div class="min-temp">
                            <p>${forecastData[1].day.mintemp_c}<sup>o</sup></p>
                        </div>
                        <div class="weather-desc">${forecastData[1].day.condition.text}</div>
                    </div>
                </div>
                <div class="col-md-4 forecast-outer day-three-data">
                    <div class="forecast-head row">
                        <div class="date">
                           ${forecastData[2].date}
                        </div>

                    </div>

                    <div class="forecast-body text-center py-5">
                        <div class="weather-photo-middle col-md-6 mx-auto"><img class="w-100"
                                src="imgs/logo-removebg-preview.png" alt=""></div>
                        <div class="max-temp">
                            <h1>${forecastData[2].day.maxtemp_c}<sup>o</sup>C</h1>
                        </div>
                        <div class="max-temp">
                            <p>${forecastData[2].day.mintemp_c}<sup>o</sup></p>
                        </div>
                        <div class="weather-desc">${forecastData[2].day.condition.text}</div>
                    </div>
                </div>
    
    `

    dataTable.innerHTML = divs;
}
