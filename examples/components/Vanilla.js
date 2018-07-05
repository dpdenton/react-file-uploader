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
                readFile
            >{this.fileProgress}
            </FileUploader>
        )
    }

    fileProgress(data) {
        return (
            <div>
                {data.fileData && <img src={data.fileData} width={200} />}
                {data.startUpload && <button onClick={data.startUpload}>Upload File</button>}
                {data.requestState && data.requestState}
            </div>
        )
    }

}

export default Vanilla;