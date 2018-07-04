'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _enzyme = require('enzyme');

var _isShallowWrapper = require('../utils/isShallowWrapper');

var _isShallowWrapper2 = _interopRequireDefault(_isShallowWrapper);

var _single = require('../utils/single');

var _single2 = _interopRequireDefault(_single);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toMatchElement(actualEnzymeWrapper, reactInstance) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { ignoreProps: true };

  var expectedWrapper = void 0;
  if (!(0, _isShallowWrapper2.default)(actualEnzymeWrapper)) {
    expectedWrapper = (0, _enzyme.mount)(reactInstance);
  } else {
    expectedWrapper = (0, _enzyme.shallow)(reactInstance);
  }

  var actual = actualEnzymeWrapper.debug(options);
  var expected = expectedWrapper.debug(options);
  var pass = actual === expected;

  return {
    pass: pass,
    message: 'Expected actual value to match the expected value.',
    negatedMessage: 'Did not expect actual value to match the expected value.',
    contextualInformation: {
      actual: 'Actual:\n ' + actual,
      expected: 'Expected:\n ' + expected
    }
  };
} /**
   * This source code is licensed under the MIT-style license found in the
   * LICENSE file in the root directory of this source tree. *
   *
   * @providesModule toMatchElementAssertion
   * 
   */

exports.default = (0, _single2.default)(toMatchElement);
module.exports = exports['default'];