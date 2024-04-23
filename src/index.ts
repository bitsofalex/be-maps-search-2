import { Address, Place, getPlaceAutocomplete } from "./maps-api";

export type AddressResult = { placeId: string } & Address;

export async function getAutoCompleteDetails(
  address: string
): Promise<AddressResult[]> {
  const apiKey = process.env.TOMTOM_API_KEY;

  try {
    if (!apiKey) {
      throw new Error("Missing configuration: API key");
    }

    // get autocomplete results
    const places: Place[] = await getPlaceAutocomplete(apiKey, address);
    return places.map(({ id, address }) => {
      return {
        placeId: id,
        ...address,
      };
    });
  } catch (error) {
    // todo use a proper logger instead of console log
    console.log(error);
    // reason for returning an empty list is that the consumer
    // will not be able to do anything with the error but the rest
    // of the consumer's functionality can continue to operate without
    // address autocompletion
    return [];
  }
}
