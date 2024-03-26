import { useState } from "react";
import "./Style.css"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles


const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    if (text.trim() !== "") {
      handleSubmit(text);
      setText("");
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: "50px" }}>
        <ReactQuill value={text}style={{height:"100px"}} onChange={setText} theme="snow" />
      </div>
      <button className="comment-form-button" disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default CommentForm;