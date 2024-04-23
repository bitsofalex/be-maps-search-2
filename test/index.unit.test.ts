import { verify } from "crypto";
import { getAutoCompleteDetails } from "../src";
import { getPlaceAutocomplete } from "../src/maps-api";
import axios from "axios";

jest.mock("axios");
jest.mock("../src/maps-api");

describe("getAutoCompleteDetails", () => {
  const mockedGetPlaceAutocomplete = getPlaceAutocomplete as jest.Mock;
  const mockAxios = axios as jest.Mocked<typeof axios>;
  it("returns empty list when api key not configured", async () => {
    expect(await getAutoCompleteDetails("Charlotte Street")).toStrictEqual([]);
    expect(mockAxios.get).toHaveBeenCalledTimes(0);
  });

  it("returns empty list when error caught", async () => {
    mockedGetPlaceAutocomplete.mockRejectedValue(
      new Error("API key must be provided")
    );

    expect(await getAutoCompleteDetails("Charlotte Street")).toStrictEqual([]);
  });
});
