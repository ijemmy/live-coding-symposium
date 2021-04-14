#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FrontendStack } from '../lib/frontend-stack';
import { BackendStack } from '../lib/backend-stack';
import { FrontendConfig } from '../lib/frontend-config-stack';

const app = new cdk.App();
const frontendStack = new FrontendStack(app,'FrontendStack', {});
const backendStack = new BackendStack(app, 'BackendStack', {});
new FrontendConfig(app, 'FrontendConfig', {
    siteBucket: frontendStack.websiteBucket,
    api: backendStack.api
});