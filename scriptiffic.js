//variables
let lon;
let lat;
let locations = [];
let totalDist = 0;

const time = document.querySelector("#time");
const distance = document.querySelector("#distance");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const geo = navigator.geolocation;
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 5000,
};
//&key=ApwvG3nj84vYuuLndoBvpO-v-2DRvBYWOMe6Qn91TMKEEDNpjri-pNSd-ihAIT_Q
class Location{
  constructor(lat,lon){
    this.lat = lat;
    this.lon = lon;
  }
}

//acquires your starting GPS position
const addLoc = async () => {
  
    geo.watchPosition(
      (position) => {
        lat = parseFloat(position.coords.latitude);
        lon = parseFloat(position.coords.longitude);
        console.log(`${lat} and ${lon}`);
        locations.push(new Location(lat , lon));
      },
      (err) => alert(err),
      options
    );
}
//calculate distance between 2 points
const calcDist = (lat, lon, lat2, lon2) => {
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
};

const addDist = async () => {
if(locations.length >= 2){
let oneLat = locations[0].lat;
let oneLon = locations[0].lon;
let twoLat = locations[1].lat;
let twoLon = locations[1].lon;
totalDist = totalDist + calcDist(oneLat, oneLon, twoLat, twoLon);

console.log(totalDist);
}
}
const removeLoc = () => {
  locations.shift();
}

const interval = () => {setInterval(() => {
  addLoc(); 
  console.log(locations);
  addDist();
  removeLoc();

  
}, 3000)};




startBtn.addEventListener("click", function() {
  addLoc();
  interval();
  
});

stopBtn.addEventListener("click", function(){clearInterval(interval)});
