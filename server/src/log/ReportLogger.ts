import { ConsoleLogger } from '@nestjs/common';
import { log } from 'console';

export class ReportLogger extends ConsoleLogger {
  verbose(message: string) {
    log('【Verbose】日志上报', message);
    super.verbose.apply(this, arguments);
  }
  log(message: string) {
    log('【Log】日志上报', message);
    super.verbose.apply(this, arguments);
  }
  debug(message: string) {
    log('【Debug】日志上报', message);
    super.verbose.apply(this, arguments);
  }
  warn(message: string) {
    log('【Warn】日志上报', message);
    super.verbose.apply(this, arguments);
  }
  error(message: string) {
    log('【Error】日志上报', message);
    super.verbose.apply(this, arguments);
  }
}
