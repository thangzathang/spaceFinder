import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { v4 } from "uuid";

// initialize the s3 client outside the handler as initializing it is resource intensive
const s3Client = new S3Client({});

async function handler(event: APIGatewayProxyEvent, context: Context) {
  // List the s3 buckets
  const listBucketsCommand = new ListBucketsCommand({});
  const bucketList = (await s3Client.send(listBucketsCommand)).Buckets;

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify("Hi from Lambda from this id: " + v4() + ". and here are your buckets:" + JSON.stringify(bucketList)),
  };

  console.log(event);

  return response;
}

export { handler };
