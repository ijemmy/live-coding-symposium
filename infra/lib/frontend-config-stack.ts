import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as cr from "@aws-cdk/custom-resources";

export interface FrontendConfigProps extends cdk.StackProps {
  siteBucket: s3.Bucket;
  api: apigateway.RestApi;
}

export class FrontendConfig extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: FrontendConfigProps) {
    super(scope, id, props);

    new cr.AwsCustomResource(this, "PutFrontendConfig", {
      onCreate: {
        service: "S3",
        action: "putObject",
        physicalResourceId: cr.PhysicalResourceId.of(Date.now().toString()),
        parameters: {
          Body: JSON.stringify({ API_URL: props.api.url }),
          Bucket: props.siteBucket.bucketName,
          Key: "config.json",
        },
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
        resources: [
          props.siteBucket.bucketArn,
          `${props.siteBucket.bucketArn}/*`
        ],
      }),
    });
  }
}
