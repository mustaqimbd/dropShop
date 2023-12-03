import { useRef } from "react";
import JoditEditor from "jodit-react";

const JoditEdit = ({ value, setValue }) => {
  const editor = useRef(null);
  return (
    <JoditEditor
      ref={editor}
      value={value}
      onBlur={newContent => setValue(newContent)}
    />
  );
};

export default JoditEdit;
