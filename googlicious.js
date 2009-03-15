/*
 * googlicious

 * googlicious is an experimental Google/Delicious search mashup that is
 * entirely self-contained.  The aim was to create an application that could
 * run inside a bookmarklet with no external dependencies other than API calls.

 * Thanks to Guy King for the mashup concept and CSS.

 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php

 * Copyright (c) 2009 Alex Rabarts and Guy King
 *
 * @author   Alex Rabarts (JavaScript)
 * @author   Guy King (CSS)
 * @version  0.1
 */

(function (global) {
  var head = document.getElementsByTagName('head')[0];

  if (!head) {
    head = document.createElement('head');
    document.appendChild(head);
  }

  var style  = document.createElement('style');
  var styles = 'body {' +
    'background-color: #000;' +
    'color: #ccc;' +
    'font: .75em/1.5em Arial, sans-serif; /* EMs calculated with pxtoem.com */' +
    'padding: 1.5em;' +
    'margin: 0;' +
  '}' +

  '.searchresult {' +
    'padding: 1.5em 0;' +
    'border-bottom: 1px solid #333;' +
  '}' +

  '.searchresult h3, .searchresult p {' +
    'margin: 0;' +
  '}' +

  '.searchresult h3 a {' +
    'font: 1em Tahoma, serif;' +
    'color:#3273D0;' +
    'font-weight: bold;' +
    'font-size: 1em;' +
  '}' +

  '.searchresult .resultdesc b {' +
    'color: #fff;' +
  '}' +

  '.searchresult .resulturl {' +
    'color: #666;' +
    'font-size: .75em;' +
  '}' +

  'div.shell {' +
    'float: left;' +
    'width: 30%;' +
    'margin-right: 1.5em;' +
  '}';

  style.type = 'text/css';
  head.appendChild(style);

  if (style.styleSheet) {
    style.styleSheet.cssText= styles;
  } else {
    style.appendChild(document.createTextNode(styles));
  }

  var body = '<form id="searchform" action="#">' +
    '<label for="searchquery">' +
      '<span class="caption">Googlicious:</span>' +
      '<input type="text" size="20" maxlength="255" title="Enter your keywords and click the search button" id="searchquery" name="searchquery" />' +
    '</label>' +
    '<input type="submit" value="Search" />' +
  '</form>';

  document.getElementsByTagName('body')[0].innerHTML = body;
  document.getElementById('searchform').onsubmit = function (e) {
    e.preventDefault();

    var query = document.getElementById('searchquery').value;

    var googleScript = document.createElement('script');
    googleScript.src = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&callback=processGoogle&rsz=large&q=' + query;
    head.appendChild(googleScript);

    var deliciousScript = document.createElement('script');
    deliciousScript.src = 'http://feeds.delicious.com/v2/json/popular/' + query + '?count=10&plain=true&callback=processDelicious';
    head.appendChild(deliciousScript);
  };

  function processGoogle(res) {
    res     = res.responseData.results;
    results = [];

    var i, r, len = res.length;

    for (i = 0; i < len; i++) {
      r = res[i];

      results.push({
        title      : r.titleNoFormatting,
        url        : r.url,
        description: r.content
      });
    }

    appendResults(results);
  }

  function processDelicious(res) {
    results = [];

    var i, r, len = res.length;

    for (i = 0; i < len; i++) {
      r = res[i];

      results.push({
        title      : r.d,
        url        : r.u,
        description: r.t.join(', ')
      });
    }

    appendResults(results);
  }

  function appendResults(results) {
    var shell = document.createElement('div');
    var html  = '';
    var len   = results.length;
    var i, r;

    for (i = 0; i < len; i++) {
      r = results[i];

      html += '<div class="searchresult">' +
        '<h3><a href="' + r.url + '">' + r.title + '</a></h3>' +
        '<p class="resultdesc">' + r.description + '</p>' +
        '<p class="resulturl">' + r.url + '</p>' +
      '</div>';
    }

    shell.innerHTML = html;
    shell.className = 'shell';
    document.getElementsByTagName('body')[0].appendChild(shell);
  }

  global.processGoogle    = processGoogle;
  global.processDelicious = processDelicious;
})(this);