import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

export function createLogger(name: string) {
  return logger.child({ name });
}
