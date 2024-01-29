import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Input,
  Text,
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useFetchData } from "@/hooks/useFetchData";
import { CoordinateCard, Header, WeatherCaster, WeatherCharts, WeatherForecast, WeatherInfo } from "@/components";
import { useEffect, useState } from "react";
import { useFetchOpenAI } from "@/hooks/useFetchOpenAI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Home() {
  const { data, currentCoordinate, isLoading, fetchData } = useFetchData();
  const {answer, isAiLoading, fetchOpenAI } = useFetchOpenAI();
  const [weatherInfo, setWeatherInfo] = useState<string>("");

  useEffect(() => {
    if (weatherInfo.length > 0) {
      fetchOpenAI(weatherInfo);
    }
  }, [weatherInfo]);

  return (
    <>
      <Header />
      <Container maxWidth="1024px" mt="20px" backgroundColor="">
        <CoordinateCard isLoading={isLoading} currentCoordinate={currentCoordinate} fetchData={fetchData} />
        {data && (
          <Box>
            <WeatherCaster isLoading={isAiLoading} answer={answer} />
            <WeatherCharts data={data} />
            <WeatherForecast data={data} setWeatherInfo={setWeatherInfo} />
          </Box>
        )}
      </Container>
    </>
  );
}
