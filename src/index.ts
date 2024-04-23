import { getPlaceAutocomplete } from "./maps-api";

export async function getAutoCompleteDetails(address: any): Promise<any> {
  const apiKey = process.env.TOMTOM_API_KEY;
  // get autocomplete results
  const res = getPlaceAutocomplete(process.env.TOMTOM_API_KEY, address).then(
    (autocompleteResults) => {
      const res = [];
      return autocompleteResults;
    }
  );
  // loop over and get details and map results
  return res;
}
