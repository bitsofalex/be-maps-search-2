import { config } from "dotenv";
import { describe } from "@jest/globals";
import { getPlaceAutocomplete } from "../src/maps-api";
import { getAutoCompleteDetails } from "../src";

config();

// These are end-to-end tests and need an api key
describe("Tomtom Places E2E Tests", () => {
  describe("getAutoCompleteDetails", () => {
    it("returns a promise", () => {
      const res = getAutoCompleteDetails("Charlotte Street");
      expect(res).toBeInstanceOf(Promise);
    });

    it("can fetch from the autocomplete api", async () => {
      const res = await getAutoCompleteDetails("Charlotte Street");
      const firstRes = res[0];
      expect(firstRes).toHaveProperty("placeId");
      // expect(firstRes).toHaveProperty("streetNumber");
      expect(firstRes).toHaveProperty("countryCode");
      expect(firstRes).toHaveProperty("country");
      expect(firstRes).toHaveProperty("freeformAddress");
      expect(firstRes).toHaveProperty("municipality");
    });
  });

  describe("getPlaceAutocomplete", () => {
    const apiKey = process.env.TOMTOM_API_KEY || "";

    it("throws error if API key is not provided", async () => {
      await expect(getPlaceAutocomplete("  ", "any place")).rejects.toThrow(
        "API key must be provided"
      );
    });

    it("returns no result if address is not provided", async () => {
      expect(await getPlaceAutocomplete(apiKey, "   ")).toStrictEqual([]);
      expect(await getPlaceAutocomplete(apiKey, "C")).toStrictEqual([]);
    });

    it("handles no results", async () => {
      const res = await getPlaceAutocomplete(apiKey, "asfasffasfasafsafs");
      expect(res).toStrictEqual([]);
    });

    it("gets address results from API call", async () => {
      const res = await getPlaceAutocomplete(apiKey, "Charlotte Street");
      expect(res).not.toHaveLength(0);
      const firstRes = res[0];
      expect(firstRes).toHaveProperty("id");
    });
  });
});
