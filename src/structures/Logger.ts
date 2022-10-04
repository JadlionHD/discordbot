import chalk from "chalk";

export class Logger {
  constructor() {}
  get time() {
    return new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  }

  public info(...content: unknown[]) {
    console.log(`[${this.time} - INFO    ]`, ...content);
  }

  public ready(...content: unknown[]) {
    console.log(`[${this.time} - ${chalk.greenBright("READY")}   ]`, ...content);
  }

  public update(...content: unknown[]) {
    console.log(`[${this.time} - ${chalk.cyan("UPDATE")}  ]`, ...content);
  }

  public shard(...content: unknown[]) {
    console.log(`[${this.time} - ${chalk.rgb(255, 0, 217)("SHARD")}   ]`, ...content);
  }

  public debug(...content: unknown[]) {
    console.log(`[${this.time} - ${chalk.rgb(211, 237, 64)("DEBUG")}   ]`, ...content);
  }

  public warn(...content: unknown[]) {
    console.log(`[${this.time} - ${chalk.rgb(255, 168, 18)("WARN")}    ]`, ...content);
  }

  public error(...content: unknown[]) {
    console.log(`[${this.time} - ${chalk.rgb(230, 68, 28)("ERROR")}   ]`, ...content);
  }
}
