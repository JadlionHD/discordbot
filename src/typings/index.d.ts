export interface CommandOpts {
  description: string;
  cooldown: number;
  category: string;
  ratelimit: number;
}
export interface Cooldown {
  limit: number;
  time: number;
}

//export type Temp<T> = Map<string, T>;
