import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function DropZone() {
  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result
      console.log(binaryStr)
    }

    acceptedFiles.forEach(file => reader.readAsBinaryString(file))
  }, [])
  
  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} – {file.size} bytes
      </li>
  )) 

  return (
    <React.Fragment>
        <div>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} className="dropzone-input"/>
                {
                    isDragActive ?
                    <p>Drop Your Files Here...</p> :
                    <p>Drag 'n' Drop Some Files Here, or Click to Select Files</p>
                }
            </div>
            <div className="dropzone-filelist">
                <hr />
                <h4>Files</h4>
                <ul>{files}</ul>
            </div>
        </div>
    </React.Fragment>
  );
};

export default DropZone;