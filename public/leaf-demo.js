var map = L.map("map", {
 center: [38.83, -77.000156],
 minZoom: 2,
 zoom: 14
});
 
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
 attribution:
   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
 subdomains: ["a", "b", "c"]
}).addTo(map);
 
L.marker([38.819457, -77.000162]).bindPopup('This is Subway #1.').addTo(map)
