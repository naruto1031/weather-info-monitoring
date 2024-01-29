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
import { CoordinateCard, Header, WeatherCharts, WeatherForecast } from "@/components";

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
  return (
    <>
      <Header />
      <Container maxWidth="1024px" mt="20px" backgroundColor="">
        <CoordinateCard isLoading={isLoading} currentCoordinate={currentCoordinate} fetchData={fetchData} />
        {data && (
          <Box>
            <WeatherCharts data={data} />
            <WeatherForecast data={data} />
          </Box>
        )}
      </Container>
    </>
  );
}
