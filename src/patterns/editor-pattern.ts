// 编辑器的状态接口
interface EditorState {
  content: string;
  selectionStart: number;
  selectionEnd: number;
}

// 编辑器命令的基础接口
interface EditorCommand {
  execute(): void;
  undo(): void;
}

// 编辑器类
export class Editor {
  private state: EditorState;
  private history: EditorCommand[];
  private undoHistory: EditorCommand[];

  constructor(initialContent: string = "") {
    this.state = {
      content: initialContent,
      selectionStart: 0,
      selectionEnd: 0,
    };
    this.history = [];
    this.undoHistory = [];
  }

  // 获取当前内容
  getContent(): string {
    return this.state.content;
  }

  // 获取当前选择范围
  getSelection(): { start: number; end: number } {
    return {
      start: this.state.selectionStart,
      end: this.state.selectionEnd,
    };
  }

  // 执行命令
  executeCommand(command: EditorCommand): void {
    command.execute();
    this.history.push(command);
    // 清空重做历史
    this.undoHistory = [];
  }

  // 撤销操作
  undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
      this.undoHistory.push(command);
    }
  }

  // 重做操作
  redo(): void {
    const command = this.undoHistory.pop();
    if (command) {
      command.execute();
      this.history.push(command);
    }
  }

  // 更新状态
  setState(newState: Partial<EditorState>): void {
    this.state = { ...this.state, ...newState };
  }
}

// 插入文本命令
export class InsertTextCommand implements EditorCommand {
  private editor: Editor;
  private text: string;
  private oldContent: string;
  private oldSelection: { start: number; end: number };

  constructor(editor: Editor, text: string) {
    this.editor = editor;
    this.text = text;
    this.oldContent = editor.getContent();
    this.oldSelection = editor.getSelection();
  }

  execute(): void {
    const { start, end } = this.editor.getSelection();
    const content = this.editor.getContent();
    const newContent = content.slice(0, start) + this.text + content.slice(end);

    this.editor.setState({
      content: newContent,
      selectionStart: start + this.text.length,
      selectionEnd: start + this.text.length,
    });
  }

  undo(): void {
    this.editor.setState({
      content: this.oldContent,
      selectionStart: this.oldSelection.start,
      selectionEnd: this.oldSelection.end,
    });
  }
}

// 删除文本命令
export class DeleteTextCommand implements EditorCommand {
  private editor: Editor;
  private oldContent: string;
  private oldSelection: { start: number; end: number };

  constructor(editor: Editor) {
    this.editor = editor;
    this.oldContent = editor.getContent();
    this.oldSelection = editor.getSelection();
  }

  execute(): void {
    const { start, end } = this.editor.getSelection();
    const content = this.editor.getContent();

    // 如果有选中文本，删除选中部分
    if (start !== end) {
      const newContent = content.slice(0, start) + content.slice(end);

      this.editor.setState({
        content: newContent,
        selectionStart: start,
        selectionEnd: start,
      });
    }
    // 否则删除光标前的一个字符
    else if (start > 0) {
      const newContent = content.slice(0, start - 1) + content.slice(start);

      this.editor.setState({
        content: newContent,
        selectionStart: start - 1,
        selectionEnd: start - 1,
      });
    }
  }

  undo(): void {
    this.editor.setState({
      content: this.oldContent,
      selectionStart: this.oldSelection.start,
      selectionEnd: this.oldSelection.end,
    });
  }
}

// 设置选择范围命令
export class SetSelectionCommand implements EditorCommand {
  private editor: Editor;
  private newStart: number;
  private newEnd: number;
  private oldSelection: { start: number; end: number };

  constructor(editor: Editor, start: number, end: number) {
    this.editor = editor;
    this.newStart = start;
    this.newEnd = end;
    this.oldSelection = editor.getSelection();
  }

  execute(): void {
    this.editor.setState({
      selectionStart: this.newStart,
      selectionEnd: this.newEnd,
    });
  }

  undo(): void {
    this.editor.setState({
      selectionStart: this.oldSelection.start,
      selectionEnd: this.oldSelection.end,
    });
  }
}
