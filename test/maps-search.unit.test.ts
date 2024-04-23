import axios, { AxiosError } from "axios";
import { getPlaceAutocomplete } from "../src/maps-api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getPlaceAutocomplete", () => {
  it("handles error thrown from Axios", async () => {
    const errorMessage = "Bad request";
    const axiosError: AxiosError = {
      message: errorMessage,
      name: "AxiosError",
      config: {},
      code: "ERR_BAD_REQUEST",
      request: {},
      response: undefined,
      isAxiosError: true,
      toJSON: jest.fn(() => ({
        message: errorMessage,
        name: "AxiosError",
      })),
    };

    mockedAxios.get.mockRejectedValue(axiosError);
    mockedAxios.isAxiosError.mockReturnValue(true);

    await expect(getPlaceAutocomplete("api-key", "address")).rejects.toThrow(
      `Axios request failed: ${errorMessage}`
    );
  });
});
