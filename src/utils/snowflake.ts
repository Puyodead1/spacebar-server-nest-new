import * as cluster from "cluster";

// Interface to define the structure of a deconstructed snowflake
interface DeconstructedSnowflake {
  timestamp: number;
  workerID: number;
  processID: number;
  increment: number;
  binary: string;
  date: Date;
}

export class Snowflake {
  // Discord epoch (2015-01-01T00:00:00.000Z)
  static readonly EPOCH = 1420070400000;
  static INCREMENT = 0n; // Increment counter, max 4095
  static processId = BigInt(process.pid % 31); // Process ID, max 31
  static workerId = BigInt(((cluster as any).worker?.id || 0) % 31); // Worker ID, max 31

  // Private constructor to prevent instantiation
  private constructor() {
    throw new Error(`The ${Snowflake.name} class may not be instantiated.`);
  }

  /**
   * Converts a snowflake from a decimal string to a binary string.
   * @param  {string} num - Snowflake to be transformed
   * @returns {string} - Binary string representation of the snowflake
   */
  static idToBinary(num: string): string {
    let bin = "";
    let high = parseInt(num.slice(0, -10)) || 0;
    let low = parseInt(num.slice(-10));

    // Convert each part (high and low) of the number to binary
    while (low > 0 || high > 0) {
      bin = String(low & 1) + bin;
      low = Math.floor(low / 2);
      if (high > 0) {
        low += 5000000000 * (high % 2);
        high = Math.floor(high / 2);
      }
    }
    return bin;
  }

  /**
   * Converts a snowflake from a binary string to a decimal string.
   * @param  {string} num - Bit string to be transformed
   * @returns {string} - Decimal string representation of the snowflake
   */
  static binaryToID(num: string): string {
    let dec = "";

    // Convert binary to decimal
    while (num.length > 50) {
      const high = parseInt(num.slice(0, -32), 2);
      const low = parseInt((high % 10).toString(2) + num.slice(-32), 2);

      dec = (low % 10).toString() + dec;
      num =
        Math.floor(high / 10).toString(2) +
        Math.floor(low / 10)
          .toString(2)
          .padStart(32, "0");
    }

    // Convert remaining binary to decimal
    let numInt = parseInt(num, 2);
    while (numInt > 0) {
      dec = (numInt % 10).toString() + dec;
      numInt = Math.floor(numInt / 10);
    }

    return dec;
  }

  /**
   * Generates a snowflake using the worker and process IDs.
   * @returns {bigint} - Generated snowflake
   */
  static generateWorkerProcess(): bigint {
    const time = BigInt(Date.now() - Snowflake.EPOCH) << BigInt(22);
    const worker = Snowflake.workerId << 17n;
    const process = Snowflake.processId << 12n;
    const increment = Snowflake.INCREMENT++;
    return time | worker | process | increment;
  }

  /**
   * Generates a snowflake as a string.
   * @returns {string} - Snowflake as a string
   */
  static generate(): string {
    return Snowflake.generateWorkerProcess().toString();
  }

  /**
   * Deconstructs a Discord snowflake into its components.
   * @param {string} snowflake - Snowflake to deconstruct
   * @returns {DeconstructedSnowflake} - Object containing the deconstructed snowflake data
   */
  static deconstruct(snowflake: string): DeconstructedSnowflake {
    const BINARY = Snowflake.idToBinary(snowflake).padStart(64, "0");
    const res: DeconstructedSnowflake = {
      timestamp: parseInt(BINARY.substring(0, 42), 2) + Snowflake.EPOCH,
      workerID: parseInt(BINARY.substring(42, 47), 2),
      processID: parseInt(BINARY.substring(47, 52), 2),
      increment: parseInt(BINARY.substring(52, 64), 2),
      binary: BINARY,
      get date() {
        return new Date(this.timestamp);
      },
    };
    return res;
  }
}
