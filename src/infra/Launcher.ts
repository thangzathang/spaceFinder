import { App } from "aws-cdk-lib";
import { DataStack } from "./stacks/DataStack";
import { LambdaStack } from "./stacks/LambdaStack";
import { ApiStack } from "./stacks/ApiStack";
import { SpacesLambda } from "./stacks/SpacesLambda";

const app = new App();

const dataStack = new DataStack(app, "DataStack");

const lambdaStack = new LambdaStack(app, "LambdaStack", {
  spacesTable: dataStack.spacesTable,
});

const spacesLambdaStack = new SpacesLambda(app, "SpacesLambdaStack", {
  spacesTable: dataStack.spacesTable,
});

new ApiStack(app, "ApiStack", {
  lambdaIntegration: lambdaStack.helloLambdaIntegration,
  apiName: "helloLambda",
});

new ApiStack(app, "SpacesApiStack", {
  lambdaIntegration: spacesLambdaStack.spacesLambdaIntegration,
  apiName: "spaces",
});
