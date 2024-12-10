import { DeleteItemCommand, DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function deleteSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
  if (!event.queryStringParameters && !("id" in event.queryStringParameters) && !event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify("Please provide the right args..."),
    };
  }
  const spacesId = event.queryStringParameters["id"];

  const deleteCommand = await ddbClient.send(
    new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: { S: spacesId },
      },
      ReturnValues: "ALL_OLD",
    })
  );

  const listOfAttributes = deleteCommand.Attributes;
  const unmarshallAttributes = JSON.stringify(unmarshall(listOfAttributes));

  return {
    statusCode: 204,
    body: JSON.stringify("Deleted: " + unmarshallAttributes),
  };
}
