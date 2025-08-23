
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { githubWorkflow } from './workflows/github-workflow';
import { githubDeveloperAgent } from './agents/github-developer-agent';

export const mastra = new Mastra({
  workflows: { githubWorkflow },
  agents: { githubDeveloperAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra GitHub POC',
    level: 'info',
  }),
});
