export class Logger {
  static warn(msg: string) {
    let message = `emoji-stockbook: ${msg}`;

    console.warn(message);
  }

  static error(msg: string, error?: unknown) {
    let message = `emoji-stockbook: ${msg}`;
    if (error) {
      message += `\n${error}`;
    }

    console.error(message);
  }
}
