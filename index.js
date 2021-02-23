import 'ol/ol.css';
import {Map, View} from 'ol';
import MousePosition from 'ol/control/MousePosition';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {createStringXY} from 'ol/coordinate';
import {defaults as defaultControls} from 'ol/control';
import {fromLonLat} from 'ol/proj';

var mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  // comment the following two lines to have the mouse position
  // be placed within the map.
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;',
});

var map = new Map({
  controls: defaultControls().extend([mousePositionControl]),
  layers: [
    new TileLayer({
      source: new OSM(),
    }) ],
  target: 'map',
  view: new View({
    maxZoom: 25,
    center: fromLonLat([-75.1652,39.9526]), // Philadelphia
    zoom: 9,
  }),
});

var projectionSelect = document.getElementById('projection');
projectionSelect.addEventListener('change', function (event) {
  mousePositionControl.setProjection(event.target.value);
});

var precisionInput = document.getElementById('precision');
precisionInput.addEventListener('change', function (event) {
  var format = createStringXY(event.target.valueAsNumber);
  mousePositionControl.setCoordinateFormat(format);
});
