"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Superscript from "@tiptap/extension-superscript"
import Subscript from "@tiptap/extension-subscript"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Minus,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  SuperscriptIcon,
  SubscriptIcon,
  Undo,
  Redo,
  RemoveFormatting,
} from "lucide-react"

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-background border-b">
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-accent" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-accent" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "bg-accent" : ""}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-accent" : ""}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "bg-accent" : ""}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "bg-accent" : ""}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "bg-accent" : ""}
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-accent" : ""}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-accent" : ""}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={editor.isActive("superscript") ? "bg-accent" : ""}
      >
        <SuperscriptIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={editor.isActive("subscript") ? "bg-accent" : ""}
      >
        <SubscriptIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
        <RemoveFormatting className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => editor.chain().focus().undo().run()}>
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => editor.chain().focus().redo().run()}>
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}

interface TiptapEditorProps {
  initialContent?: string
  onChange?: (content: string) => void
  placeholder?: string
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  initialContent = "",
  onChange,
  placeholder = "Start typing...",
}) => {
  const [isMounted, setIsMounted] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, Underline, Superscript, Subscript],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "min-h-[200px] w-full focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      if (onChange) {
        onChange(html)
      }
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <MenuBar editor={editor} />
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default TiptapEditor

