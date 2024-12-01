import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface SpacesLambdaStackProps extends StackProps {
  spacesTables: ITable;
}

export class SpacesLambda extends Stack {
  public readonly spacesLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: SpacesLambdaStackProps) {
    super(scope, id, props);

    const spacesLambda = new NodejsFunction(this, "Spaces Lambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "spaces", "handler.ts"),
    });

    this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda);
  }
}
