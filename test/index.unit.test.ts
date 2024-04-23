import { getAutoCompleteDetails } from "../src";
import { getPlaceAutocomplete } from "../src/maps-api";

jest.mock("../src/maps-api");

describe("getPlaceAutocomplete", () => {
  const mockedGetPlaceAutocomplete = getPlaceAutocomplete as jest.Mock;

  it("returns empty list when error caught", async () => {
    mockedGetPlaceAutocomplete.mockRejectedValue(
      new Error("API key must be provided")
    );

    expect(await getAutoCompleteDetails("Charlotte Street")).toStrictEqual([]);
  });
});
