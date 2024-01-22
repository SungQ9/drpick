import { useEffect, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer,
} from "react-kakao-maps-sdk";

const KakaoDrugstore = ({ list }) => {
  const [selectedDrugstore, setSelectedDrugstore] = useState(null);

  const handleMarkerClick = (drugstore) => {
    setSelectedDrugstore(drugstore);
  };

  const handleCloseInfoWindow = () => {
    setSelectedDrugstore(null);
  };

  return (
    <>
      <Map
        center={{ lat: 36.49796, lng: 127.62761 }}
        style={{ width: "450px", height: "450px", margin: "0 auto" }}
        level={13}
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

        {selectedDrugstore && (
          <CustomOverlayMap
            position={{
              lat: selectedDrugstore.drugstoreLati,
              lng: selectedDrugstore.drugstoreLong,
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
                <strong>{selectedDrugstore.drugstoreName}</strong>
                <p>주소: {selectedDrugstore.drugstoreAddrMain}</p>
                <a
                  href={`https://map.kakao.com/link/map/${selectedDrugstore.drugstoreName},${selectedDrugstore.drugstoreLati},${selectedDrugstore.drugstoreLong}`}
                  style={{ color: "gray" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  큰지도보기
                </a>{" "}
                <a
                  href={`https://map.kakao.com/link/to/${selectedDrugstore.drugstoreName},${selectedDrugstore.drugstoreLati},${selectedDrugstore.drugstoreLong}`}
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

export default KakaoDrugstore;
