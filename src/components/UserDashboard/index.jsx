import React, { useState } from "react";
import FileUpload from "./FileUpload";
import UploadListItem from "./UploadListItem";

const UserDashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  return (
    <div className='container mx-auto'>
    <div >

<h1 class="flex items-center text-5xl font-extrabold dark:text-white my-4"> Dashboard </h1>
    </div>
    <FileUpload setUploadedFiles={setUploadedFiles}/>
    <h3 class="text-3xl font-bold dark:text-white my-4">Previous Uploads</h3>
{uploadedFiles.length? (<ul class="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
    {uploadedFiles.map(file=>(<UploadListItem file={file} key={file}/>))}
</ul>) : <p>Loading...</p> }
    </div>
  );
};

export default UserDashboard;
