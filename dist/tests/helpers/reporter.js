"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter());
// class CustomProcessor extends DisplayProcessor {
//   public displayJasmineStarted(info: SuiteInfo, log: string): string {
//     return `TypeScript ${log}`;
//   }
// }
// jasmine.getEnv().clearReporters();
// jasmine.getEnv().addReporter(
//   new SpecReporter({
//     spec: {
//       displayStacktrace: StacktraceOption.NONE,
//     },
//     customProcessors: [CustomProcessor],
//   })
// );
