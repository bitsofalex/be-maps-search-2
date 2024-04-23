import axios, { AxiosResponse } from "axios";

interface Place {
  id: string;
  type: string;
  score: number;
  address: {
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
  };
  position: {
    lat: number;
    lon: number;
  };
}

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(
  key: string,
  address: string
): Promise<Place> {
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
