import axios from "axios";
import { useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useTokenContext } from "../../Context/TokenContext";
import Loading from "../ImageSearch/Loading";
import HospitalList from "./hospitalList";

const KakaoHospital = ({ list, onListUpdate }) => {
  const { kakao } = window;
  const { token } = useTokenContext();
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [coordinates, setCoordinates] = useState(null); // 현재 위치 위경도
  const [address, setAddress] = useState(null); // 위경도 > 주소 변환
  const [loading, setLoading] = useState(false); // 로딩 상태 확인
  const mapRef = useRef({ markers: [] });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleMarkerClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleCloseInfoWindow = () => {
    setSelectedHospital(null);
  };

  const sendCurrentLocationToServer = async (postData) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/hospitals/getCurrentLocationList",
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
        alert("위치 정보를 가져오는데 실패했습니다.");
      }
    );
  };

  return (
    <>
      <Map
        center={{ lat: 37.49796, lng: 127.02761 }}
        style={{ width: "450px", height: "450px", margin: "0 auto" }}
        level={7}
        ref={mapRef}
      >
        {list.map((hospital) => (
          <MapMarker
            key={hospital.hospitalId}
            position={{
              lat: hospital.hospitalLati,
              lng: hospital.hospitalLong,
            }}
            image={{
              src:
                hospital.partnershipStatus === "Y"
                  ? process.env.PUBLIC_URL + "/mintMarker.png"
                  : process.env.PUBLIC_URL + "/grayMarker.png",
              size: { width: 30, height: 30 },
            }}
            title={hospital.hospitalName}
            onClick={() => handleMarkerClick(hospital)}
          />
        ))}
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

        {selectedHospital && (
          <CustomOverlayMap
            position={{
              lat: selectedHospital.hospitalLati,
              lng: selectedHospital.hospitalLong,
            }}
            yAnchor={1.5}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <strong>
                  {selectedHospital.hospitalName} (
                  {selectedHospital.partnershipStatus === "Y"
                    ? "제휴병원"
                    : "일반병원"}
                  )
                </strong>
                <p>주소: {selectedHospital.hospitalAddrMain}</p>
                <a
                  href={`https://map.kakao.com/link/map/${selectedHospital.hospitalName},${selectedHospital.hospitalLati},${selectedHospital.hospitalLong}`}
                  style={{ color: "gray" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  큰지도보기
                </a>{" "}
                <a
                  href={`https://map.kakao.com/link/to/${selectedHospital.hospitalName},${selectedHospital.hospitalLati},${selectedHospital.hospitalLong}`}
                  style={{ color: "gray" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  길찾기
                </a>
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  cursor: "pointer",
                }}
                onClick={handleCloseInfoWindow}
              >
                X
              </span>
            </div>
          </CustomOverlayMap>
        )}
      </Map>
    </>
  );
};

export default KakaoHospital;
