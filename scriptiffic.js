let lon;
let lat;
let location= [];
let distances = [];
let totalDist = 0;
const time = document.querySelector("#time");
const distance = document.querySelector("#distance");
const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const geo = navigator.geolocation; 
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 5000
}
//&key=ApwvG3nj84vYuuLndoBvpO-v-2DRvBYWOMe6Qn91TMKEEDNpjri-pNSd-ihAIT_Q
if(geo){
geo.getCurrentPosition( (position) => {
    lat = parseFloat(position.coords.latitude);
    lon = parseFloat(position.coords.longitude);
    console.log(`${lat} and ${lon}`);
    
}, err => alert(err), options);
} else {
  alert("Geolocation not available");
}
    // console.log(`${lat} ${lon}`);

    const distance = (lat, lon, lat2, lon2) => {
        if (lat == lat2 && lon == lon2) {
          return 0;
        } else {
          const radlat1 = Math.PI * (lat / 180);
          const radlat2 = Math.PI * (lat2 / 180);
          const theta = lon - lon2;
          const radtheta = Math.PI * (theta / 180);
          dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist > 1) {
            dist = 1;
          }
          dist = Math.acos(dist);
          dist = (dist * 180) / Math.PI;
          dist = dist * 60 * 1.1515;
      
          return dist;
        }
      }

      async function started () {

      }

start.addEventListener("click", started() )




