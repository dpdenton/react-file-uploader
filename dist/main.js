!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports.ReactImageLightbox = factory() : root.ReactImageLightbox = factory();
}(window, function() {
    /******/
    return function(modules) {
        // webpackBootstrap
        /******/ // The module cache
        /******/ var installedModules = {};
        /******/
        /******/ // The require function
        /******/        function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/ if (installedModules[moduleId]) 
            /******/ return installedModules[moduleId].exports;
            /******/
            /******/ // Create a new module (and put it into the cache)
            /******/            var module = installedModules[moduleId] = {
                /******/ i: moduleId,
                /******/ l: !1,
                /******/ exports: {}
                /******/            };
            /******/
            /******/ // Execute the module function
            /******/            
            /******/
            /******/ // Return the exports of the module
            /******/ return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            /******/
            /******/ // Flag the module as loaded
            /******/ module.l = !0, module.exports;
            /******/        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/        
        /******/
        /******/
        /******/ // Load entry module and return exports
        /******/ return __webpack_require__.m = modules, 
        /******/
        /******/ // expose the module cache
        /******/ __webpack_require__.c = installedModules, 
        /******/
        /******/ // define getter function for harmony exports
        /******/ __webpack_require__.d = function(exports, name, getter) {
            /******/ __webpack_require__.o(exports, name) || 
            /******/ Object.defineProperty(exports, name, {
                enumerable: !0,
                get: getter
            })
            /******/;
        }, 
        /******/
        /******/ // define __esModule on exports
        /******/ __webpack_require__.r = function(exports) {
            /******/ "undefined" != typeof Symbol && Symbol.toStringTag && 
            /******/ Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            })
            /******/ , Object.defineProperty(exports, "__esModule", {
                value: !0
            });
        }, 
        /******/
        /******/ // create a fake namespace object
        /******/ // mode & 1: value is a module id, require it
        /******/ // mode & 2: merge all properties of value into the ns
        /******/ // mode & 4: return value when already ns object
        /******/ // mode & 8|1: behave like require
        /******/ __webpack_require__.t = function(value, mode) {
            /******/ if (
            /******/ 1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
            /******/            if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
            /******/            var ns = Object.create(null);
            /******/            
            /******/ if (__webpack_require__.r(ns), 
            /******/ Object.defineProperty(ns, "default", {
                enumerable: !0,
                value: value
            }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
                return value[key];
            }.bind(null, key));
            /******/            return ns;
            /******/        }, 
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/ __webpack_require__.n = function(module) {
            /******/ var getter = module && module.__esModule ? 
            /******/ function() {
                return module.default;
            } : 
            /******/ function() {
                return module;
            };
            /******/            
            /******/ return __webpack_require__.d(getter, "a", getter), getter;
            /******/        }, 
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/ __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }, 
        /******/
        /******/ // __webpack_public_path__
        /******/ __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 2);
        /******/    }
    /************************************************************************/
    /******/ ([ 
    /* 0 */
    /***/ function(module, exports) {
        module.exports = require("react");
        /***/    }, 
    /* 1 */
    /***/ function(module, exports) {
        module.exports = require("prop-types");
        /***/    }, 
    /* 2 */
    /***/ function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _FileManager = __webpack_require__(3);
        Object.defineProperty(exports, "FileManager", {
            enumerable: !0,
            get: function() {
                return _interopRequireDefault(_FileManager).default;
            }
        });
        var _FileUploader = __webpack_require__(4);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        /***/        Object.defineProperty(exports, "FileUploader", {
            enumerable: !0,
            get: function() {
                return _interopRequireDefault(_FileUploader).default;
            }
        });
    }, 
    /* 3 */
    /***/ function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _react2 = _interopRequireDefault(__webpack_require__(0)), _propTypes2 = _interopRequireDefault(__webpack_require__(1));
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        var FileManager = function(_React$Component) {
            function FileManager(props) {
                !function(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }(this, FileManager);
                var _this = function(self, call) {
                    if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !call || "object" != typeof call && "function" != typeof call ? self : call;
                }(this, (FileManager.__proto__ || Object.getPrototypeOf(FileManager)).call(this, props));
                return _this.fileMap = {}, _this.addFileToMap = _this.addFileToMap.bind(_this), 
                _this;
            }
            return function(subClass, superClass) {
                if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            }(FileManager, _react2.default.Component), _createClass(FileManager, [ {
                key: "componentWillMount",
                value: function() {
                    this.props.files.forEach(this.addFileToMap);
                }
            }, {
                key: "componentWillReceiveProps",
                value: function(props) {
                    props.files.forEach(this.addFileToMap);
                }
            }, {
                key: "render",
                value: function() {
                    var keys = [], files = this.props.files.filter(function(file) {
                        var key = FileManager.generateKey(file.name + file.size + file.lastModified);
                        return -1 === keys.indexOf(key) && keys.push(key);
                    });
                    return this.props.children(files);
                }
            }, {
                key: "addFileToMap",
                value: function(file) {
                    var key = FileManager.generateKey(file.name + file.size + file.lastModified);
                    this.fileMap[key] = file;
                }
            } ], [ {
                key: "generateKey",
                value: function(s) {
                    var hash = 0;
                    if (0 === s.length) return hash;
                    for (var i = 0; i < s.length; i += 1) {
                        hash = (hash << 5) - hash + s.charCodeAt(i), hash |= 0;
                    }
                    return hash;
                }
            } ]), FileManager;
        }();
        FileManager.propTypes = {
            files: _propTypes2.default.array.isRequired,
            children: _propTypes2.default.func.isRequired
        }, exports.default = FileManager;
    }, 
    /* 4 */
    /***/ function(module, exports, __webpack_require__) {
        "use strict";
        /* WEBPACK VAR INJECTION */        
        /* WEBPACK VAR INJECTION */ (function(global) {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
            var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                    Constructor;
                };
            }(), _react2 = _interopRequireDefault(__webpack_require__(0)), _propTypes2 = _interopRequireDefault(__webpack_require__(1));
            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            }
            function _defineProperty(obj, key, value) {
                return key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : obj[key] = value, obj;
            }
            var FileUploader = function(_React$Component) {
                function FileUploader(props) {
                    !function(instance, Constructor) {
                        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                    }(this, FileUploader);
                    var _this = function(self, call) {
                        if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !call || "object" != typeof call && "function" != typeof call ? self : call;
                    }(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, props));
                    return _this.state = {
                        uploadFile: null,
                        // (func) start file upload
                        abortRequest: null,
                        // (func) abort file upload
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
                        requestState: null
                    }, _this._onEvent = _this._onEvent.bind(_this), _this.onUploadStart = _this.onUploadStart.bind(_this), 
                    _this.onUploadProgress = _this.onUploadProgress.bind(_this), _this.onUploadComplete = _this.onUploadComplete.bind(_this), 
                    _this.onDownloadStart = _this.onDownloadStart.bind(_this), _this.onDownloadProgress = _this.onDownloadProgress.bind(_this), 
                    _this.onDownloadComplete = _this.onDownloadComplete.bind(_this), _this.onError = _this.onError.bind(_this), 
                    _this.onAbort = _this.onAbort.bind(_this), _this.onTimeout = _this.onTimeout.bind(_this), 
                    _this.onReadyStateChange = _this.onReadyStateChange.bind(_this), _this.uploadFile = _this.uploadFile.bind(_this), 
                    _this.abortRequest = _this.abortRequest.bind(_this), _this._prepareRequest(), _this;
                }
                return function(subClass, superClass) {
                    if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                    subClass.prototype = Object.create(superClass && superClass.prototype, {
                        constructor: {
                            value: subClass,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
                }(FileUploader, _react2.default.Component), _createClass(FileUploader, null, [ {
                    key: "UPLOAD_READY",
                    get: function() {
                        return "uploadReady";
                    }
                }, {
                    key: "UPLOAD_START",
                    get: function() {
                        return "uploadStart";
                    }
                }, {
                    key: "UPLOAD_PROGRESS",
                    get: function() {
                        return "uploadReady";
                    }
                }, {
                    key: "UPLOAD_COMPLETE",
                    get: function() {
                        return "uploadComplete";
                    }
                }, {
                    key: "DOWNLOAD_START",
                    get: function() {
                        return "downloadStart";
                    }
                }, {
                    key: "DOWNLOAD_PROGRESS",
                    get: function() {
                        return "downloadProgress";
                    }
                }, {
                    key: "DOWNLOAD_COMPLETE",
                    get: function() {
                        return "downloadComplete";
                    }
                }, {
                    key: "ERROR",
                    get: function() {
                        return "error";
                    }
                }, {
                    key: "ABORT",
                    get: function() {
                        return "abort";
                    }
                }, {
                    key: "TIMEOUT",
                    get: function() {
                        return "timeout";
                    }
                } ]), _createClass(FileUploader, [ {
                    key: "render",
                    value: function() {
                        return this.props.children(this.state);
                    }
                }, {
                    key: "componentDidMount",
                    value: function() {
                        var _this2 = this;
                        if (this.props.readFile) {
                            var reader = new global.FileReader();
                            reader.onload = function(e) {
                                return _this2.onUploadDataReady(e);
                            }, reader.readAsDataURL(this.props.file);
                        }
                        // provide ref to upload file if not immediately invoked.
                                                return this.props.autoUpload ? this.uploadFile() : this.onUploadReady(this.xhr);
                    }
                }, {
                    key: "componentWillUnmount",
                    value: function() {
                        this.xhr.upload.removeEventListener("loadstart", this.onUploadStart), this.xhr.upload.removeEventListener("progress", this.onUploadProgress), 
                        this.xhr.upload.removeEventListener("loadend", this.onUploadComplete), this.xhr.removeEventListener("error", this.onError), 
                        this.xhr.removeEventListener("abort", this.onAbort), this.xhr.removeEventListener("timeout", this.onTimeout), 
                        this.xhr.onreadystatechange = null;
                    }
                }, {
                    key: "onUploadDataReady",
                    value: function(event) {
                        // don't call _event because it isn't part of the sequential request state.
                        this.setState({
                            uploadData: event.target.result
                        }), this.props.onUploadDataReady(event, this.state);
                    }
                }, {
                    key: "onUploadReady",
                    value: function(event) {
                        var newState = {
                            uploadFile: this.uploadFile
                        };
                        this._onEvent(FileUploader.UPLOAD_READY, event, newState);
                    }
                }, {
                    key: "onUploadStart",
                    value: function(event) {
                        var newState = {
                            request: this.xhr,
                            uploadFile: null,
                            abortRequest: this.abortRequest
                        };
                        this._onEvent(FileUploader.UPLOAD_START, event, newState);
                    }
                }, {
                    key: "onUploadProgress",
                    value: function(event) {
                        this._onEvent(FileUploader.UPLOAD_PROGRESS, event);
                    }
                }, {
                    key: "onUploadComplete",
                    value: function(event) {
                        this._onEvent(FileUploader.UPLOAD_COMPLETE, event);
                    }
                }, {
                    key: "onDownloadStart",
                    value: function(event, xhr) {
                        this._onEvent(FileUploader.DOWNLOAD_START, xhr);
                    }
                }, {
                    key: "onDownloadProgress",
                    value: function(event, xhr) {
                        var newState = {
                            response: JSON.parse(xhr.responseText)
                        };
                        this._onEvent(FileUploader.DOWNLOAD_PROGRESS, xhr, newState);
                    }
                }, {
                    key: "onDownloadComplete",
                    value: function(event, xhr) {
                        var newState = {
                            response: JSON.parse(xhr.responseText),
                            abortRequest: null
                        };
                        this._onEvent(FileUploader.DOWNLOAD_COMPLETE, xhr, newState);
                    }
                }, {
                    key: "onError",
                    value: function(event) {
                        this._onEvent(FileUploader.ERROR, event);
                    }
                }, {
                    key: "onAbort",
                    value: function(event) {
                        this._onEvent(FileUploader.ABORT, event, {
                            abortRequest: null
                        });
                    }
                }, {
                    key: "onTimeout",
                    value: function(event) {
                        this._onEvent(FileUploader.TIMEOUT, event);
                    }
                }, {
                    key: "onReadyStateChange",
                    value: function(event, xhr) {
                        if (2 === Number(String(xhr.status).charAt(0))) switch (this.props.onReadyStateChange(event, xhr), 
                        xhr.readyState) {
                          case 2:
                            this.onDownloadStart(event, xhr);
                            break;

                          case 3:
                            this.onDownloadProgress(event, xhr);
                            break;

                          case 4:
                            this.onDownloadComplete(event, xhr);
                        } else this.onError({
                            event: event,
                            xhr: xhr
                        });
                    }
                }, {
                    key: "abortRequest",
                    value: function() {
                        this.xhr.abort();
                    }
                }, {
                    key: "uploadFile",
                    value: function() {
                        var _this3 = this, formData = new global.FormData();
                        Object.keys(this.props.formData).forEach(function(key) {
                            return formData.append(key, _this3.props.formData[key]);
                        }), this.xhr.send(formData);
                    }
                }, {
                    key: "_prepareRequest",
                    value: function() {
                        var _this4 = this;
                        // safe to do this before component has mounted as listeners aren't attached
                        // when onreadystatechanges for 'UNSENT' and 'OPEN'.
                                                this.xhr = new global.XMLHttpRequest(), this.xhr.open(this.props.method, this.props.url, !0), 
                        Object.keys(this.props.headers).forEach(function(key) {
                            return _this4.xhr.setRequestHeader(key, _this4.props.headers[key]);
                        }), this.xhr.upload.addEventListener("loadstart", this.onUploadStart), this.xhr.upload.addEventListener("progress", this.onUploadProgress), 
                        this.xhr.upload.addEventListener("loadend", this.onUploadComplete), this.xhr.addEventListener("error", this.onError), 
                        this.xhr.addEventListener("abort", this.onAbort), this.xhr.addEventListener("timeout", this.onTimeout), 
                        this.xhr.onreadystatechange = function(event) {
                            return _this4.onReadyStateChange(event, _this4.xhr);
                        };
                    }
                }, {
                    key: "_onEvent",
                    value: function(eventName, event) {
                        var _eventState, newState = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, eventState = (_defineProperty(_eventState = {}, eventName, event), 
                        _defineProperty(_eventState, "requestState", eventName), _eventState);
                        this.props[FileUploader._onEventName(eventName)](event, this.state), this.setState(Object.assign(newState, eventState));
                    }
                } ], [ {
                    key: "_onEventName",
                    value: function(eventName) {
                        return "on" + (eventName.charAt(0).toUpperCase() + eventName.slice(1));
                    }
                } ]), FileUploader;
            }();
            FileUploader.propTypes = {
                // File to be uploaded
                file: _propTypes2.default.instanceOf(global.File).isRequired,
                // url to POST to
                url: _propTypes2.default.string.isRequired,
                // upload image immediately
                autoUpload: _propTypes2.default.bool,
                // get file contents (to display preview image etc)
                readFile: _propTypes2.default.bool,
                // request method
                method: _propTypes2.default.string,
                // headers
                headers: _propTypes2.default.object,
                // form data
                formData: _propTypes2.default.object,
                // request upload events
                onUploadDataReady: _propTypes2.default.func,
                onUploadReady: _propTypes2.default.func,
                onUploadStart: _propTypes2.default.func,
                onUploadProgress: _propTypes2.default.func,
                onUploadComplete: _propTypes2.default.func,
                onDownloadStart: _propTypes2.default.func,
                onDownloadProgress: _propTypes2.default.func,
                onDownloadComplete: _propTypes2.default.func,
                // request events
                onError: _propTypes2.default.func,
                onAbort: _propTypes2.default.func,
                onTimeout: _propTypes2.default.func,
                onReadyStateChange: _propTypes2.default.func,
                children: _propTypes2.default.func.isRequired
            }, FileUploader.defaultProps = {
                autoUpload: !1,
                readFile: !0,
                method: "POST",
                headers: {},
                formData: {},
                onUploadReady: function() {},
                onUploadDataReady: function() {},
                onUploadStart: function() {},
                onUploadProgress: function() {},
                onUploadComplete: function() {},
                onDownloadStart: function() {},
                onDownloadProgress: function() {},
                onDownloadComplete: function() {},
                onError: function() {},
                onAbort: function() {},
                onTimeout: function() {},
                onReadyStateChange: function() {}
            }, exports.default = FileUploader;
        }).call(this, __webpack_require__(5))
        /***/;
    }, 
    /* 5 */
    /***/ function(module, exports) {
        var g;
        // This works in non-strict mode
                g = function() {
            return this;
        }();
        try {
            // This works if eval is allowed (see CSP)
            g = g || Function("return this")() || (0, eval)("this");
        } catch (e) {
            // This works if the window reference is available
            "object" == typeof window && (g = window);
        }
        // g can still be undefined, but nothing to do about it...
        // We return undefined, instead of nothing here, so it's
        // easier to handle this case. if(!global) { ...}
                module.exports = g;
    }
    /******/ ]);
});