import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  private levels = {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
  };

  constructor(private readonly configService: ConfigService) {
    this.initializeLogger();
  }

  private initializeLogger() {
    // Configure formats
    const consoleFormat = winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaStr = Object.keys(meta).length
          ? ` ${JSON.stringify(meta)}`
          : '';
        return `${timestamp} [${level}]: ${message}${metaStr}`;
      }),
    );

    const fileFormat = winston.format.combine(
      winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
      winston.format.json(),
    );

    const isServerless =
      !!process.env.VERCEL ||
      !!process.env.AWS_LAMBDA_FUNCTION_NAME ||
      !!process.env.NOW_REGION;
    const level = this.configService.get<string>('LOG_LEVEL') || 'debug';

    const transports: winston.transport[] = [
      new winston.transports.Console({
        level,
        format: consoleFormat,
      }),
    ];

    if (!isServerless) {
      const logDir = this.configService.get<string>('LOG_DIR') || 'logs';
      const resolvedDir = path.resolve(logDir);

      if (!fs.existsSync(resolvedDir)) {
        fs.mkdirSync(resolvedDir, { recursive: true });
      }
      // 🔥 Daily rotating ERROR logs
      transports.push(
        new DailyRotateFile({
          dirname: resolvedDir,
          filename: '%DATE%-error.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: fileFormat,
        }),
      );

      this.logger = winston.createLogger({
        levels: this.levels,
        level,
        transports,
      });
    }
  }
  emerg(message: string) {
    this.logger.emerg(message);
  }

  alert(message: string) {
    this.logger.alert(message);
  }

  crit(message: string) {
    this.logger.crit(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warning(message: string) {
    this.logger.warning(message);
  }

  notice(message: string) {
    this.logger.notice(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  info(message: string) {
    this.logger.info(message);
  }
}
