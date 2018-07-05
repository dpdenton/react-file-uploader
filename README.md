# ReactJS File Uploader

A flexible React component for uploading files. Supports multiple files, progress feedback and upload / abort controls.

<a href="https://reactjs-file-uploader.netlify.com/" target="_blank">View Live Demo</a>

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
                >
                    {this.uploadFiles}
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

| Property                        |  Type                              | Default | Description                                                                                                                                                   |
| :------------------------------ | :----:                             | :----:  | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| children<br/>_(required)_       | func: (state) => React.Node      |         | Returns state of FileUploader instance. See above example for state structure.                                                                                                                                    |
| file<br/>_(required)_           | object: File                     |         | File objects are generally retrieved from a FileList object returned as a result of a user selecting files using the <input> element, from a drag and drop operation's DataTransfer object, or from the mozGetAsFile() API on an HTMLCanvasElement.                                                                                                                                   |
| url<br/>_(required)_            | string                           |         | Upload url endpoint.                                                                                                                                  |
| formData                        | object: { key: value }           |  `{}`   | `key: value` formData to be sent with the request. If sending the file this needs to be explicit e.g. `formData={{file_field: file}}`                                                                                                                                  |
| autoUpload                      | bool                               | `false` | If `true` immediately start upload when file is passed to Component.                                                                                                                                |
| readFile                        | bool                               | `false` | If `true` provides a reference to the file data in the component state returned by `children`                                                                                                                                 |
| onUploadReady                   | func: (XMLHttpRequest) => void    |() => {} | Hook to `uploadReady` event.
| onUploadStart                   | func: (ProgressEvent) => void     |() => {} | Hook to `uploadStart` event.
| onUploadProgress                | func: (ProgressEvent) => void     |() => {} | Hook to `uploadProgress` event.
| onUploadComplete                | func: (ProgressEvent) => void      |() => {} | Hook to `uploadComplete` event.
| onDownloadStart                 | func: (Event) => void            |() => {} | Hook to `downloadStart` event.
| onDownloadComplete              | func: (Event) => void              |() => {} | Hook to `downloadComplete` event.
| onError                         | func: (Event) => void              |() => {} | Hook to `error` event.
| onAbort                         | func: (Event) => void              |() => {} | Hook to `abort` event.
| onTimeout                       | func: (Event) => void              |() => {} | Hook to `timeout` event.


## Options FileManager

The FileManager is an optional HOC that manages the files that are sent to the FileUploader.

It ensures no duplicate are sent to be uploaded and provides each file a unique key attribute.

| Property                        |  Type                              | Default | Description                                                                                                                                                   |
| :------------------------------ | :----:                             | :----:  | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| children<br/>_(required)_       | func: (file) => React.Node         |         | Returns File from Array of File objects.                                                                                                                                    |
| files<br/>_(required)_          | array: File                        |         | Array or FileList of File objects.                                                                                                                                    |


## License

MIT
