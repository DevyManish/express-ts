import dayjs from "dayjs";
import pino from "pino";

const log = pino.default({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      //   translateTime: "yyyy-mm-dd HH:MM:ss",
      translateTime: false,
      ignore: "pid,hostname",
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});


export default log;
