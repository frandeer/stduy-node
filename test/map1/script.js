const options = {
  key: 'aUOUpj3ojilJ2ItPzzcq27iweuXFtW7a', // REPLACE WITH YOUR KEY !!!
  lat: 37,
  lon: 127,
  zoom: 7,
};

const weatherApiKey = '25f0abf70ab6c540eac5865f23babb16';

const fetchWeather = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return `${data.name}, 온도: ${data.main.temp}`; // 날씨 정보에서 도시 이름과 기온만 반환
  } catch (error) {
    console.error(`Error fetching weather: ${error.message}`);
    return '날씨 정보를 가져올 수 없습니다';
  }
};

// 팝업에 날씨 정보 표시
const showWeatherOnPopup = async (marker, lat, lon) => {
  const weatherInfo = await fetchWeather(lat, lon);
  marker.bindPopup(weatherInfo); // 팝업에 날씨 정보 표시
};

// 현재 위치를 얻어와서 지도에 표시하는 함수
const showCurrentLocation = (map) => {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
    return;
  }

  // 현재 위치를 성공적으로 얻었을 때 호출되는 함수
  const onLocationFound = (e) => {
    const radius = e.accuracy / 2; // 정확도 반경

    const iconDot = L.divIcon({
      className: "icon-dot",
      html: '<div class="pulsating-icon"></div>',
      iconSize: [10, 10],
      iconAnchor: [5, 5]
    })

    // 현재 위치 마커 생성
    const locationMarker = L.divIcon({
      className: "icon-dot mylocation",
      html: '<div class="pulsating-icon repeat"></div>',
      iconSize: [10, 10],
      iconAnchor: [5, 5]
    })

    const pulsatingIcon = L.divIcon({
      className: "icon-dot",
      html: '<div class="pulsating-icon repeat"></div>',
      iconSize: [10, 10],
      iconAnchor: [5, 5]
    })

    // 현재 위치에 마커 추가

    // L.marker(e.latlng, { icon: iconDot }).addTo(map);
    // L.marker(e.latlng, { icon: pulsatingIcon }).addTo(map);
    L.marker(e.latlng, { icon: locationMarker }).addTo(map);
  };

  // 현재 위치를 얻는 함수 호출
  navigator.geolocation.getCurrentPosition((position) => {
    onLocationFound({
      latlng: L.latLng(position.coords.latitude, position.coords.longitude),
      accuracy: position.coords.accuracy
    });
  }, () => {
    console.log("Unable to retrieve your location");
  });
};

windyInit(options, windyAPI => {

  const { picker, utils, broadcast, store, map } = windyAPI;

  picker.on('pickerOpened', ({ lat, lon, values, overlay }) => {
    // -> 48.4, 14.3, [ U,V, ], 'wind'
    console.log('opened', lat, lon, values, overlay);

    const windObject = utils.wind2obj(values);
    console.log(windObject);
  });

  picker.on('pickerMoved', ({ lat, lon, values, overlay }) => {
    // picker was dragged by user to latLon coords
    console.log('moved', lat, lon, values, overlay);
  });

  picker.on('pickerClosed', () => {
    // picker was closed
  });

  store.on('pickerLocation', ({ lat, lon }) => {
    console.log(lat, lon);

    const { values, overlay } = picker.getParams();
    console.log('location changed', lat, lon, values, overlay);
  });

  // Wait since wather is rendered
  broadcast.once('redrawFinished', () => {
    // Opening of a picker (async)
    picker.open({ lat: 35.1595, lon: 126.8526 });
  });



  const createHtmlMarker = (cityName, temp) => {
    // HTML 마커 컨텐츠
    const markerHtml = `
    <div style="background-color: #f2f2f2bb; border-radius: 10px; padding: 5px; border: 1px solid #333; font-family: Arial, sans-serif; width:100%; display: inline-block">
      <div style="font-size: 14px; font-weight: bold; color: #333;">${cityName}</div>
      <hr style="margin: 2px 0; border-top: 0.5px solid #333;">
      <div style="font-size: 14px; color: #333;">온도: ${temp}°C</div>
    </div>
  `;

    // Leaflet의 DivIcon을 사용하여 HTML 마커 생성
    return L.divIcon({
      className: '', // 기본 클래스 이름을 비워둠으로써 Leaflet 스타일 제거
      html: markerHtml,
      iconSize: L.point(120, 60),
      iconAnchor: [75, 30],
      popupAnchor: [0, -30],
    });
  };

  // 서울, 제주도, 광주의 좌표
  const locations = [
    { name: '서울', lat: 37.5665, lon: 126.9780 },
    { name: '제주도', lat: 33.4890, lon: 126.4983 },
    // { name: '광주', lat: 35.1595, lon: 126.8526 }
  ];

  locations.forEach(location => {
    fetchWeather(location.lat, location.lon).then(weatherInfo => {
      const temp = weatherInfo.split(", ")[1].split(": ")[1]; // "온도: XX°C" 부분을 추출
      const markerIcon = createHtmlMarker(location.name, temp);

      L.marker([location.lat, location.lon], { icon: markerIcon }).addTo(map);
    });
  });

  // 지도 초기화 후 현재 위치 표시 함수 호출
  // const map = L.map('map').setView([latitude, longitude], zoomLevel); // 이 부분은 지도 초기화에 맞게 수정해야 함
  showCurrentLocation(map);

  map.on('zoom', updateIconStyle);
  map.on('zoomend', updateIconStyle);
  map.on('viewreset', updateIconStyle);
});