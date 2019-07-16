import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'

function DropZone() {
    const [imageFiles, setImageFiles] = useState([]);

    // const onDrop = useCallback(acceptedFiles => {
    //     const reader = new FileReader()

    //     reader.onabort = () => console.log('file reading was aborted')
    //     reader.onerror = () => console.log('file reading has failed')
    //     reader.onload = () => {
    //     // Do whatever you want with the file contents
    //     const binaryStr = reader.result
    //     console.log(binaryStr)
    //     }

    //     acceptedFiles.forEach(file => reader.readAsBinaryString(file))
    // }, [])

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: 'image/*, .pdf, .doc',
        onDrop: acceptedFiles => {
            setImageFiles(acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
            })));
        }
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} – {file.size} bytes
        </li>
    ));
    
    const thumbs = imageFiles.map(file => (
        <div 
            className="dropzone-thumb"
            key={file.name}
        >
        <div className="dropzone-thumbinner">
            <img
                className="dropzone-img"
                src={file.preview}
                alt={file.name}
            />
        </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

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
                <div className="dropzone-filelist">
                    <hr />
                    <h4>File Preview</h4>
                    <div className="dropzone-thumblist">
                        <ul>{thumbs}</ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DropZone;