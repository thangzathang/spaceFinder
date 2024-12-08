import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function getSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
  let spacesId = "";

  // Check query string parameters
  if (event.queryStringParameters) {
    if ("id" in event.queryStringParameters) {
      spacesId = event.queryStringParameters["id"];

      const getItemsCommand = new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          id: {
            S: spacesId,
          },
        },
      });

      const getItemResponse = await ddbClient.send(getItemsCommand);

      if (getItemResponse.Item) {
        const unmarshalledItem = unmarshall(getItemResponse.Item);
        return {
          statusCode: 200,
          body: JSON.stringify(unmarshalledItem),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify(`Space with this id ($spacesId) not found.`),
        };
      }
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify("id required"),
      };
    }
  }

  const scanCommand = new ScanCommand({
    TableName: process.env.TABLE_NAME,
  });

  const scanResult = await ddbClient.send(scanCommand);

  const unmarshalledItems = scanResult.Items.map((item) => {
    return unmarshall(item);
  });

  return {
    statusCode: 200,
    body: JSON.stringify(unmarshalledItems),
  };
}
