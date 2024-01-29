import { WeatherData } from "@/types/api-schema";
import { Card, CardHeader, CardBody, Text, Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";

interface Props {
  data: WeatherData;
}
export const WeatherCharts = ({ data }: Props) => {
  const chartData = {
    labels: data?.hourly.time.map((time) => {
      const date = new Date(time);
      return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}`;
    }, []),
    datasets: [
      {
        label: "気温 (°C)",
        data: data?.hourly.temperature2m,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "降水確率 (%)",
        data: data?.hourly.precipitationProbability,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <Card height="400px" my="20px">
      <CardHeader>
        <Box fontWeight="bold" fontSize="24px">
          一週間の気温・降水確率
        </Box>
      </CardHeader>
      <CardBody>
        <Line data={chartData} options={options} />
      </CardBody>
    </Card>
  );
};
