# React File Uploader

A flexible React component for uploading files. Supports multiple files, progress feedback and upload / abort controls.

[LIVE DEMO](https://reactjs-file-uploader.netlify.com/)

Features

* Multiple files
* Progress feedback
* Upload / abort controls

## Example

```jsx
class VanillaExample extends React.Component {

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
        Initial state is null and each propert gets assigned on Event.
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
        requestState,

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
```

## Options FileUploader

| Property                        |  Type  | Description                                                                                                                                                   |
| :------------------------------ | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| children<br/>_(required)_       | func   | Returns state of FileUploader instance. See above example for state structure.                                                                                                                                    |
| file<br/>_(required)_           | File   | File objects are generally retrieved from a FileList object returned as a result of a user selecting files using the <input> element, from a drag and drop operation's DataTransfer object, or from the mozGetAsFile() API on an HTMLCanvasElement.                                                                                                                                   |
| url<br/>_(required)_            | string | Upload url endpoint.                                                                                                                                  |
| formData                        | object | Data to be sent with the request. If sending the file this needs to be explicit e.g. `formData={{file_field: file}}`                                                                                                                                  |
| readFile                        | bool   | If `true` provides a reference to the file data in the component state returned by `children`                                                                                                                                 |
| onUploadReady                   | (event, prevState) => void  | Hook to uploadReady event.
| onUploadStart                   | (event, prevState) => void  | Hook to uploadStart event.

## License

MIT
