export type NodeType = {
    type: { resolvedName: string };
    isCanvas: boolean;
    props: Record<string, any>;
    displayName: string;
    nodes: string[];
    linkedNodes: Record<string, string>;
  };
  export type JsonData = Record<string, NodeType>;
  