// window.addEventListener("load", ()=> {
//     let long;
//     let lat;

//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(position => {
//             console.log(position);
//         });
//     }
// });

const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q={city}&units=imperial&appid=508c45685c54e0750733e07a9d286ab4`;