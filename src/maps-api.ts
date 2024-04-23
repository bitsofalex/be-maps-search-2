import axios, { AxiosResponse } from "axios";

export interface Address {
  freeformAddress: string;
  country: string;
  countryCode: string;
  countryCodeISO3: string;
  countrySubdivision: string;
  countrySecondarySubdivision: string;
  municipality: string;
  municipalitySubdivision: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
}

export interface GeoPosition {
  lat: number;
  lon: number;
}

export interface Place {
  id: string;
  type: string;
  score: number;
  address: Address;
  position: GeoPosition;
}

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(
  key: string,
  address: string
): Promise<Place> {
  if (!key.trim()) {
    throw new Error("API key must be provided");
  }

  const autocomplete: AxiosResponse = await axios.get(
    `https://api.tomtom.com/search/2/search/${address}.json'`,
    {
      params: {
        key,
        limit: 100,
      },
    }
  );
  return autocomplete.data.results.map(({ id, address }: Place) => {
    return {
      placeId: id,
      streetNumber: address.streetNumber,
      streetName: address.streetName,
      countryCode: address.countryCode,
      country: address.country,
      freeformAddress: address.freeformAddress,
      municipality: address.municipality,
    };
  });
}
