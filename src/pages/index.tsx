import { Coordinate } from "@/type/apiSchema";
import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import { fetchWeatherApi } from "openmeteo";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface WeatherData {
  hourly: {
    time: Date[];
    temperature2m: number[];
    precipitationProbability: number[];
    weatherCode: number[];
  };
}

export default function Home() {
  const [data, setData] = useState<WeatherData>();

  const handleSubmit = async () => {
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
  };

  const chartData = {
    labels: data?.hourly.time.map(time => time.toLocaleTimeString('ja-JP')),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data?.hourly.temperature2m,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Precipitation Probability (%)',
        data: data?.hourly.precipitationProbability,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <Box>
      <button onClick={handleSubmit}>検索</button>
      {data && (
        <Box style={{ height: '400px' }}>
          <Line data={chartData} options={options} />
        </Box>
      )}
    </Box>
  );
}
