import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IoMdPin } from "react-icons/io";
import { useState } from "react";
import useGeolocation from "../../hooks/location/useGeolocation";
import toast from "react-hot-toast";
import useReverseLocationLookup from "../../hooks/location/useReverseLocationLookup";
import { LatLng, Map } from "leaflet";
import { IconContext } from "react-icons";
import Spinner from "../../components/Spinner";
import { toAdministrativeString } from "../../utilities/addressUtils";
import { AddressCreateType, CoordinateType } from "../../type/addressType";
import { pick } from "lodash";

function AddressMap({
  defaultCoordinate = { latitude: -5.1342962, longitude: 119.4124282 },
  defaultZoom = 13,
  onSubmit,
  onSearchManually,
}: {
  defaultCoordinate?: CoordinateType;
  defaultZoom?: number;
  onSubmit: (
    location: Pick<
      AddressCreateType,
      | "latitude"
      | "longitude"
      | "village"
      | "district"
      | "city"
      | "province"
      | "country"
    >
  ) => void;
  onSearchManually?: () => void;
}) {
  const [coordinate, setCoordinate] =
    useState<CoordinateType>(defaultCoordinate);

  const { isLoading: geoIsLoading, getPosition } = useGeolocation();

  const { isLoading, location } = useReverseLocationLookup(coordinate);
  const { village, district, city } = location ?? {};
  const administrativeString = location ? toAdministrativeString(location) : "";

  async function handleGeolocate() {
    try {
      const { lat, lng } = await getPosition();
      setCoordinate({
        latitude: lat,
        longitude: lng,
      });
    } catch (e) {
      if (e instanceof GeolocationPositionError) toast.error(e.message);
      else if (e === false) toast.error("Geolocation is not supported");
      else toast.error("Error occurred, please try again");
    }
  }

  function handleMapDrag({ lat, lng }: { lat: number; lng: number }) {
    setCoordinate({ latitude: lat, longitude: lng });
  }

  function handleClick({ lat, lng }: { lat: number; lng: number }, map: Map) {
    setCoordinate({ latitude: lat, longitude: lng });
    map.setView({ lat, lng }, map.getZoom());
  }

  function handleSubmit() {
    if (location) {
      const administrativeAddress = pick(location, [
        "village",
        "district",
        "city",
        "province",
        "country",
      ]);
      onSubmit({ ...coordinate, ...administrativeAddress });
    }
  }

  return (
    <div>
      <button onClick={() => handleGeolocate()}>
        {geoIsLoading ? "Loading..." : "Use current position"}
      </button>

      <div style={{ width: "400px", height: "300px", position: "relative" }}>
        <MapContainer
          center={[coordinate.latitude, coordinate.longitude]}
          zoom={defaultZoom}
          scrollWheelZoom="center"
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DetectMapCenterChange onMove={handleMapDrag} />
          <DetectClick onClick={handleClick} />
        </MapContainer>
        <CenterIcon />
      </div>
      <div>
        {isLoading && <Spinner />}
        {!isLoading &&
          (!location ? (
            <p>Location cannot be determined, choose another coordinate</p>
          ) : (
            <>
              <h2>{village ?? district ?? city}</h2>
              <p>{administrativeString}</p>
            </>
          ))}
      </div>
      <button onClick={handleSubmit} disabled={isLoading || !location}>
        Select Location
      </button>
      {onSearchManually && (
        <button onClick={onSearchManually}>Enter address manually</button>
      )}
    </div>
  );
}

function CenterIcon() {
  return (
    <IconContext.Provider
      value={{
        style: {
          color: "aquamarine",
          // height: "45px",
          // width: "30px",
          fontSize: "40px",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -100%)",
          zIndex: 400,
        },
      }}
    >
      <IoMdPin />
    </IconContext.Provider>
  );
}

function DetectMapCenterChange({
  onMove,
}: {
  onMove: (coordinate: { lat: number; lng: number }) => void;
}) {
  useMapEvents({
    dragend: (e) => onMove(e.target.getCenter()),
    zoom: (e) => onMove(e.target.getCenter()),
  });
  return null;
}

function DetectClick({
  onClick,
}: {
  onClick: (coordinate: LatLng, map: Map) => void;
}) {
  const map = useMapEvents({ click: (e) => onClick(e.latlng, map) });
  return null;
}

export default AddressMap;
