import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
  lambdaIntegration: LambdaIntegration;
  apiName: string;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, props.apiName + "Api");

    const resource = api.root.addResource(props.apiName);
    resource.addMethod("GET", props.lambdaIntegration);
    resource.addMethod("POST", props.lambdaIntegration);
    resource.addMethod("PUT", props.lambdaIntegration);
    resource.addMethod("DELETE", props.lambdaIntegration);
  }
}
