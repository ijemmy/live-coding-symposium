import * as cdk from "@aws-cdk/core";
import {
  LambdaToDynamoDBProps,
  LambdaToDynamoDB,
} from "@aws-solutions-constructs/aws-lambda-dynamodb";
import * as lambda from '@aws-cdk/aws-lambda';
import { LambdaIntegration, RestApi } from "@aws-cdk/aws-apigateway";

export interface BackendStackProps extends cdk.StackProps {}

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: BackendStackProps) {
    super(scope, id, props);

    const lambdaToDynamoDB = new LambdaToDynamoDB(this, "lambda-dynamodb-stack", {
      lambdaFunctionProps: {
        runtime: lambda.Runtime.NODEJS_14_X,
        // This assumes a handler function in lib/lambda/index.js
        code: lambda.Code.fromAsset(`${__dirname}/lambda`),
        handler: "index.handler",
      },
    });

    const integration = new LambdaIntegration(lambdaToDynamoDB.lambdaFunction);
    const api = new RestApi(this, 'FeedbackAPI', {});
    api.root.addResource('feedback')
      .addMethod('POST', integration);
  }
}
