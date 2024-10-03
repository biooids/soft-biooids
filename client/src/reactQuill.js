const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header levels
    [{ font: [] }], // Font family
    [{ size: ["small", false, "large", "huge"] }], // Font size
    [{ align: [] }], // Text alignment
    ["bold", "italic", "underline", "strike"], // Formatting buttons
    [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
    ["blockquote", "code-block"], // Blockquote and code block
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ], // Lists and indentation
    [{ color: [] }, { background: [] }], // Text and background color
    ["link", "image", "video"], // Links, images, and video embed
    ["clean"], // Remove formatting
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "align",
  "bold",
  "italic",
  "underline",
  "strike",
  "script",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "color",
  "background",
  "link",
  "image",
  "video",
];

export { modules, formats };
