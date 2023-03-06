import { useEffect, useState } from 'react';

import { convertUFTo2Letters } from '../../helpers';

interface AddressDataProps {
  address: {
    country_code: string;
    state: string;
    city: string;
  };
}

export interface UserLocationProps {
  country: string;
  uf: string;
  city: string;
}

export const useUserLocation = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [userLocation, setUserLocation] = useState<UserLocationProps>(
    {} as UserLocationProps,
  );
  const [isLoading, setIsLoading] = useState(false);

  function userClickToGetLocation() {
    setIsLoading(true);
    navigator.geolocation.watchPosition(handleSuccess, handleError);
  }

  function handleSuccess(position: GeolocationPosition) {
    const { latitude, longitude } = position.coords;
    setLatitude(latitude);
    setLongitude(longitude);
  }

  function handleError(error: GeolocationPositionError) {
    console.error(error);
  }

  function getUserAddress() {
    try {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      )
        .then((response) => response.json())
        .then((data: AddressDataProps) => {
          const { address } = data;
          const uf = convertUFTo2Letters(address.state);

          localStorage.setItem('userCountry', address.country_code.toUpperCase());
          localStorage.setItem('userUf', uf);
          localStorage.setItem('userCity', address.city);

          setUserLocation({
            country: address.country_code.toUpperCase(),
            uf,
            city: address.city,
          });

          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const userCountry = localStorage.getItem('userCountry');
    const userUf = localStorage.getItem('userUf');
    const userCity = localStorage.getItem('userCity');

    if (userUf && userCity && userCountry) {
      setUserLocation({
        country: userCountry,
        uf: userUf,
        city: userCity,
      });

      setIsLoading(false);
    }

    if (latitude !== 0 && longitude !== 0) {
      getUserAddress();
      setIsLoading(false);
    }
  }, [latitude, longitude]);

  return {
    userLocation,
    latitude,
    longitude,
    isLoading,
    userClickToGetLocation,
  };
};
