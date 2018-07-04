'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _name = require('../utils/name');

var _name2 = _interopRequireDefault(_name);

var _html = require('../utils/html');

var _html2 = _interopRequireDefault(_html);

var _single = require('../utils/single');

var _single2 = _interopRequireDefault(_single);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. *
 *
 * @providesModule toHaveTagNameAssertion
 * 
 */

function toHaveTagName(enzymeWrapper, tag) {
  var wrapperHtml = (0, _html2.default)(enzymeWrapper);
  var actualTag = enzymeWrapper.name();
  var pass = actualTag === tag;

  var wrapperName = '<' + (0, _name2.default)(enzymeWrapper) + '>';

  return {
    pass: pass,
    message: 'Expected ' + wrapperName + ' node to equal (using ===) type "' + tag + '" but it is a "' + actualTag + '".',
    negatedMessage: 'Expected ' + wrapperName + ' node not to equal (using ===) type "' + tag + '" but it is that type.',
    contextualInformation: {
      actual: wrapperHtml
    }
  };
}

exports.default = (0, _single2.default)(toHaveTagName);
module.exports = exports['default'];