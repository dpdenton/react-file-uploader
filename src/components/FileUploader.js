import React from 'react';
import PropTypes from 'prop-types';

class FileUploader extends React.Component {

    static get UPLOAD_READY() {
        return 'uploadReady';
    }

    static get UPLOAD_START() {
        return 'uploadStart';
    }

    static get UPLOAD_PROGRESS() {
        return 'uploadProgress';
    }

    static get UPLOAD_COMPLETE() {
        return 'uploadComplete';
    }

    static get DOWNLOAD_START() {
        return 'downloadStart';
    }

    static get DOWNLOAD_PROGRESS() {
        return 'downloadProgress';
    }

    static get DOWNLOAD_COMPLETE() {
        return 'downloadComplete';
    }

    static get ERROR() {
        return 'error';
    }

    static get ABORT() {
        return 'abort';
    }

    static get TIMEOUT() {
        return 'timeout';
    }

    constructor(props) {
        super(props);
        this.state = {

            uploadFile: null, // (func) start file upload
            abortRequest: null, // (func) abort file upload

            uploadData: null,
            uploadStart: null,
            uploadProgress: null,
            uploadComplete: null,

            // request / response state
            request: null,
            response: null,
            error: null,
            abort: null,
            timeout: null,

            readyState: null,
            requestState: null,
        };

        this._onEvent = this._onEvent.bind(this);

        this.onUploadStart = this.onUploadStart.bind(this);
        this.onUploadProgress = this.onUploadProgress.bind(this);
        this.onUploadComplete = this.onUploadComplete.bind(this);
        this.onDownloadStart = this.onDownloadStart.bind(this);
        this.onDownloadProgress = this.onDownloadProgress.bind(this);
        this.onDownloadComplete = this.onDownloadComplete.bind(this);

        this.onError = this.onError.bind(this);
        this.onAbort = this.onAbort.bind(this);
        this.onTimeout = this.onTimeout.bind(this);
        this.onReadyStateChange = this.onReadyStateChange.bind(this);

        this.uploadFile = this.uploadFile.bind(this);
        this.abortRequest = this.abortRequest.bind(this);

        this._prepareRequest();
    }

    render() {
        return this.props.children(this.state)
    }

    componentDidMount() {

        if (this.props.readFile) {
            const reader = new global.FileReader();
            reader.onload = e => this.onUploadDataReady(e);
            reader.readAsDataURL(this.props.file);
        }

        this.onUploadReady(this.xhr);

        if (this.props.autoUpload) this.uploadFile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.autoUpload !== this.props.autoUpload) {
            if (nextProps.autoUpload) {
                this.uploadFile();
            }
        }
    }

    componentWillUnmount() {

        this.xhr.upload.removeEventListener("loadstart", this.onUploadStart);
        this.xhr.upload.removeEventListener("progress", this.onUploadProgress);
        this.xhr.upload.removeEventListener("loadend", this.onUploadComplete);
        this.xhr.removeEventListener("error", this.onError);
        this.xhr.removeEventListener("abort", this.onAbort);
        this.xhr.removeEventListener("timeout", this.onTimeout);
        this.xhr.onreadystatechange = null;
    }

    onUploadDataReady(event) {
        // don't call _event because it isn't part of the sequential request state.
        this.setState({
            uploadData: event.target.result,
        });
        this.props.onUploadDataReady(event, this.state);
    }

    onUploadReady(event) {
        // provide ref to upload file if not immediately invoked.
        const newState = !this.props.autoUpload ? {uploadFile: this.uploadFile} : {};
        this._onEvent(FileUploader.UPLOAD_READY, event, newState);
    }

    onUploadStart(event) {
        const newState = {
            request: this.xhr,
            uploadFile: null,
            abortRequest: this.abortRequest,
        };
        this._onEvent(FileUploader.UPLOAD_START, event, newState);
    }

    onUploadProgress(event) {
        this._onEvent(FileUploader.UPLOAD_PROGRESS, event);
    };

    onUploadComplete(event) {
        this._onEvent(FileUploader.UPLOAD_COMPLETE, event);
    }

    onDownloadStart(event, xhr) {
        this._onEvent(FileUploader.DOWNLOAD_START, xhr);
    }

    onDownloadProgress(event, xhr) {
        const newState = {
            response: JSON.parse(xhr.responseText),
        };
        this._onEvent(FileUploader.DOWNLOAD_PROGRESS, xhr, newState);
    }

    onDownloadComplete(event, xhr) {
        const newState = {
            response: JSON.parse(xhr.responseText),
            abortRequest: null,
        };
        this._onEvent(FileUploader.DOWNLOAD_COMPLETE, xhr, newState);
    }

    onError(event) {
        this._onEvent(FileUploader.ERROR, event);
    }

    onAbort(event) {
        const newState = {
            abortRequest: null,
        };
        this._onEvent(FileUploader.ABORT, event, newState);
    }

    onTimeout(event) {
        this._onEvent(FileUploader.TIMEOUT, event);
    }

    onReadyStateChange(event, xhr) {

        if (Number(String(xhr.status).charAt(0)) !== 2) {
            this.onError({event, xhr});
            return;
        }

        this.props.onReadyStateChange(event, xhr);

        switch (xhr.readyState) {
            case 2:
                this.onDownloadStart(event, xhr);
                break;
            case 3:
                this.onDownloadProgress(event, xhr);
                break;
            case 4:
                this.onDownloadComplete(event, xhr);
                break;
            default:
                break;
        }
    }

    abortRequest() {
        this.xhr.abort();
    };

    uploadFile() {
        const formData = new global.FormData();
        Object.keys(this.props.formData).forEach(key => formData.append(key, this.props.formData[key]));
        this.xhr.send(formData);
    };

    _prepareRequest() {

        // safe to do this before component has mounted as listeners aren't attached
        // when onreadystatechanges for 'UNSENT' and 'OPEN'.
        this.xhr = new global.XMLHttpRequest();
        this.xhr.open(this.props.method, this.props.url, true);
        Object.keys(this.props.headers).forEach(key => this.xhr.setRequestHeader(key, this.props.headers[key]));

        this.xhr.upload.addEventListener("loadstart", this.onUploadStart);
        this.xhr.upload.addEventListener("progress", this.onUploadProgress);
        this.xhr.upload.addEventListener("loadend", this.onUploadComplete);
        this.xhr.addEventListener("error", this.onError);
        this.xhr.addEventListener("abort", this.onAbort);
        this.xhr.addEventListener("timeout", this.onTimeout);

        this.xhr.onreadystatechange = event => this.onReadyStateChange(event, this.xhr);
    }

    _onEvent(eventName, event, newState = {}) {
        const eventState = {
            [eventName]: event,
            requestState: eventName,
        };
        this.props[FileUploader._onEventName(eventName)](event, this.state);
        this.setState(Object.assign(newState, eventState));
    }

    static _onEventName(eventName) {
        return `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;
    }
}

FileUploader.propTypes = {

    // File to be uploaded
    file: PropTypes.instanceOf(global.File).isRequired,

    // url to POST to
    url: PropTypes.string.isRequired,

    // upload image immediately
    autoUpload: PropTypes.bool,

    // get file contents (to display preview image etc)
    readFile: PropTypes.bool,

    // request method
    method: PropTypes.string,

    // headers
    headers: PropTypes.object,

    // form data
    formData: PropTypes.object,

    // request upload events
    onUploadDataReady: PropTypes.func,
    onUploadReady: PropTypes.func,
    onUploadStart: PropTypes.func,
    onUploadProgress: PropTypes.func,
    onUploadComplete: PropTypes.func,
    onDownloadStart: PropTypes.func,
    onDownloadProgress: PropTypes.func,
    onDownloadComplete: PropTypes.func,

    // request events
    onError: PropTypes.func,
    onAbort: PropTypes.func,
    onTimeout: PropTypes.func,

    onReadyStateChange: PropTypes.func,

    children: PropTypes.func.isRequired,
};

FileUploader.defaultProps = {

    autoUpload: false,
    readFile: true,
    method: 'POST',
    headers: {},
    formData: {},

    onUploadReady: () => {
    },
    onUploadDataReady: () => {
    },
    onUploadStart: () => {
    },
    onUploadProgress: () => {
    },
    onUploadComplete: () => {
    },
    onDownloadStart: () => {
    },
    onDownloadProgress: () => {
    },
    onDownloadComplete: () => {
    },
    onError: () => {
    },
    onAbort: () => {
    },
    onTimeout: () => {
    },
    onReadyStateChange: () => {
    },
};


export default FileUploader;
