import { useState } from "react";

export default function useGeolocation() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<GeolocationPositionError | false | null>(
    null
  );

  function getPosition(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setError(false);
        reject(false);
      }

      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLoading(false);
          setError(null);
          const coordinates = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setPosition(coordinates);
          resolve(coordinates);
        },
        (error) => {
          setIsLoading(false);
          setPosition(null);
          setError(error);
          reject(error);
        }
      );
    });
  }

  return { isLoading, position, error, getPosition };
}
