import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export async function updateSpace(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
  if (!event.queryStringParameters && !("id" in event.queryStringParameters) && !event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify("Please provide the right args..."),
    };
  }
  /*
  Example of event.body
  {
    "location":"new Paris"
  }
  */
  const parsedBody = JSON.parse(event.body);
  const spacesId = event.queryStringParameters["id"];
  // Get Key
  const requestBodyKey = Object.keys(parsedBody)[0];
  // Get Value
  const requestBodyValue = parsedBody[requestBodyKey];

  const updateCommand = await ddbClient.send(
    new UpdateItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: { S: spacesId },
      },
      UpdateExpression: "set #newLoc = :newLocation",
      ExpressionAttributeNames: {
        "#newLoc": requestBodyKey,
      },
      ExpressionAttributeValues: {
        ":newLocation": {
          S: requestBodyValue,
        },
      },
      ReturnValues: "UPDATED_NEW",
    })
  );

  const listOfAttributes = updateCommand.Attributes;
  const unmarshallAttributes = unmarshall(listOfAttributes);
  // console.log("unmarshall:", unmarshallAttributes);

  return {
    statusCode: 204,
    body: JSON.stringify(unmarshallAttributes),
  };
}
