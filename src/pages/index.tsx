import { Coordinate } from "@/type/apiSchema";
import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import { fetchWeatherApi } from "openmeteo";

export default function Home() {
  const [data, setData] = useState();
  const handleSubmit = async () => {
    // 最新の緯度経度を取得
    const coordinateRes = await fetch("/api/coordinate");
    const coordinate: Coordinate = await coordinateRes.json();

    const params = {
      latitude: coordinate.location._latitude,
      longitude: coordinate.location._longitude,
      hourly: ["temperature_2m", "precipitation_probability", "weather_code"],
      timezone: "Asia/Tokyo",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const json = responses[0];

    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const hourly = response.hourly()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      hourly: {
        time: range(
          Number(hourly.time()),
          Number(hourly.timeEnd()),
          hourly.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        precipitationProbability: hourly.variables(1)!.valuesArray()!,
        weatherCode: hourly.variables(2)!.valuesArray()!,
      },
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
      console.log(
        weatherData.hourly.time[i].toISOString(),
        weatherData.hourly.temperature2m[i],
        weatherData.hourly.precipitationProbability[i],
        weatherData.hourly.weatherCode[i]
      );
    }
  };
  return (
    <Box>
      <button onClick={handleSubmit}>更新</button>
    </Box>
  );
}
