import { useEffect, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer,
} from "react-kakao-maps-sdk";

const Kakao = ({ list }) => {
  const [selectedHospital, setSelectedHospital] = useState(null);

  const handleMarkerClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleCloseInfoWindow = () => {
    setSelectedHospital(null);
  };

  return (
    <>
      <Map
        center={{ lat: 35.87345, lng: 128.82198 }}
        style={{ width: "450px", height: "450px", margin: "0 auto" }}
        level={3}
      >
        <MarkerClusterer
          options={{
            averageCenter: true,
            minLevel: 10,
          }}
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
        </MarkerClusterer>

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

export default Kakao;
