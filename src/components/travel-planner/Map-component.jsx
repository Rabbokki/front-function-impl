// src/components/travel-planner/Map-component.jsx
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { toast } from 'react-toastify';

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
        libraries: ['places', 'marker'],
      });

      try {
        if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
          console.error('Google Maps API Key is missing');
          toast.error('Google Maps API 키가 설정되지 않았습니다.');
          return;
        }

        const google = await loader.load();
        console.log('Google Maps loaded successfully');

        if (!google.maps.marker) {
          console.error('Google Maps Marker library not loaded');
          toast.error('Google Maps Marker 라이브러리 로드 실패');
          return;
        }

        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapId: process.env.REACT_APP_GOOGLE_MAPS_MAP_ID || 'DEFAULT_MAP_ID',
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
        toast.error('Google Maps 로드 중 오류 발생: ' + error.message);
      }
    };

    if (!map) {
      initMap();
    }
  }, [map]);

  useEffect(() => {
    if (!map || !window.google?.maps?.marker) return;

    Object.values(googleMarkers).forEach((marker) => {
      marker.setMap(null);
    });

    const newGoogleMarkers = {};

    markers.forEach((marker) => {
      if (!marker.position || !marker.position.lat || !marker.position.lng) {
        console.warn('Invalid marker position:', marker);
        return;
      }

      const markerContent = document.createElement('div');
      markerContent.style.width = marker.selected ? '30px' : '24px';
      markerContent.style.height = marker.selected ? '30px' : '24px';
      markerContent.style.backgroundColor = marker.selected ? '#FF0000' : '#0000FF';
      markerContent.style.borderRadius = '50%';
      markerContent.style.border = '2px solid #FFFFFF';
      markerContent.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      if (marker.selected) {
        markerContent.style.animation = 'bounce 1s infinite';
      }

      const googleMarker = new window.google.maps.marker.AdvancedMarkerElement({
        position: marker.position,
        map,
        title: marker.title || 'Unknown',
        content: markerContent,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 200px;">
            <strong>${marker.title || 'Unknown'}</strong>
            <p style="margin: 4px 0 0;">클릭하여 선택</p>
          </div>`,
      });

      googleMarker.addListener('gmp-click', () => {
        if (onMarkerClick) {
          onMarkerClick(marker.id);
        }
        infoWindow.open(map, googleMarker);
      });
      googleMarker.addListener('mouseover', () => infoWindow.open(map, googleMarker));
      googleMarker.addListener('mouseout', () => infoWindow.close());

      newGoogleMarkers[marker.id] = googleMarker;
    });

    setGoogleMarkers(newGoogleMarkers);

    if (markers.length > 0) {
      if (markers.length === 1) {
        map.setCenter(markers[0].position);
        map.setZoom(15);
      } else {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach((marker) => {
          if (marker.position) bounds.extend(marker.position);
        });
        map.fitBounds(bounds);
      }
    }

    return () => {
      Object.values(newGoogleMarkers).forEach((marker) => marker.setMap(null));
    };
  }, [map, markers, onMarkerClick]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div ref={mapRef} style={{ width: '100%', height }} className="rounded-lg" />
  );
}