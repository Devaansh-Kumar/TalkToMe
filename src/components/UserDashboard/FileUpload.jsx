import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "../../firebase";
import { useUser } from "../../context/UserContext";
import { listAll, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";


function FileUpload({ setUploadedFiles }) {
  const [percent, setPercent] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const user = useUser();

  const callCloudFunction = async (file_path, user_id) => {
    console.log(file_path, user_id);
    const cloudFunctionURL =
      "https://us-central1-talktome-e4031.cloudfunctions.net/textConvert_store";
    const response = await axios.post(cloudFunctionURL, {
      file_path: file_path,
      user_id: user_id,
    }, {
      headers: {
        "Content-Type" : "application/json",
      }
    });
    console.log(response);

    setIsProcessed(true);
  };

  const getFiles = async () => {
    const listRef = ref(storage, `/${user.currentUser.uid}/`);
    console.log(listRef);
    const res = await listAll(listRef);
    console.log("this is ref", res);
    const list = [];
    res.items.forEach((file) => {
      list.push(file.name);
    });
    setUploadedFiles(list);
  };

  useEffect(() => {
    getFiles();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploading(true);
    const storageRef = ref(storage, `/${user.currentUser.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log("this is storageref", storageRef);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot.bytesTransferred ,snapshot.totalBytes)
        const p = parseFloat(snapshot.bytesTransferred / snapshot.totalBytes).toFixed(2) * 100;
          console.log(p)
        setPercent(p);
      },
      (err) => console.log(err),
      () => {
        setUploading(false);
        getFiles();
        setIsProcessed(false);
        let file_path = `gs://${storageRef.bucket}/${storageRef.fullPath}`;
        callCloudFunction(file_path, user.currentUser.uid);
        // getDownloadURL(uploadTask.snapshot.ref).then(url=> console.log(url));
      }
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <section className="">
      <div className="m-5" {...getRootProps()}>
        <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
          <span className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="font-medium text-gray-600">
              {uploading ? (
                <p> {percent} % done</p>
              ) : (
                <>
                  Drop file to upload, or
                  <span className="text-blue-600 underline"> browse</span>
                </>
              )}
            </span>
          </span>
          <input {...getInputProps()} />
        </label>
      </div>
    </section>
  );
}

export default FileUpload;
