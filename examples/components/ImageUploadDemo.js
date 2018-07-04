import React from 'react';

import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/es/Icon/Icon";
import Badge from "@material-ui/core/es/Badge/Badge";
import Switch from "@material-ui/core/es/Switch/Switch";
import Paper from "@material-ui/core/es/Paper/Paper";
import Table from "@material-ui/core/es/Table/Table";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import LinearProgress from "@material-ui/core/es/LinearProgress/LinearProgress";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";

import ImagePreview from "./ImagePreview";
import ImageProgress from "./ImageProgress";
import ImageResponse from "./ImageResponse";
import SelectFileButton from "./SelectFileButton";
import FileManager from '../../src/components/FileManager';
import FileUploader from '../../src/components/FileUploader';

const CLOUD_NAME = 'dpdenton';
const CLOUD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

const styles = {

    containerStyle: {
        border: 'thin solid rgb(221, 221, 221)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    controlsStyle: {
        padding: 25,
        backgroundColor: 'whitesmoke',
        textAlign: 'center',
    },
    controlStyle: {
        margin: 10,

    },
    fileStyle: {
        width: 'inherit',
        height: 150,
        border: 'thin solid #eee',
        borderRadius: 10,
        overflow: 'hidden',
        cursor: 'pointer',
    },
    wrapperStyle: {
        position: 'relative',
    },

    buttonStyle: {
        position: 'absolute',
        width: 44,
        height: 44,
        right: 16,
        bottom: 16,
    },

    progressStyle: {
        position: 'absolute',
        width: 52,
        height: 52,
        bottom: 12,
        right: 12,
        zIndex: 1,
        color: 'white',
    },

    eventContainer: {
        padding: 25,
        backgroundColor: 'whitesmoke'
    }
};

class ImageUploadDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            events: {},
            progress: {},
            selectedIndex: null,
            multiple: true,
            autoUpload: false,
            showEvents: false,
        };

        this.uploadFile = this.uploadFile.bind(this);
    }

    render() {

        const totalProgress = Object.values(this.state.progress).reduce((a, b) => a + b, 0);
        const progress = totalProgress / Object.keys(this.state.progress).length * 100 || 0;

        return (
            <div>
                <LinearProgress
                    variant={progress < 100 ? 'determinate' : 'indeterminate'}
                    value={progress}
                />

                <div style={styles.controlsStyle}>
                    <div>
                        <SelectFileButton
                            multiple={this.state.multiple}
                            onChange={event => {
                                this.setState({files: this.state.files.concat(Array.from(event.target.files))})
                            }}
                            button={(
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    style={styles.controlStyle}
                                >
                                    Select Images
                                    <Icon style={{marginLeft: 10}}>cloud_upload</Icon>
                                </Button>
                            )}
                        />
                    </div>

                    <FormControlLabel
                        style={styles.controlStyle}
                        control={
                            <Switch
                                color='primary'
                                checked={this.state.multiple}
                                onClick={() => this.setState({multiple: !this.state.multiple})}
                            />
                        }
                        label="Allow Multiple"
                    />
                    <FormControlLabel
                        style={styles.controlStyle}
                        control={
                            <Switch
                                color='primary'
                                checked={this.state.autoUpload}
                                onClick={() => this.setState({autoUpload: !this.state.autoUpload})}
                            />
                        }
                        label="Auto Upload"
                    />
                    <FormControlLabel
                        style={styles.controlStyle}
                        control={
                            <Switch
                                color='primary'
                                checked={this.state.showEvents}
                                onClick={() => this.setState({showEvents: !this.state.showEvents})}
                            />
                        }
                        label="Show Events"
                    />

                </div>

                <FileManager
                    files={this.state.files}
                >
                    {files => <div style={styles.containerStyle}>{files.map(this.uploadFile)}</div>}
                </FileManager>

                {this.state.showEvents
                && this.selectedIndex !== null
                && Object.keys(this.state.events).length > 0
                && this.renderEvents()}
            </div>
        );
    }

    uploadFile(file) {

        return (
            <FileUploader
                key={file.key}
                file={file}
                readFile
                url={CLOUD_URL}
                autoUpload={this.state.autoUpload}
                formData={{
                    file,
                    upload_preset: 'public',
                    tags: 'demo_upload',
                }}
                onUploadReady={event => {
                    const {progress} = this.state;
                    progress[file.key] = 0;
                    this.setState({progress, selectedIndex: file.key});
                    this.addTransitionState(event, FileUploader.UPLOAD_READY, file.key);
                }}
                onUploadStart={event => {
                    this.addTransitionState(event, FileUploader.UPLOAD_START, file.key);
                }}
                onUploadProgress={event => {
                    const {progress} = this.state;
                    progress[file.key] = event.total ? event.loaded / event.total : 0;
                    this.setState({progress});
                    this.addTransitionState(event, FileUploader.UPLOAD_PROGRESS, file.key);
                }}
                onUploadComplete={event => {
                    this.addTransitionState(event, FileUploader.UPLOAD_COMPLETE, file.key);
                }}
                onDownloadStart={event => {
                    this.addTransitionState(event, FileUploader.DOWNLOAD_START, file.key);
                }}
                onDownloadProgress={event => {
                    this.addTransitionState(event, FileUploader.DOWNLOAD_PROGRESS, file.key);
                }}
                onDownloadComplete={event => {
                    const {progress} = this.state;
                    delete progress[file.key];
                    this.setState({progress});
                    this.addTransitionState(event, FileUploader.DOWNLOAD_COMPLETE, file.key);
                }}

            >{data => {

                const fileContainerStyle = {
                    width: 150,
                    margin: 25,
                };

                return (
                    <div
                        style={fileContainerStyle}
                        onClick={() => {
                            this.setState({selectedIndex: file.key});
                        }}
                    >
                        <div style={styles.fileStyle}>
                            {ImageUploadDemo.renderImage(data)}
                        </div>
                        <div>
                            {ImageUploadDemo.renderButton(data)}
                        </div>

                    </div>
                );
            }}
            </FileUploader>
        )
    };

    static renderButton(data) {

        switch (data.requestState) {

            case FileUploader.UPLOAD_READY:
                return (
                    <div style={styles.wrapperStyle}>
                        <Button
                            style={styles.buttonStyle}
                            variant="fab"
                            color="primary"
                            onClick={data.uploadFile}
                        >
                            <Icon>cloud_upload</Icon>
                        </Button>
                    </div>
                );

            case FileUploader.ABORT:
            case FileUploader.UPLOAD_START:
            case FileUploader.UPLOAD_PROGRESS: {

                const progress = data.uploadProgress
                    ? Math.floor(data.uploadProgress.loaded / data.uploadProgress.total * 100)
                    : 0;

                return (
                    <div style={styles.wrapperStyle}>
                        <Button
                            style={styles.buttonStyle}
                            variant="fab"
                            color="primary"
                            onClick={data.uploadFile}
                        >
                            {progress || 0}
                        </Button>
                        <CircularProgress
                            style={styles.progressStyle}
                            size={68}
                        />
                    </div>
                );
            }

            case FileUploader.UPLOAD_COMPLETE:
            case FileUploader.DOWNLOAD_PROGRESS:
            case FileUploader.DOWNLOAD_COMPLETE:
                return (
                    <div style={styles.wrapperStyle}>
                        <Button
                            style={styles.buttonStyle}
                            variant="fab"
                            onClick={data.uploadFile}
                        >
                            <Icon>check</Icon>
                        </Button>
                    </div>
                );

            case FileUploader.ERROR:
                return <p>Error</p>;

            default:
                return <p>Something has gone wrong!</p>;
        }

    }

    static renderImage(data) {

        switch (data.requestState) {

            case FileUploader.UPLOAD_READY:
                return (
                    <ImagePreview
                        src={data.fileData || ''}
                    />
                );

            case FileUploader.UPLOAD_START:
            case FileUploader.UPLOAD_PROGRESS:
            case FileUploader.UPLOAD_COMPLETE:
            case FileUploader.ABORT: {

                const progress = data.uploadProgress
                    ? Math.floor(data.uploadProgress.loaded / data.uploadProgress.total * 100)
                    : 0;

                return (
                    <ImageProgress
                        src={data.fileData}
                        progress={progress}
                        completed={progress === 100}
                    />
                );
            }

            case FileUploader.DOWNLOAD_PROGRESS:
            case FileUploader.DOWNLOAD_COMPLETE:
                return (
                    <ImageResponse
                        cloudName={CLOUD_NAME}
                        publicId={data.response.public_id}
                        crop="fill"
                        width={180}
                        height={180}
                        quality={100}
                        flags={['progressive']}
                    />
                );
            default:
                return <p>Something has gone wrong!</p>;
        }
    }

    renderEvents() {

        return (
            <div style={styles.eventContainer}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Event Name</TableCell>
                                <TableCell>Event Object</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.events[this.state.selectedIndex]
                                .filter(event => event.eventName !== null)
                                .reduce((events, event) => {
                                    const existingEvent = events.find(t => t.eventName === event.eventName);
                                    if (existingEvent) {
                                        existingEvent.count += 1;
                                    } else {
                                        events.push({
                                            count: 1,
                                            ...event,
                                        });
                                    }
                                    return events;
                                }, [])
                                .map(event => (
                                        <TableRow key={event.eventName}>
                                            <TableCell>
                                                <Badge
                                                    color="primary"
                                                    badgeContent={event.count}
                                                    style={{marginRight: 20}}
                                                >{<span/>}</Badge>
                                                <span>{event.eventName}</span>
                                            </TableCell>
                                            <TableCell>
                                                {event.eventObject.constructor.name}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }

    addTransitionState(event, eventName, index) {

        const {events} = this.state;

        const eventState = {
            eventName,
            eventObject: event,
            eventTimestamp: +new Date(),
        };

        if (!events[index]) {
            events[index] = [eventState];
        } else {
            events[index].push(eventState);
        }

        this.setState({events})
    }
}

export default ImageUploadDemo;
