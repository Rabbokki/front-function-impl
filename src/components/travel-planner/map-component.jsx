// src/components/travel-planner/Map-component.jsx
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function MapComponent({
  center,
  zoom = 13,
  markers = [],
  onMarkerClick,
  height = '100%',
}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [googleMarkers, setGoogleMarkers] = useState({});

  useEffect(() => {
    console.log('API Key:', process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
        libraries: ['places'],
      });

      try {
        const google = await loader.load();
        console.log('Google Maps loaded successfully');
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }],
              },
              {
                featureType: 'transit',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }],
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
              },
            ],
          });
          setMap(mapInstance);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    if (!map) {
      initMap();
    }
  }, [map]);

  useEffect(() => {
    if (!map) return;

    Object.values(googleMarkers).forEach((marker) => {
      marker.setMap(null);
    });

    const newGoogleMarkers = {};

    markers.forEach((marker) => {
      const googleMarker = new window.google.maps.Marker({
        position: marker.position,
        map,
        title: marker.title,
        icon: marker.selected
          ? {
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new window.google.maps.Size(50, 50),
            }
          : {
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new window.google.maps.Size(40, 40),
            },
        animation: marker.selected ? window.google.maps.Animation.BOUNCE : null,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 200px;">
            <strong>${marker.title}</strong>
            <p style="margin: 4px 0 0;">클릭하여 선택</p>
          </div>`,
      });

      googleMarker.addListener('mouseover', () =>
        infoWindow.open(map, googleMarker)
      );
      googleMarker.addListener('mouseout', () => infoWindow.close());
      if (onMarkerClick) {
        googleMarker.addListener('click', () => onMarkerClick(marker.id));
      }

      newGoogleMarkers[marker.id] = googleMarker;
    });

    setGoogleMarkers(newGoogleMarkers);

    if (markers.length > 0) {
      if (markers.length === 1) {
        map.setCenter(markers[0].position);
        map.setZoom(15);
      } else {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach((marker) => bounds.extend(marker.position));
        map.fitBounds(bounds);
      }
    }

    return () => {
      Object.values(newGoogleMarkers).forEach((marker) => marker.setMap(null));
    };
  }, [map, markers, onMarkerClick]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height }}
      className="rounded-lg"
    />
  );
}