import { Coordinate, WeatherData } from "@/types/api-schema";
import { fetchWeatherApi } from "openmeteo";
import { useState } from "react";

export interface fetchDataType {
  data: WeatherData | undefined;
  isLoading: boolean;
  currentCoordinate: Coordinate | undefined;
  fetchData: () => Promise<void>;
}

export const useFetchData = (): fetchDataType => {
  const [data, setData] = useState<WeatherData>();
  const [currentCoordinate, setCurrentCoordinate] = useState<Coordinate>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const coordinateRes = await fetch("/api/coordinate");
    const coordinate: Coordinate = await coordinateRes.json();
    setCurrentCoordinate(coordinate);
    const params = {
      latitude: coordinate.location._latitude,
      longitude: coordinate.location._longitude,
      hourly: ["temperature_2m", "precipitation_probability", "weather_code"],
      timezone: "Asia/Tokyo",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const response = responses[0];
    const JST_OFFSET = 9 * 60 * 60;

    const hourly = response.hourly()!;

    const weatherData = {
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + JST_OFFSET) * 1000)),
        temperature2m: Array.from(hourly.variables(0)!.valuesArray()!),
        precipitationProbability: Array.from(
          hourly.variables(1)!.valuesArray()!
        ),
        weatherCode: Array.from(hourly.variables(2)!.valuesArray()!),
      },
    };
    setData(weatherData);
    setIsLoading(false);
  };

  return { data, currentCoordinate, isLoading, fetchData };
};
