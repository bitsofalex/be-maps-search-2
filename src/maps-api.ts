import axios, { AxiosResponse } from "axios";

export type Address = {
  freeformAddress?: string;
  country?: string;
  countryCode?: string;
  countryCodeISO3?: string;
  countrySubdivision?: string;
  countrySecondarySubdivision?: string;
  municipality?: string;
  municipalitySubdivision?: string;
  streetName?: string;
  streetNumber?: string;
  postalCode?: string;
};

export type GeoPosition = {
  lat?: number;
  lon?: number;
};

export type Place = {
  id: string;
  type: string;
  score: number;
  address?: Address;
  position?: GeoPosition;
};

type SearchResult = {
  results: Place[];
};

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete(
  key: string,
  address: string,
  countrySet: string = "AU"
): Promise<Place[]> {
  const MIN_ADDRESS_LENGTH = 2;
  try {
    if (!key.trim()) {
      throw new Error("API key must be provided");
    }
    if (address.trim().length < MIN_ADDRESS_LENGTH) {
      return [];
    }

    const { data }: AxiosResponse<SearchResult> = await axios.get<SearchResult>(
      `https://api.tomtom.com/search/2/search/${address}.json'`,
      {
        params: {
          key,
          countrySet,
          limit: 100,
        },
      }
    );
    return data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Axios request failed: ${error.message}`);
    } else {
      throw error;
    }
  }
}
