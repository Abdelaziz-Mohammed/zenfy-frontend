function Toolbar({ editor }) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 border border-neutral-300 p-2 bg-gray-50">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("bold") ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer font-bold`}
        aria-label="Bold"
        aria-pressed={editor.isActive("bold")}
        title="Bold (Ctrl+B)"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("italic") ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer italic`}
        aria-label="Italic"
        aria-pressed={editor.isActive("italic")}
        title="Italic (Ctrl+I)"
      >
        i
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("strike") ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer line-through`}
        aria-label="Strikethrough"
        aria-pressed={editor.isActive("strike")}
        title="Strikethrough (Ctrl+S)"
      >
        S
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("underline") ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer underline`}
        aria-label="Underline"
        aria-pressed={editor.isActive("underline")}
        title="Underline (Ctrl+U)"
      >
        U
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("paragraph") ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer`}
        aria-label="Paragraph"
        aria-pressed={editor.isActive("paragraph")}
        title="Paragraph (Ctrl+Shift+P)"
      >
        ¶
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer font-medium`}
        aria-label="Huge Heading"
        aria-pressed={editor.isActive("heading", { level: 1 })}
        title="Huge Heading (Ctrl+Alt+1)"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer font-medium`}
        aria-label="Large Heading"
        aria-pressed={editor.isActive("heading", { level: 2 })}
        title="Large Heading (Ctrl+Alt+2)"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer font-medium`}
        aria-label="Medium Heading"
        aria-pressed={editor.isActive("heading", { level: 3 })}
        title="Medium Heading (Ctrl+Alt+3)"
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("heading", { level: 4 }) ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer font-medium`}
        aria-label="Small Heading"
        aria-pressed={editor.isActive("heading", { level: 4 })}
        title="Small Heading (Ctrl+Alt+4)"
      >
        H4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("heading", { level: 5 }) ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer font-medium`}
        aria-label="Tiny Heading"
        aria-pressed={editor.isActive("heading", { level: 5 })}
        title="Tiny Heading (Ctrl+Alt+5)"
      >
        H5
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("heading", { level: 6 }) ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer font-medium`}
        aria-label="Mini Heading"
        aria-pressed={editor.isActive("heading", { level: 6 })}
        title="Mini Heading (Ctrl+Alt+6)"
      >
        H6
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("bulletList") ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer`}
        aria-label="Bullet List"
        aria-pressed={editor.isActive("bulletList")}
        title="Bullet List (•)"
      >
        • List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("orderedList") ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer`}
        aria-label="Ordered List"
        aria-pressed={editor.isActive("orderedList")}
        title="Ordered List (1. 2. 3.)"
      >
        1. List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-1 rounded ${
          editor.isActive("blockquote") ? "bg-gray-300" : "bg-white"
        } hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer`}
        aria-label="Blockquote"
        aria-pressed={editor.isActive("blockquote")}
        title="Blockquote"
      >
        ❝
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="px-2 py-1 rounded bg-white hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer"
        aria-label="Undo"
        aria-pressed={editor.isActive("undo")}
        title="Undo (Ctrl+Z)"
      >
        ↺
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="px-2 py-1 rounded bg-white hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer"
        aria-label="Redo"
        aria-pressed={editor.isActive("redo")}
        title="Redo (Ctrl+Y)"
      >
        ↻
      </button>
    </div>
  );
}

export default Toolbar;
