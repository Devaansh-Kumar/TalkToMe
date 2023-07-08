import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["PDF", "MP3", "TXT"];

function FileUpload() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    console.log(file);
    setFile(file);
  };
  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={fileTypes}
      label="Drop or select a file!"
    />
  );
}

export default FileUpload;
