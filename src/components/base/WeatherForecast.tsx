import { WeatherData } from "@/types/api-schema";
import { weatherCodes } from "@/utils/weather-code";
import { Box, Divider, Card } from "@chakra-ui/react";

interface Props {
  data: WeatherData;
}

export const WeatherForecast = ({ data }: Props) => {
  const displayHourPoints = [0, 9, 12, 21];
  const today = new Date();
  const oneWeekAgo = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );

  let lastDate = "";
  const weatherArray = data?.hourly.weatherCode.map((code, index) => {
    const date = new Date(data.hourly.time[index]);
    const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
    if (
      date >= oneWeekAgo &&
      date.getDate() !== today.getDate() &&
      displayHourPoints.includes(date.getHours())
    ) {
      const isNewDay = dateString !== lastDate;
      if (isNewDay) {
        lastDate = dateString;
        return {
          date: dateString,
          hour: date.getHours(),
          weather: weatherCodes[code],
          temperature: Math.round(data.hourly.temperature2m[index]),
        };
      }
      return {
        date: dateString,
        hour: date.getHours(),
        weather: weatherCodes[code],
        temperature: Math.round(data.hourly.temperature2m[index]),
      };
    }
    return null;
  });
  const weatherArrayFiltered = weatherArray.filter((element) => element);
  console.log(JSON.stringify(weatherArrayFiltered))
  return (
    <Card my="20px" p="4" overflow="hidden">
      <Box fontWeight="bold" fontSize="24px" mb="4">
        一週間の天気予報
      </Box>
      <Box fontSize="18px">
        {data?.hourly.time.map((time, index) => {
          const date = new Date(time);
          const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
          if (
            date >= oneWeekAgo &&
            date.getDate() !== today.getDate() &&
            displayHourPoints.includes(date.getHours())
          ) {
            const isNewDay = dateString !== lastDate;
            if (isNewDay) {
              lastDate = dateString;
              return (
                <Box key={dateString}>
                  <Box fontWeight="bold" mt="4">{dateString}</Box>
                  <Divider my="2" />
                  <Box>
                    {`${date.getHours()}時: ${
                      weatherCodes[data.hourly.weatherCode[index]]
                    } ${Math.round(data.hourly.temperature2m[index])}℃`}
                  </Box>
                </Box>
              );
            }
            return (
              <Box key={index}>
                {`${date.getHours()}時: ${
                  weatherCodes[data.hourly.weatherCode[index]]
                } ${Math.round(data.hourly.temperature2m[index])}℃`}
              </Box>
            );
          }
          return null;
        })}
      </Box>
    </Card>
  );
};
