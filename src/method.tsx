import * as React from "react";
import {JsonData} from "./types";

function parseJsonToReact(json: JsonData, nodeId: string) {
  const node = json.record[nodeId];
  if (!node) return null;

  const {type, linkedNodes, nodes, props} = node;

  const ReactComponent = type.resolvedName;

  // based on the JSON schema some keys have nodes(children) and others linkedNodes(linkedChildren)

  const children = nodes.map((childId:string, idx:string) => {
    return <React.Fragment key={`${childId}-${idx}`}>{parseJsonToReact(json, childId)}</React.Fragment>;
  });

  const linkedChildren: Record<string, JSX.Element | null> = {};
  Object.keys(linkedNodes).forEach((key) => {
    linkedChildren[key] = parseJsonToReact(json, linkedNodes[key]);
  });

  switch (ReactComponent) {
    case "Container":
      return <div data-testid="Container" {...props}>{children}</div>;

    case "Image":
      return <img {...props} />;

    case "Card":
      return <div {...props}>{Object.values(linkedChildren)}</div>;

    case   "CardTop":
      return <div role="div" {...props}>{children}</div>;

    case "Text":
      return <span {...props}>{props.text}</span>;

    case "CardBottom":
      return <div {...props}>{children}</div>;

    case "Button":
      return <button {...props}>{props.text}</button>;

    default:
      return null;
  }
}
export default parseJsonToReact;
