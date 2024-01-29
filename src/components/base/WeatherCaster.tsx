import { Box, Card, CardBody, CardHeader, Spinner } from "@chakra-ui/react";

interface Props {
  isLoading: boolean;
  answer: string | undefined;
}

export const WeatherCaster = ({ isLoading, answer }: Props) => {
  const formattedAnswer = answer ? answer.replace(/<br>/g, '<br />') : "";
  return (
    <Card my="20px">
      <CardHeader pb="0">
        <Box fontSize="30px" fontWeight="bold">
          お天気キャスター for GPT
        </Box>
      </CardHeader>
      <CardBody>
        {isLoading ? (
          <Box display="flex" alignItems="center" gap="20px">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Box>
              <Box fontSize="24px">問い合わせ中...</Box>
              <Box fontSize="24px">少々お待ちください</Box>
            </Box>
          </Box>
        ) : (
          <Box fontSize="15px" dangerouslySetInnerHTML={{ __html: formattedAnswer }}/>
        )}
      </CardBody>
    </Card>
  );
};
