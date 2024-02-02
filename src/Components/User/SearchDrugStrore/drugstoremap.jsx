import { useEffect, useRef, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer,
} from "react-kakao-maps-sdk";
import Loading from "../ImageSearch/Loading";
import axios from "axios";
import { useTokenContext } from "../../Context/TokenContext";
import useAlert from "../../Layout/Alert";
const KakaoDrugstore = ({ list, onListUpdate }) => {
  const { kakao } = window;
  const { token } = useTokenContext();
  const [selectedDrugstore, setSelectedDrugstore] = useState(null);
  const mapRef = useRef({ markers: [] });
  const { Alert } = useAlert();
  const [coordinates, setCoordinates] = useState(null); // 현재 위치 위경도
  const [address, setAddress] = useState(null); // 위경도 > 주소 변환
  const [loading, setLoading] = useState(false); // 로딩 상태 확인
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleMarkerClick = (drugstore) => {
    setSelectedDrugstore(drugstore);
  };

  const handleCloseInfoWindow = () => {
    setSelectedDrugstore(null);
  };

  const sendCurrentLocationToServer = async (postData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/drugstores/getCurrentLocationList",
        postData,
        config
      );

      onListUpdate(response.data); // 리스트 업데이트
    } catch (error) {
      console.error("Error sending location to server:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const currentPosition = new kakao.maps.LatLng(latitude, longitude);

        // 기존 마커 제거
        if (mapRef.current.markers) {
          mapRef.current.markers.forEach((marker) => marker.setMap(null));
        }

        // 마커 생성 및 지도 이동
        const marker = new kakao.maps.Marker({
          position: currentPosition,
        });
        marker.setMap(mapRef.current);
        mapRef.current.panTo(currentPosition);

        // 좌표 업데이트
        setCoordinates({
          center: {
            lat: currentPosition.getLat(),
            lng: currentPosition.getLng(),
          },
        });
        // 좌표를 주소로 변환
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2Address(longitude, latitude, async (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            // 서버에 주소 일부 정보 전송
            const addressParts = result[0].address.address_name.split(" ");
            const postData = {
              addr1: addressParts[0],
              addr2: addressParts[1],
            };

            await sendCurrentLocationToServer(postData);
          }
        });
      },
      (error) => {
        Alert("", "위치 정보를 가져오는데 실패했습니다.", "error");
      }
    );
  };

  return (
    <>
      <Map
        center={{ lat: 36.49796, lng: 127.62761 }}
        style={{ width: "450px", height: "450px", margin: "0 auto" }}
        level={13}
        ref={mapRef}
      >
        <MarkerClusterer
          options={{
            averageCenter: true,
            minLevel: 10,
          }}
        >
          {list.map((drugstore) => (
            <MapMarker
              key={drugstore.drugstoreId}
              position={{
                lat: drugstore.drugstoreLati,
                lng: drugstore.drugstoreLong,
              }}
              image={{
                src: process.env.PUBLIC_URL + "/mintMarker.png",
                size: { width: 30, height: 30 },
              }}
              title={drugstore.drugstoreName}
              onClick={() => handleMarkerClick(drugstore)}
            />
          ))}
        </MarkerClusterer>

        <button className="currentLocBtn" onClick={getCurrentLocation}>
          현재 내 위치
        </button>

        {address && (
          <div>
            현재 위치의 주소는..
            <p>{address}</p>
            <p>{address.split(" ")[0]}</p>
            <p>{address.split(" ")[1]}</p>
          </div>
        )}

        {selectedDrugstore && (
          <CustomOverlayMap
            position={{
              lat: selectedDrugstore.drugstoreLati,
              lng: selectedDrugstore.drugstoreLong,
            }}
            yAnchor={1.5}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 생략 */}
          </CustomOverlayMap>
        )}
      </Map>
    </>
  );
};

export default KakaoDrugstore;
