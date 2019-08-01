import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDropzone} from 'react-dropzone';


function DropZone() {
    const [imageFiles, setImageFiles] = useState([]);
    const maxSize = 5048576;

    const cloudinary_api_key = require('./dropZoneConfig').CLOUDINARY_API_KEY;
    const cloudinary_preset = require('./dropZoneConfig').CLOUDINARY_PRESET;
    const cloudinary_url = require('./dropZoneConfig').CLOUDINARY_URL;

    const handleDrop = (files) => {
        // Push all the axios request promise into a single array
      const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", `dropZone, demo, upload`);
          formData.append("upload_preset", `${cloudinary_preset}`); // Replace the preset name with your own
          formData.append("api_key", `${cloudinary_api_key}`); // Replace API key with your own Cloudinary key
          formData.append("timestamp", (Date.now() / 1000) || 0);
          
          // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
          return axios.post(`http://api.cloudinary.com/v1_1/${cloudinary_url}/image/upload`, formData, {
              headers: { "X-Requested-With": "XMLHttpRequest" },
          }).then(response => {
              const data = response.data;
              console.log(data);

            // Once all the files are uploaded 
            axios.all(uploaders).then(() => {
                setImageFiles(files.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    // URL only works for last file in group - TO BE RESOLVED
                    fileUrl: data.secure_url
                })));
            });
          })
      });

  }

    const {acceptedFiles, getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles
    } = useDropzone({
        accept: 'image/*',
        onDrop: handleDrop,
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
                <a href={file.fileUrl}>
                    <img
                        className="dropzone-img"
                        src={file.preview}
                        alt={file.name}
                    />
                </a>
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