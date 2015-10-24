// Copyright 2015 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview Class highlighting HTML-CSS elements.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.HtmlHighlighter');

goog.require('sre.CssHighlighter');



/**
 * @constructor
 * @extends {sre.CssHighlighter}
 */
sre.HtmlHighlighter = function() {
  goog.base(this);

  this.mactionName = 'maction';

};
goog.inherits(sre.HtmlHighlighter, sre.CssHighlighter);


/**
 * Set the mode of the highlighter.
 * @param {!string} mode The mode indicator.
 */
sre.HtmlHighlighter.prototype.setMode = function(mode) {
  this.mode = mode;
};


/**
 * @override
 */
sre.HtmlHighlighter.prototype.highlightNode = function(node) {
  if (node.className.search(this.mactionName) === -1) {
    return goog.base(this, 'highlightNode', node);
  }
  var box = node.childNodes[0];
  sre.HtmlHighlighter.relativePosition_(box.nextSibling);
  var info = {node: node,
    opacity: box.style.opacity,
    background: box.style.backgroundColor,
    foreground: node.style.color};
  var color = this.color.rgb();
  box.style.backgroundColor = color.background;
  box.style.opacity = color.alphaback;
  node.style.color = color.foreground;
  return info;
};


/**
 * Sets a node position to relative.
 * @param {Node} node The node to set the position on.
 * @private
 */
sre.HtmlHighlighter.relativePosition_ = function(node) {
  if (node) node.style.position = "relative";
};


/**
 * @override
 */
sre.HtmlHighlighter.prototype.unhighlightNode = function(info) {
  if (info.node.className.search(this.mactionName) === -1) {
    goog.base(this, 'unhighlightNode', info);
    return;
  }
  var box = info.node.childNodes[0];
  box.style.backgroundColor = info.background;
  box.style.opacity = info.opacity;
  info.node.style.color = info.foreground;
};
