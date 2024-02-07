import { ButtonHTMLAttributes, useCallback, useRef, useState } from "react";
import { CoordinateType } from "../../type/addressType";
import SearchBar from "../../ui/SearchBar";
import useGeolocation from "../../hooks/location/useGeolocation";
import toast from "react-hot-toast";
import useDebouncedString from "../../hooks/useDebouncedString";
import useLocationQuerySearch from "../../hooks/location/useLocationQuerySearch";
import { FaLocationCrosshairs } from "react-icons/fa6";
import useOutsideClickEvent from "../../hooks/useOutsideClickEvent";
import { twMerge } from "tailwind-merge";
import { LuMapPin } from "react-icons/lu";

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
  const [inputFocused, setInputFocused] = useState<boolean>(true);

  const handleCloseDropdown = useCallback(() => setInputFocused(false), []);
  const wrapperRef = useRef(null);
  useOutsideClickEvent(wrapperRef, handleCloseDropdown);

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

  const locationsNotEmpty = locations && locations.length > 0;
  const dropdownIsOpen = inputFocused || locationsNotEmpty;

  return (
    <div className="px-8 flex flex-col gap-4 items-start">
      <p className="text-xl font-bold text-center">Select your address</p>
      <div className="max-w-[32rem] w-full" ref={wrapperRef}>
        <SearchBar.Box className={"w-full py-0.5"}>
          <SearchBar.Icon />
          <SearchBar.Input
            value={debouncingString}
            onChange={(e) => setDebouncingString(e.target.value)}
            onFocus={() => setInputFocused(true)}
          />
        </SearchBar.Box>
        {dropdownIsOpen && (
          <div className="flex flex-col w-full border border-slate-300 rounded-lg justify-start *:border-b *:border-slate-300">
            <button
              className="p-3 pl-5 flex items-center gap-3"
              onClick={handleGeolocate}
              tabIndex={-1}
            >
              <FaLocationCrosshairs className="h-5 w-5 text-slate-500" />
              Use your current location
            </button>
            <button
              className="p-3 pl-5 text-slate-500 text-left"
              onClick={onSearchManually}
              tabIndex={-1}
            >
              Your address doesn't appear? Search manually
            </button>
            {locationSearchIsLoading && (
              <div className="p-3 text-slate-500">Loading...</div>
            )}

            {locationsNotEmpty && (
              <div className="p-3 max-h-40 overflow-y-auto">
                {locations.map(({ latitude, longitude, display_name }, i) => (
                  <LocationItem
                    key={i}
                    onClick={() =>
                      handleSubmit({
                        latitude,
                        longitude,
                      })
                    }
                  >
                    {display_name}
                  </LocationItem>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {!dropdownIsOpen && (
        <button className=" text-slate-500" onClick={onSearchManually}>
          Can't find your address? Search manually
        </button>
      )}
    </div>
  );
}

function LocationItem(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={twMerge(
        "p-3 flex justify-start items-center gap-3",
        props.className
      )}
    >
      <LuMapPin className="h-5 w-5 flex-shrink-0 text-slate-800" />
      <span className=" text-left line-clamp-2 text-ellipsis">
        {props.children}
      </span>
    </button>
  );
}

export default AddressSearch;
