import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

function DropZone() {
    const [imageFiles, setImageFiles] = useState([]);
    const maxSize = 5048576;

    const {acceptedFiles, getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles
    } = useDropzone({
        accept: 'application/pdf, image/*, text/plain',
        onDrop: acceptedFiles => {
            setImageFiles(acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
            })));
        },
        minSize: 0,
        maxSize,
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
        acceptedFiles.forEach(file => URL.revokeObjectURL(file.preview));
    }, [acceptedFiles]);

    const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

    return (
        <React.Fragment>
            <div className="dropzone-container">
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} className="dropzone-input"/>
                    {!isDragActive && 'Drag \'n\' Drop Some Files Here, or Click to Select Files'}
                    {isDragActive && !isDragReject && "Drop Your Files Here..."}
                    {isDragActive && isDragReject && "File Type Not Accepted, Sorry!"}
                    {isFileTooLarge && "File is Too Large, Sorry!"}
                </div>
                <div className="dropzone-filelist">
                    <hr />
                    <h4>File List</h4>
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