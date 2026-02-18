"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

import { useEffect, useState, useRef } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon,
  AlignLeft, AlignCenter, AlignRight,
  Palette, Image as ImageIcon, Link as LinkIcon,
} from "lucide-react";

export default function Editor({ value, onChange }: any) {
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Image.configure({
        inline: true,
        allowBase64: true, // Vital for showing local URL/DataURI images
      }),
      Placeholder.configure({
        placeholder: "Write your blog content here...",
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[300px]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!mounted || !editor) return null;

  
  const btn = (active: boolean) =>
    `p-2 rounded transition-colors hover:bg-gray-100 type="button" ${
      active ? "bg-gray-200 text-blue-600" : "text-gray-600"
    }`;

  return (
    <div className={`border rounded-lg bg-white shadow-sm border-gray-300`}>
      {/* Main Toolbar */}
      <div className="flex flex-wrap gap-1 border-b p-2 bg-gray-50/50 rounded-t-lg">
        {/* Basic Formatting - Notice type="button" */}
        <button type="button" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={18} />
        </button>
        <button type="button" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={18} />
        </button>
        <button type="button" className={btn(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={18} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        {/* Alignment */}
        <button type="button" className={btn(editor.isActive({ textAlign: "left" }))} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft size={18} />
        </button>
        <button type="button" className={btn(editor.isActive({ textAlign: "center" }))} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter size={18} />
        </button>
        <button type="button" className={btn(editor.isActive({ textAlign: "right" }))} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight size={18} />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        {/* Color Palette */}
        <div className="relative">
          <button type="button" className={btn(false)}>
            <Palette size={18} />
          </button>
          <input
            type="color"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          />
        </div>

        {/* Upload Image */}
        <button type="button" className={btn(false)} onClick={() => fileInputRef.current?.click()}>
          <ImageIcon size={18} />
        </button>
        <input
          type="file"
          hidden
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                editor.chain().focus().setImage({ src: reader.result as string }).run();
              };
              reader.readAsDataURL(file);
            }
          }}
        />

        {/* Link */}
       
  {/* Existing Link Button */}
  <button 
  type="button" 
  className={btn(false)} 
  onClick={() => {
    const url = prompt("Paste the image URL here:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }}
>
  <div className="relative">
    <ImageIcon size={18} className="opacity-70" />
    <LinkIcon size={10} className="absolute -bottom-1 -right-1 bg-white rounded-full text-blue-600" />
  </div>
</button>
      </div>

      
      <EditorContent editor={editor} className="cursor-text" />
    </div>
    
  );
}
