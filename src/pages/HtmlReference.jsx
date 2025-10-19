import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import "@google/model-viewer/dist/model-viewer.min.js";

export default function HtmlReference() {
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  // --- Tag Data and Categories ---
  const tagCategories = {
    "Document Structure": [
      "html",
      "head",
      "title",
      "meta",
      "link",
      "style",
      "body",
      "script",
    ],
    "Text Content": [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "span",
      "b",
      "i",
      "u",
      "strong",
      "em",
      "small",
      "mark",
      "sub",
      "sup",
    ],
    "Lists": ["ul", "ol", "li"],
    "Tables": ["table", "tr", "th", "td"],
    "Media": ["img", "audio", "video", "source", "canvas", "svg", "iframe"],
    "Forms": [
      "form",
      "input",
      "button",
      "label",
      "textarea",
      "select",
      "option",
    ],
    "Semantic Layout": [
      "header",
      "footer",
      "main",
      "section",
      "article",
      "nav",
      "aside",
    ],
    "Code & Quote": ["pre", "code", "blockquote"],
    "Others": ["br", "hr", "div", "noscript"],
  };

  const tagData = {
    html: {
      desc: "Root element of an HTML document.",
      example: "<html>...</html>",
      model: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    },
    p: {
      desc: "Defines a paragraph.",
      example: "<p>This is a paragraph</p>",
      model: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
    },
    h1: {
      desc: "Defines a top-level heading.",
      example: "<h1>This is a Heading</h1>",
      model: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb",
    },
  };

  // --- Handle theme ---
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // --- Copy code button ---
  const handleCopy = () => {
    const text =
      tagData[selectedTag]?.example ||
      `<${selectedTag}>...</${selectedTag}>`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="bg-orange-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
      <Header
        title="HTML Tag Reference"
        onBack={() => (window.location.href = "/")}
        onThemeToggle={() =>
          setTheme(theme === "light" ? "dark" : "light")
        }
        theme={theme}
      />

      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/4 bg-orange-100 dark:bg-gray-800 p-4 overflow-y-auto">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search tags..."
              className="w-full p-2 rounded-md bg-white dark:bg-gray-700 dark:placeholder-gray-300"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 top-2 text-gray-500 hover:text-red-500 font-bold"
              >
                ✖
              </button>
            )}
          </div>

          <div id="tagList">
            {Object.entries(tagCategories).map(([category, tags]) => (
              <div key={category} className="mb-4">
                <h3 className="font-bold text-lg mb-2 text-orange-600">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags
                    .filter((tag) =>
                      tag.toLowerCase().includes(query.toLowerCase())
                    )
                    .map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm transition"
                      >
                        &lt;{tag}&gt;
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Section */}
        <section className="flex-1 grid grid-rows-2 p-4 gap-4 overflow-y-auto">
          {/* Tag Info */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md flex items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1995/1995515.png"
                  className="w-8 h-8"
                />
                <h2 className="text-2xl font-bold text-orange-600">
                  {selectedTag ? `<${selectedTag}>` : "HTML Tag Reference"}
                </h2>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                {selectedTag
                  ? tagData[selectedTag]?.desc ||
                    "No description available."
                  : "Select a tag to learn more about it."}
              </p>

              <h3 className="font-semibold text-lg mb-2">Example:</h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-5 rounded-lg text-base overflow-x-auto">
                  <code>
                    {selectedTag
                      ? tagData[selectedTag]?.example ||
                        `<${selectedTag}>...</${selectedTag}>`
                      : `<html>\n  <head>...</head>\n  <body>...</body>\n</html>`}
                  </code>
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded text-xs hover:bg-gray-600"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            <div className="w-56 h-56 flex items-center justify-center rounded-full bg-orange-50 dark:bg-gray-700 shadow-inner">
              <model-viewer
                src={
                  selectedTag
                    ? tagData[selectedTag]?.model ||
                      "https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                    : "https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                }
                alt="3D Model"
                auto-rotate
                camera-controls
                ar
                className="w-full h-full"
              ></model-viewer>
            </div>
          </div>

          {/* Code Runner */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-3">Try it Yourself</h2>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-40 p-3 bg-gray-100 dark:bg-gray-700 rounded-md font-mono text-sm"
              placeholder="Write HTML here..."
            />
            <button
              onClick={() => {
                const iframe = document.getElementById("outputFrame");
                iframe.srcdoc = code;
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 mt-3 rounded-md text-base"
            >
              Run ▶
            </button>
            <iframe
              id="outputFrame"
              className="w-full h-48 mt-4 bg-white dark:bg-gray-900 rounded-md"
              title="output"
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
}
