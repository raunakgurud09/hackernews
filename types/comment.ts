export type TPostTypesEnum = "story" | "comment" | "job" | "poll" | "pollopt";

export type TComment = {
  id?: number;
  by?: string;
  text?: string;
  parent?: number;
  time?: number;
  type?: TPostTypesEnum;
  kids?: number[];
};
