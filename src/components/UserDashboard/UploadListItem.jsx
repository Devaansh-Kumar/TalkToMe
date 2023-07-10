import React from 'react'
import { Link } from 'react-router-dom'

const UploadListItem = ({file,underProcessing}) => {
  

  return (
    <li className="flex justify-between items-center">
        <p>{file}</p>
        <button type="button" class={`text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2focus:outline-none dark:focus:ring-blue-800 ${underProcessing== file ? 'cursor-not-allowed bg-gray-500 hover:bg-gray-800' :" bg-blue-700 hover:bg-blue-800  dark:bg-blue-600 dark:hover:bg-blue-700 "}`} disabled={`${underProcessing == file? true:false}`}>
        <Link to={`/chat/${file.replaceAll(".", "__")}`}>
              Talk
      </Link>
        </button>
    </li>
  )
}

export default UploadListItem