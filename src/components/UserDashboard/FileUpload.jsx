import React, { useCallback, useEffect, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { storage } from '../../firebase'
import { useUser } from '../../context/UserContext'
import { getDownloadURL, getMetadata, list, listAll, ref, uploadBytesResumable } from 'firebase/storage';


function FileUpload() {
  const [percent, setPercent] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const user = useUser();

  const getFiles = async ()=>{
    const listRef = ref(storage,`/${user.currentUser.uid}/`)
    const res = await listAll(listRef)
    const list = []
    res.items.forEach((file)=>{
      list.push(file.name)
    })
    setUploadedFiles(list)
  }

  useEffect(()=>{
    getFiles()
  },[])

  const onDrop = useCallback((acceptedFiles)=>{
    const file = acceptedFiles[0];
    setUploading(true)
    const storageRef = ref(storage, `/${user.currentUser.uid}/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef,file);
    console.log(storageRef)

    uploadTask.on(
      "state_changed",
      (snapshot) =>{
        const percent = Math.round(snapshot.bytesTransferred/ snapshot.totalBytes) * 100

        setPercent(percent)
      },
      (err) => console.log(err),
      () => {
        setUploading(false);
        getFiles()
        // getDownloadURL(uploadTask.snapshot.ref).then(url=> console.log(url));
      }
    )
  },[])

  const { getRootProps, getInputProps} = useDropzone({onDrop});
  

  return (
    <section className="container">
      <div className='p-2 bg-stone-300 rounded-md'>
      <div {...getRootProps({className: 'bg-stone-300 p-5 rounded-md border-dashed border-2 border-stone-700'})}>
        <input {...getInputProps()} />
        {uploading? <p>{percent} % done </p> :<p>Drag 'n' drop some files here, or click to select files</p>}
      </div>
      </div>
      {uploadedFiles.length? uploadedFiles.map(file=>(
        <p key={file}>{file}</p>
      )
      ): <p>Loading...</p>}      
    </section>
  );
}

export default FileUpload