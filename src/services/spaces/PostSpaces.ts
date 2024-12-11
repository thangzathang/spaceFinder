import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";
import { validateAsSpaceEntry } from "../shared/Validator";

export async function postSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
  const randomId = v4();
  const item = JSON.parse(event.body);

  // Apply validation
  validateAsSpaceEntry(item);

  const command = new PutItemCommand({
    // This process.env. is from
    // src/infra/stacks/SpacesLambda.ts
    TableName: process.env.TABLE_NAME,
    /*
    Item: {
      id: {
        S: randomId,
      },
      location: {
        S: item.location,
      },
    },
    */
    // If Marshalling
    Item: marshall({
      id: randomId,
      ...item,
    }),
  });

  const result = await ddbClient.send(command);

  console.log(result);

  return {
    // Status code for created
    statusCode: 201,
    body: JSON.stringify({
      id: randomId,
    }),
  };
}
