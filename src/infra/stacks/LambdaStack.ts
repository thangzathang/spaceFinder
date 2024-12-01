import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { Code, Function as LambdaFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

interface LambdaStackProps extends StackProps {
  spacesTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly helloLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    /* JS code */
    // new LambdaFunction(scope, id, props as FunctionProps);
    /*
      const lambda = new LambdaFunction(this, "Hello Lambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "hello.main",
      code: Code.fromAsset(join(__dirname, "..", "..", "services")),
      environment: {
        TABLE_NAME: props.spacesTable.tableName,
      },
    });
    */

    /* TS code */
    const lambda = new NodejsFunction(this, "Hello Lambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "hello.ts"),
      environment: {
        TABLE_NAME: props.spacesTable.tableName,
      },
    });

    // Add policy to allow s3 read.
    // We do it at this object level. huh
    lambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["s3:ListAllMyBuckets", "s3:ListBucket"],
        resources: ["*"], // bad practice
      })
    );

    const spacesLambda = new NodejsFunction(this, "Spaces Lambda", {
      runtime: Runtime.NODEJS_18_X,
      handler: "handler",
      entry: join(__dirname, "..", "..", "services", "spaces", "handler.ts"),
    });

    this.helloLambdaIntegration = new LambdaIntegration(lambda);
  }
}
