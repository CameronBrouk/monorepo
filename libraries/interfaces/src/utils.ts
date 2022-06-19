export type InferArrayElement<T> = T extends (infer U)[] ? U : never;

export type ID = number;
export type Milliseconds = number;
export type Seconds = number;
