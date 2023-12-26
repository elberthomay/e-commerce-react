import { useState } from "react";
import { CoordinateType } from "../../type/addressType";
import SearchBar from "../../ui/SearchBar";
import useGeolocation from "../../hooks/location/useGeolocation";
import toast from "react-hot-toast";
import useDebouncedString from "../../hooks/useDebouncedString";
import useLocationQuerySearch from "../../hooks/location/useLocationQuerySearch";

function AddressSearch({
  onSubmit,
  onSearchManually,
}: {
  onSubmit: (coordinate: CoordinateType) => void;
  onSearchManually: () => void;
}) {
  const {
    debouncingString,
    resultString: searchQuery,
    setDebouncingString,
  } = useDebouncedString();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const { getPosition } = useGeolocation();
  const { isLoading: locationSearchIsLoading, locations } =
    useLocationQuerySearch(searchQuery);

  async function handleSubmit(coordinate: CoordinateType) {
    onSubmit(coordinate);
  }

  async function handleGeolocate() {
    try {
      const { lat, lng } = await getPosition();
      handleSubmit({ latitude: lat, longitude: lng });
    } catch (e) {
      if (e instanceof GeolocationPositionError) toast.error(e.message);
      else if (e === false) toast.error("Geolocation is not supported");
      else toast.error("Error occurred, please try again");
    }
  }

  return (
    <>
      <h2>Where's your address</h2>
      <SearchBar
        value={debouncingString}
        onChange={(e) => setDebouncingString(e.target.value)}
        onBlur={() => setDropdownOpen(false)}
        onFocus={() => setDropdownOpen(true)}
      />
      {(dropdownOpen ||
        locationSearchIsLoading ||
        (locations && locations.length > 0)) && (
        <div>
          <button onClick={handleGeolocate}>Use your current location</button>
          {locationSearchIsLoading && <p>Loading...</p>}
          {locations
            ?.slice(0, 4)
            .map(({ latitude, longitude, display_name }, i) => (
              <p
                key={i}
                onClick={() =>
                  handleSubmit({
                    latitude,
                    longitude,
                  })
                }
              >
                {display_name}
              </p>
            ))}
          <button onClick={onSearchManually}>
            Your address doesn't appear? Search manually
          </button>
        </div>
      )}
      {!dropdownOpen && (
        <button onClick={onSearchManually}>Search manually</button>
      )}
    </>
  );
}

export default AddressSearch;
