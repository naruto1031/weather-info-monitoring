import { Coordinate } from "@/types/api-schema";
import { Card, CardHeader, Box, CardBody, Button } from "@chakra-ui/react";

interface Props {
  currentCoordinate: Coordinate | undefined;
  isLoading: boolean;
  fetchData: () => Promise<void>;
}
export const CoordinateCard = ({
  currentCoordinate,
  fetchData,
  isLoading,
}: Props) => {
  return (
    <Card>
      <CardHeader pb="0">
        <Box fontSize="30px" fontWeight="bold">
          現在の座標
        </Box>
      </CardHeader>
      <CardBody>
        {currentCoordinate ? (
          <Box fontSize="24px">
            ({Math.round(currentCoordinate?.location._latitude * 10000) / 10000}
            ,{Math.round(currentCoordinate?.location._longitude * 10000) / 10000})
          </Box>
        ) : (
          <Box fontSize="24px">未取得</Box>
        )}
        <Box mt="10px">
          <Button
            onClick={fetchData}
            isLoading={isLoading}
            colorScheme="blue"
            variant="solid"
            size="md"
          >
            {currentCoordinate
              ? "座標を再取得して天気を表示"
              : "座標を取得して天気を表示"}
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
};
