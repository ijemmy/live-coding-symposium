#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FrontendStack } from '../lib/frontend-stack';
import { BackendStack } from '../lib/backend-stack';
import { FrontendConfig } from '../lib/frontend-config-stack';

const app = new cdk.App();
new FrontendStack(app,'FrontendStack', {});
new BackendStack(app, 'BackendStack', {});
