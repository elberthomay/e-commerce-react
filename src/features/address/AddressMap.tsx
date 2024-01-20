import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IoMdPin } from "react-icons/io";
import { MdChevronRight } from "react-icons/md";
import { useRef, useState } from "react";
import useGeolocation from "../../hooks/location/useGeolocation";
import toast from "react-hot-toast";
import useReverseLocationLookup from "../../hooks/location/useReverseLocationLookup";
import { LatLng, Map } from "leaflet";
import Spinner from "../../components/Spinner";
import { toAdministrativeString } from "../../utilities/addressUtils";
import { AddressCreateType, CoordinateType } from "../../type/addressType";
import { pick } from "lodash";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Button from "../../ui/Button";

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

  const { isLoading, location } = useReverseLocationLookup(coordinate);
  const mapRef = useRef<Map | null>(null);
  const { village, district, city } = location ?? {};
  const administrativeString = location ? toAdministrativeString(location) : "";

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
    <div className="flex flex-col gap-4">
      <div className="px-8 max-h-[calc(90vh-20rem)] overflow-y-auto">
        <h2 className="text-lg font-bold mb-3">Pinpoint your location</h2>
        <div className="relative w-full h-60">
          <MapContainer
            center={[coordinate.latitude, coordinate.longitude]}
            zoom={defaultZoom}
            scrollWheelZoom="center"
            className="h-full w-full"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DetectMapCenterChange onMove={handleMapDrag} />
            <DetectClick onClick={handleClick} />
            <IoMdPin className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[100%] h-10 w-10 text-governor-bay-600 z-[400]" />
            <MapEscapeHatch mapRef={mapRef} />
          </MapContainer>
          <LocationButton
            mapRef={mapRef}
            onGeolocate={({ lat, lng }) =>
              setCoordinate({
                latitude: lat,
                longitude: lng,
              })
            }
          />
        </div>

        <div className="p-4">
          {isLoading && <Spinner />}
          {!isLoading &&
            (!location ? (
              <p>
                Location cannot be determined, please choose another coordinate
              </p>
            ) : (
              <>
                <h2 className="font-bold text-lg">
                  {village ?? district ?? city}
                </h2>
                <p className="text-sm text-slate-500">{administrativeString}</p>
              </>
            ))}
        </div>
      </div>
      <div className="px-8 flex justify-between">
        {location && onSearchManually && (
          <button
            className="flex gap-1 items-center text-slate-500"
            onClick={onSearchManually}
          >
            Enter address manually
            <MdChevronRight className="h-6 w-6 text-black" />
          </button>
        )}
        <Button
          className="px-3 ml-auto"
          onClick={
            !location && onSearchManually ? onSearchManually : handleSubmit
          }
          disabled={isLoading || (!location && !onSearchManually)}
        >
          {!isLoading && !location && onSearchManually
            ? "Input Address Manually"
            : "Select Location"}
        </Button>
      </div>
    </div>
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
  const map = useMapEvents({
    click: (e) => {
      onClick(e.latlng, map);
    },
  });
  return null;
}

function LocationButton({
  mapRef,
  onGeolocate,
}: {
  mapRef: React.MutableRefObject<Map | null>;
  onGeolocate: (coordinate: { lat: number; lng: number }) => void;
}) {
  const { isLoading: geoIsLoading, getPosition } = useGeolocation();

  async function handleGeolocate() {
    try {
      const coordinate = await getPosition();
      onGeolocate(coordinate);
      mapRef.current?.setView(coordinate, mapRef.current?.getZoom());
    } catch (e) {
      if (e instanceof GeolocationPositionError) toast.error(e.message);
      else if (e === false) toast.error("Geolocation is not supported");
      else toast.error("Error occurred, please try again");
    }
  }

  return (
    <button
      className="absolute left-3 bottom-3 flex items-center gap-2 p-2 rounded-full text-slate-800 bg-slate-100 border border-slate-300 z-[400]"
      onClick={() => handleGeolocate()}
    >
      {geoIsLoading ? (
        "Loading..."
      ) : (
        <>
          <FaLocationCrosshairs className="h-4 w-4" />
          <span>Use current position</span>
        </>
      )}
    </button>
  );
}

function MapEscapeHatch(props: { mapRef: React.MutableRefObject<Map | null> }) {
  const map = useMap();
  props.mapRef.current = map;
  return null;
}

export default AddressMap;
