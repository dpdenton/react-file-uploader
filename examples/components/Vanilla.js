import React from 'react';
import FileManager from "../../src/components/FileManager";
import FileUploader from "../../src/components/FileUploader";

class Vanilla extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };
        this.uploadFiles = this.uploadFiles.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    render() {
        return (
            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={event => this.setState({files: this.state.files.concat(Array.from(event.target.files))})}
                    multiple
                />
                <FileManager
                    files={this.state.files}
                >{this.uploadFiles}
                </FileManager>
            </div>
        )
    }

    uploadFiles(files) {
        return files.map(this.uploadFile);
    }

    uploadFile(file) {
        return (
            <FileUploader
                key={file.key}
                file={file}
                url='https://api.cloudinary.com/v1_1/dpdenton/upload'
                formData={{
                    file,
                    upload_preset: 'public',
                    tags: 'vanilla',
                }}
                readFile
            >
                {this.fileProgress}
            </FileUploader>
        )
    }

    static fileProgress({
        /*
        References to the Event objects.
        Initial state is null and gets assign on each Event.
         */
        uploadReady,
        uploadStart,
        uploadProgress,
        uploadComplete,
        downloadStart,
        downloadProgress,
        downloadComplete,
        error,
        abort,
        timeout,

        /*
        The sequential state of the request
        enum {
            uploadReady, uploadStart, uploadProgress, uploadComplete, downloadStart
            downloadStart, downloadProgress, downloadComplete
        }
         */
        requestState, //

        /*
        Function references to start / abort request
          */
        startUpload,
        abortRequest,

        /*
        Request Object reference (XMLHttpReqeust)
         */
        request,

        /*
        Response text Object (JSON)
         */
        response,

        /*
        Data of the file being uploaded (if readData props is true)
         */
        fileData,

     }) {
        return (
            <div>
                {fileData && <img src={fileData} width={200} alt="Preview"/>}
                {startUpload && <button onClick={startUpload}>Upload File</button>}
                {requestState && requestState}
            </div>
        )
    }

}

export default Vanilla;