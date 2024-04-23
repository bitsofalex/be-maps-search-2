import { getPlaceAutocomplete } from "./maps-api";

export async function getAutoCompleteDetails(address: any): Promise<any> {
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
  // loop over and get details and map results
  return res;
}
