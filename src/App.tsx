import "./App.css";
import { useEffect, useState } from "react";
import parseJsonToReact from "./method";

export default function App() {
  const [reactElement, setReactElement] = useState(null);

  const fetchJsonReact = async (params: string) => {
    try {
      const res = await fetch(params);
      const json = await res.json();

      // had to loop through rootNodes to filter which is not the parent so as to not hardcode "ROOT" value🚀
      const rootNodes = Object.keys(json.record).filter(
        (nodeId) => !json.record[nodeId].parent
      );
      // here you'd get an array ["ROOT"] which you can then dynamically pass into parseJsonToReact
      const rootElements = rootNodes.map((rootNodeId) =>
        parseJsonToReact(json, rootNodeId)
      );
      // voila 🔥⚡️  you store it in a state and render on the JSX
      setReactElement(rootElements);
    } catch (error) {
      console.error("Error fetching or parsing JSON:", error);
    }
  };

  useEffect(() => {
    const apiUrl = "https://api.jsonbin.io/v3/b/6571ff4e12a5d37659a4856a";
    fetchJsonReact(apiUrl);
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div>{reactElement}</div>
    </div>
  );
}
