export class Logger {
  static warn(msg: string, trace?: unknown) {
    console.warn(...Logger.output(msg, trace));
  }

  static error(msg: string, trace?: unknown) {
    console.error(...Logger.output(msg, trace));
  }

  private static output(msg: string, trace?: unknown) {
    const output: unknown[] = [`emoji-stockbook: ${msg}`];
    if (trace) {
      output.push(trace);
    }

    return output;
  }
}
