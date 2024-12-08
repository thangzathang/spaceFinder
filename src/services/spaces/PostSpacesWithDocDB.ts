import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

export async function postSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
  const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

  const randomId = v4();
  const item = JSON.parse(event.body);

  // Add the ID to the item
  const itemWithId = {
    id: randomId,
    ...item,
  };

  const command = new PutCommand({
    TableName: process.env.TABLE_NAME,
    Item: itemWithId,
  });

  const result = await ddbDocClient.send(command);

  console.log(result);

  return {
    statusCode: 201,
    body: JSON.stringify({
      id: randomId,
    }),
  };
}
