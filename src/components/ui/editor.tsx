import {
  Editor,
  InsertTextCommand,
  DeleteTextCommand,
  SetSelectionCommand,
} from "@/patterns/editor-pattern";
import * as React from "react";

export function TextEditor() {
  const [editor] = React.useState(() => new Editor(""));
  const [content, setContent] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // 同步编辑器状态到 React 状态
  const syncContent = () => {
    setContent(editor.getContent());
  };

  // 处理文本输入
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value.slice(content.length);
    editor.executeCommand(new InsertTextCommand(editor, newText));
    syncContent();
  };

  // 处理删除操作
  const handleDelete = () => {
    editor.executeCommand(new DeleteTextCommand(editor));
    syncContent();
  };

  // 处理选择范围变化
  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    editor.executeCommand(
      new SetSelectionCommand(
        editor,
        target.selectionStart,
        target.selectionEnd
      )
    );
  };

  // 处理撤销操作
  const handleUndo = () => {
    editor.undo();
    syncContent();
  };

  // 处理重做操作
  const handleRedo = () => {
    editor.redo();
    syncContent();
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <div className="flex gap-2">
        <button
          onClick={handleUndo}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          撤销
        </button>
        <button
          onClick={handleRedo}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          重做
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleInput}
        onKeyDown={(e) => {
          if (e.key === "Backspace") {
            e.preventDefault();
            handleDelete();
          }
        }}
        onSelect={handleSelect}
        className="w-full h-48 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="开始输入..."
      />
    </div>
  );
}
