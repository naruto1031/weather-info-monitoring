export type Coordinate = {
  location: {
    _latitude: number,
    _longitude: number
  },
  id: number
}

export interface WeatherData {
  hourly: {
    time: Date[];
    temperature2m: number[];
    precipitationProbability: number[];
    weatherCode: number[];
  };
}