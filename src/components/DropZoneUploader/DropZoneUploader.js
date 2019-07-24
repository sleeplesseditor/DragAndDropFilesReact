import React from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import './DropZoneUploader.css';
import Dropzone from 'react-dropzone-uploader';

function DropZoneUploader() {
    const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } };
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) };
    const handleSubmit = (files) => { console.log(files.map(f => f.meta)) };

    return (
        <div className="dropzone-uploader-container">
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="image/*, application/pdf"
                maxSizeBytes={(2000000)}
                inputContent={(files, extra) => (extra.reject ? 'Image and PDF files only' : 'Drag Files Here')}
                styles={{
                  dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                  inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                }}
            />
        </div>
    )
}

export default DropZoneUploader;