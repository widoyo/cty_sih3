<template>
  <div id="map-container" style="height: 500px; width: 100%;"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's core CSS
import 'leaflet.fullscreen'; // This imports the JS part of the plugin
import 'leaflet.fullscreen/Control.FullScreen.css'; // This imports the CSS part of the plugin

// Import default Leaflet marker icons workaround for Webpack/Vite
// This is often needed because Leaflet's default icons rely on relative paths
// that get broken by bundlers.
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._get // eslint-disable-line no-underscore-dangle
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

let map = null;

onMounted(() => {
  // Initialize the map on the #map-container div
  map = L.map('map-container', {
    center: [-7.5583, 110.8202], // Example: Surakarta coordinates
    zoom: 13,
    fullscreenControl: true, // Enable the fullscreen control
    fullscreenControlOptions: {
      position: 'topleft', // Position the control
      title: 'View Fullscreen',
      titleCancel: 'Exit Fullscreen'
    }
  });

  // Add a tile layer (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Optional: Add a marker
  L.marker([-7.5583, 110.8202]).addTo(map)
    .bindPopup('Hello from Surakarta!')
    .openPopup();

  // Handle map events (e.g., fullscreen change)
  map.on('fullscreenchange', () => {
    if (map.isFullscreen()) {
      console.log('Map entered fullscreen');
    } else {
      console.log('Map exited fullscreen');
    }
    // In some cases, especially if you have custom sizing, you might need to
    // invalidate the map size after fullscreen changes to ensure it renders correctly.
    map.invalidateSize();
  });
});

onBeforeUnmount(() => {
  // Clean up the map instance when the component is unmounted
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<style scoped>
/* Ensure the map container takes up space */
#map-container {
  /* This height and width are for the embedded view.
     The fullscreen plugin will handle fullscreen dimensions. */
  height: 500px;
  width: 100%;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  z-index: 0; /* Ensure map is not hidden by other elements, adjust as needed */
}

/* Global styles for fullscreen to work correctly */
/* This ensures the map can expand to cover the entire viewport */
/* You might want to put this in a global CSS file or your VitePress theme's CSS */
:root {
  --vp-layout-max-width: 100%; /* Override VitePress default max-width for content */
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden; /* Prevent body scrollbars when map is fullscreen */
}

/* Specific styles for leaflet-fullscreen to ensure it takes full viewport */
/* The leaflet-fullscreen plugin adds .leaflet-pseudo-fullscreen to the map container */
/* when pseudoFullscreen is true, or uses native fullscreen. */
/* You might need to adjust these based on your VitePress theme's layout. */
.leaflet-container.leaflet-pseudo-fullscreen {
  position: fixed !important;
  width: 100vw !important;
  height: 100vh !important;
  left: 0 !important;
  top: 0 !important;
  z-index: 9999; /* Make sure the map is on top of other elements */
}

/* If you need to hide VitePress header/sidebar when fullscreen */
/* This is more advanced and might require modifying VitePress's default theme */
/* .my-custom-fullscreen-class body .VPHero,
.my-custom-fullscreen-class body .VPNavBar,
.my-custom-fullscreen-class body .VPSidebar,
.my-custom-fullscreen-class body .VPFooter {
  display: none;
} */
</style>