var mapimg;

var clat = 0;
var clon = 0;

var lat = 31.22222;
var lon = 121.45806;

var zoom = 1;
var earthquakes;

function preload() {
  mapimg = loadImage(
    'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoia2FoYWxhaDIxIiwiYSI6ImNrZWtqaWNoeDA3bGUzMm92dDd0MjlhbHgifQ.ettScokwg_ueU8k2dMVxIQ');
    earthquakes = loadStrings( 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv')
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 /  PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(1024, 512);
  // moves the origin from top left to center
  translate(width / 2, height / 2);
  //then makes image mode drawn to the center
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var cx = mercX(clon);
  var cy = mercY(clat);
//mapping Shanghai

  for (var i = 0; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/);
    var lat = data[1];
    var lon = data[2];
    var mag = data[4];
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
    mag = pow( 10, mag / 2 );
    var magmax = sqrt(pow(10,10))
    // for scaling purposes we use map(), using it for magnitude here
    var d = map(mag, 0, magmax, 0, 60);
    stroke(255,0,255)
    //color
    fill(255,0,255,200);
    //fill at position of shape ellipse
    ellipse(x,y,d,d);
  }
}
