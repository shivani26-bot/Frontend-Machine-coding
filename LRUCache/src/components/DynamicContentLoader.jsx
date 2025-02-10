import "./DynamicContentLoader.css";
import { useState } from "react";
import useLRUCache from "./hooks/useLRUCache";
export default function DynamicContentLoader() {
  const [content, setContent] = useState([]);
  //   cache of size 3
  const { get, put } = useLRUCache(3);
  const loadContent = async (id) => {
    // Promise in this function simulates a delay, representing the time it might take to load content from an API or other data source
    // await keyword pauses the execution of the loadContent function until the Promise resolves.
    // In this case, it will wait for 1 second before proceeding to the next line of code.

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const loadedContent = {
      id,
      text: `Tab ${id} Data`,
    };
    // once you get content from api call put the content
    put(id, loadedContent);
    setContent((prevData) => [...prevData, loadedContent]);
  };
  const handleButtonClick = (id) => {
    // check whether it's present in the cache or not
    const cachedContent = get(id);
    if (cachedContent) {
      console.log(`content ${id} loaded from cache`);
      setContent((prevData) => [...prevData, cachedContent]);
    } else {
      console.log(`Loading content ${id}`);
      loadContent(id);
    }
  };
  return (
    <div className="app">
      <h1>Dynamic Content Loader With LRU Cache</h1>
      <button onClick={() => handleButtonClick(1)} className="btn">
        Tab1
      </button>
      <button onClick={() => handleButtonClick(2)} className="btn">
        Tab2
      </button>
      <button onClick={() => handleButtonClick(3)} className="btn">
        Tab3
      </button>
      <button onClick={() => handleButtonClick(4)} className="btn">
        Tab4
      </button>
      <button onClick={() => handleButtonClick(5)} className="btn">
        Tab5
      </button>

      <div>
        <h3>Loaded content</h3>
        <ul>
          {/*loaded item we get after clicking on the tab */}
          {content.map((item, index) => {
            return <li key={`${item.id}${index}`}>{item.text}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
