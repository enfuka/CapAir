import React from "react";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import Marker from "./marker";

export default function SimpleMap({ marks }) {
  let airports = [
    {
      id: "JFK",
      city: "New York",
      state: "NY",
      name: "John F. Kennedy International Airport",
      gate_count: 131,
      latitude: 40.641766,
      longitude: -73.780968,
      timezone: "America/New_York",
      minCap: 85,
      maxCap: 86,
    },
    {
      id: "BOS",
      city: "Boston",
      state: "MA",
      name: "General Edward Lawrence Logan International Airport",
      gate_count: 94,
      latitude: 42.366978,
      longitude: -71.022362,
      timezone: "America/New_York",
      minCap: 116,
      maxCap: 125,
    },
    {
      id: "LAX",
      city: "Los Angeles",
      state: "CA",
      name: "Los Angeles International Airport",
      gate_count: 146,
      latitude: 33.942791,
      longitude: -118.410042,
      timezone: "America/Los_Angeles",
      minCap: 134,
      maxCap: 143,
    },
    {
      id: "MSP",
      city: "Minneapolis",
      state: "MN",
      name: "Minneapolis-Saint Paul International Airport",
      gate_count: 131,
      latitude: 44.8848,
      longitude: -93.2223,
      timezone: "America/Chicago",
      minCap: 114,
      maxCap: 141,
    },
    {
      id: "ATL",
      city: "Atlanta",
      state: "GA",
      name: "Hartsfield-Jackson Atlanta International Airport",
      gate_count: 195,
      latitude: 33.640411,
      longitude: -84.419853,
      timezone: "America/New_York",
      minCap: 182,
      maxCap: 186,
    },
    {
      id: "DEN",
      city: "Denver",
      state: "CO",
      name: "Denver International Airport",
      gate_count: 116,
      latitude: 39.8561,
      longitude: -104.6737,
      timezone: "America/Denver",
      minCap: 262,
      maxCap: 266,
    },
    {
      id: "SFO",
      city: "San Francisco",
      state: "CA",
      name: "San Francisco International Airport",
      gate_count: 115,
      latitude: 37.6213,
      longitude: -122.379,
      timezone: "America/Los_Angeles",
      minCap: 56,
      maxCap: 57,
    },
    {
      id: "DFW",
      city: "Dallas & Ft. Worth",
      state: "TX",
      name: "Dallas/Fort Worth International Airport",
      gate_count: 184,
      latitude: 32.89748,
      longitude: -97.040443,
      timezone: "America/Chicago",
      minCap: 168,
      maxCap: 170,
    },
    {
      id: "MCO",
      city: "Orlando",
      state: "FL",
      name: "Orlando International Airport",
      gate_count: 93,
      latitude: 28.4179,
      longitude: -81.3041,
      timezone: "America/New_York",
      minCap: 144,
      maxCap: 144,
    },
    {
      id: "ORD",
      city: "Chicago",
      state: "IL",
      name: "O'Hare International Airport",
      gate_count: 191,
      latitude: 41.978611,
      longitude: -87.904724,
      timezone: "America/Chicago",
      minCap: 214,
      maxCap: 223,
    },
    {
      id: "PHX",
      city: "Phoenix",
      state: "AZ",
      name: "Phoenix Sky Harbor International Airport",
      gate_count: 85,
      latitude: 33.4352,
      longitude: -112.0101,
      timezone: "America/Denver",
      minCap: 96,
      maxCap: 101,
    },
    {
      id: "MIA",
      city: "Miami",
      state: "FL",
      name: "Miami International Airport",
      gate_count: 131,
      latitude: 25.7959,
      longitude: -80.2871,
      timezone: "America/New_York",
      minCap: 100,
      maxCap: 104,
    },
    {
      id: "IAH",
      city: "Houston",
      state: "TX",
      name: "George Bush Intercontinental Airport",
      gate_count: 161,
      latitude: 29.9902,
      longitude: -95.3368,
      timezone: "America/Chicago",
      minCap: 144,
      maxCap: 151,
    },
    {
      id: "SEA",
      city: "Seattle",
      state: "WA",
      name: "Seattle-Tacoma International Airport",
      gate_count: 103,
      latitude: 47.443546,
      longitude: -122.301659,
      timezone: "America/Los_Angeles",
      minCap: 95,
      maxCap: 96,
    },
    {
      id: "LAS",
      city: "Las Vegas",
      state: "NV",
      name: "Harry Reid International Airport",
      gate_count: 92,
      latitude: 36.084,
      longitude: -115.1537,
      timezone: "America/Los_Angeles",
      minCap: 105,
      maxCap: 106,
    },
    {
      id: "FLL",
      city: "Fort Lauderdale",
      state: "FL",
      name: "Fort Lauderdale-Hollywood International Airport",
      gate_count: 66,
      latitude: 26.0742,
      longitude: -80.1506,
      timezone: "America/New_York",
      minCap: 102,
      maxCap: 104,
    },
    {
      id: "CLT",
      city: "Charlotte",
      state: "NC",
      name: "Charlotte Douglas International Airport",
      gate_count: 114,
      latitude: 35.21389,
      longitude: -80.943054,
      timezone: "America/New_York",
      minCap: 135,
      maxCap: 140,
    },
    {
      id: "EWR",
      city: "Newark",
      state: "NJ",
      name: "Newark Liberty International Airport",
      gate_count: 121,
      latitude: 40.6895,
      longitude: -74.1745,
      timezone: "America/New_York",
      minCap: 68,
      maxCap: 70,
    },
    {
      id: "DTW",
      city: "Detroit",
      state: "MI",
      name: "Detroit Metropolitan Airport",
      gate_count: 129,
      latitude: 42.2162,
      longitude: -83.3554,
      timezone: "America/New_York",
      minCap: 125,
      maxCap: 125,
    },
    {
      id: "SLC",
      city: "Salt Lake City",
      state: "UT",
      name: "Salt Lake City International Airport",
      gate_count: 66,
      latitude: 40.7899,
      longitude: -111.9791,
      timezone: "America/Denver",
      minCap: 114,
      maxCap: 120,
    },
    {
      id: "PHL",
      city: "Philadelphia",
      state: "PA",
      name: "Philadelphia International Airport",
      gate_count: 126,
      latitude: 39.8729,
      longitude: -75.2437,
      timezone: "America/New_York",
      minCap: 84,
      maxCap: 88,
    },
    {
      id: "BWI",
      city: "Baltimore",
      state: "MD",
      name: "Baltimore/Washington International Airport",
      gate_count: 77,
      latitude: 39.1774,
      longitude: -76.6684,
      timezone: "America/New_York",
      minCap: 64,
      maxCap: 66,
    },
    {
      id: "TPA",
      city: "Tampa Bay",
      state: "FL",
      name: "Tampa International Airport",
      gate_count: 60,
      latitude: 27.979168,
      longitude: -82.539337,
      timezone: "America/New_York",
      minCap: 90,
      maxCap: 95,
    },
    {
      id: "SAN",
      city: "San Diego",
      state: "CA",
      name: "San Diego International Airport",
      gate_count: 51,
      latitude: 32.732346,
      longitude: -117.196053,
      timezone: "America/Los_Angeles",
      minCap: 48,
      maxCap: 52,
    },
    {
      id: "BNA",
      city: "Nashville",
      state: "TN",
      name: "Nashville International Airport",
      gate_count: 42,
      latitude: 36.131687,
      longitude: -86.668823,
      timezone: "America/Chicago",
      minCap: 60,
      maxCap: 62,
    },
    {
      id: "IAD",
      city: "Dulles",
      state: "VA",
      name: "Washington Dulles International Airport",
      gate_count: 135,
      latitude: 38.9531,
      longitude: -77.4565,
      timezone: "America/New_York",
      minCap: 118,
      maxCap: 120,
    },
  ];
  const [markers, setMarkers] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  const getMapBounds = (map, maps, marks) => {
    const bounds = new maps.LatLngBounds();

    marks.forEach((marks) => {
      bounds.extend(
        new maps.LatLng(
          getAirportCorrdinates(marks.label).lat,
          getAirportCorrdinates(marks.label).lng
        )
      );
    });
    return bounds;
  };

  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, "idle", () => {
      maps.event.addDomListener(window, "resize", () => {
        map.fitBounds(bounds);
      });
    });
  };

  const getAirportCorrdinates = (id) => {
    let airport = airports.filter((airport) => airport.id === id);
    return { lat: airport[0].latitude, lng: airport[0].longitude };
  };

  const handleApiLoaded = (map, maps) => {
    let markers = [];
    let coordinates = [];
    map.setOptions({ disableDefaultUI: true });
    map.setMapTypeId("roadmap");
    marks.forEach((mark) => {
      let location = getAirportCorrdinates(mark.label);
      markers.push(
        new maps.Marker({
          position: location,
          label: mark.label,
        })
      );
      coordinates.push(location);
    });
    setMarkers(markers);
    setCoordinates(coordinates);
    // Get bounds by our marks
    const bounds = getMapBounds(map, maps, marks);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);

    const lineSymbol = {
      path: "M 9.5 14 V 12 L 1.5 7 V 1.5 C 1.5 0.67 0.83 0 0 0 S -1.5 0.67 -1.5 1.5 V 7 L -9.5 12 V 14 L -1.5 11.5 V 17 L -3.5 18.5 V 20 L 0 19 L 3.5 20 V 18.5 L 1.5 17 V 11.5 L 9.5 14 Z",
      scale: 1,
      strokeColor: "#003865",
      fillColor: "#003865",
      fillOpacity: 1,
    };

    var line = new maps.Polyline({
      path: coordinates,
      icons: [
        {
          icon: lineSymbol,
          offset: "100%",
        },
      ],
      geodesic: true,
      strokeColor: "#FDDA24",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    line.setMap(map);
    animateCircle(line);
  };

  function animateCircle(line) {
    let count = 0;

    window.setInterval(() => {
      count = (count + 1) % 300;
      const icons = line.get("icons");

      icons[0].offset = count / 3 + "%";
      line.set("icons", icons);
    }, 20);
  }

  const defaultProps = {
    center: {
      lat: 37.5407,
      lng: -77.436,
    },
    zoom: 5,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100%", width: "385px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {markers.map((mark) => {
          let location = getAirportCorrdinates(mark.label);
          return (
            <Marker
              key={mark.label}
              lat={location.lat}
              lng={location.lng}
              text={mark.label}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
