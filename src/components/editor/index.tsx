import { UseFormReturnType } from "@mantine/form/lib/types";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const MessageEditor = (props: {
  form: UseFormReturnType<
    {
      message: string;
    },
    (values: { message: string }) => {
      message: string;
    }
  >;
}) => {
  const { form } = props;
  const editor = useEditor({
    extensions: [StarterKit, Link],
    onUpdate: ({ editor }) => {
      form.setFieldValue("message", editor.getHTML());
    },
    editorProps: {
      handleKeyDown: (view, event: KeyboardEvent) => {
        if (event.key === "Enter") {
          event.preventDefault();
          form.reset();
          console.log(form.values.message);
          view.setProps({
            state: view.state.apply(
              view.state.tr.replace(0, view.state.doc.content.size, undefined),
            ),
          });
        }
      },
    },
  });
  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};
