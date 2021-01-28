#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PubsubbackendStack } from '../lib/pubsubbackend-stack';

const app = new cdk.App();
new PubsubbackendStack(app, 'PubsubbackendStack');
