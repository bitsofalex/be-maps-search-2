import { Address, getPlaceAutocomplete } from "./maps-api";

export type AddressResult = { placeId: string } & Address;

export async function getAutoCompleteDetails(
  address: string
): Promise<AddressResult[]> {
  const apiKey = process.env.TOMTOM_API_KEY || "";
  // get autocomplete results
  const res = getPlaceAutocomplete(apiKey, address).then(
    (autocompleteResults) => {
      return autocompleteResults.map(({ id, address }) => {
        return {
          placeId: id,
          ...address,
        };
      });
    }
  );
  return res;
}
