#!/usr/bin/env node

import { CliApplication } from './presentation/cli/cliApplication';

const app = new CliApplication();
app.run(process.argv);
