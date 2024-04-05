export interface tag {
  type: "start" | "end" | "text";
  tag?: string;
  text?: string;
  attributes?: {
    [key: string]: string;
  };
  selfClose?: boolean;
  children?: tag[];
}

enum NodeType {
  HTMLTag,
  Text,
}
