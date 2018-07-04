import React from 'react';
import PropTypes from 'prop-types';

class FileManager extends React.Component {

    constructor(props) {
        super(props);
        this.fileMap = {};
        this.addFileToMap = this.addFileToMap.bind(this);
    }

    componentWillMount() {
        this.props.files.forEach(this.addFileToMap);
    }

    componentWillReceiveProps(props) {
        props.files.forEach(this.addFileToMap);
    }

    render() {

        const keys = [];
        const files = this.props.files.filter(file => {
            const key = FileManager.generateKey(file.name + file.size + file.lastModified);
            Object.assign(file, {key});
            return keys.indexOf(key) === -1 ? keys.push(key) : false;
        });
        return this.props.children(files);
    }

    addFileToMap(file) {
        const key = FileManager.generateKey(file.name + file.size + file.lastModified);
        this.fileMap[key] = file;
    }

    static generateKey(s) {
        let hash = 0;
        if (s.length === 0) return hash;
        for (let i = 0; i < s.length; i += 1) {
            const chr   = s.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
}

FileManager.propTypes = {
    files: PropTypes.array.isRequired,
    children: PropTypes.func.isRequired
};

export default FileManager;