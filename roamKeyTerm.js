// ==UserScript==
// @name         Replace (term) with a tag format
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  replace '(term)X' with a href tag and URL = (term);  CSS styling cleans up this anchor tag to have unique formatting
// @author       ddowns
// @match        https://roamresearch.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';


  function replaceTerm(mutations) {
    var textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.addEventListener('keydown', (data) => {
        if (data.key === " ") {
            //console.log("got a spacebar");
            console.log('textinput', data.target.value);
            console.log(data.target.value.substring(6));
            let termvalue = data.target.value.substring(6);
            if (data.target.value.substring(0,6) === '(term)') {
              document.querySelector('textarea').value = '[' + termvalue + '](term):';
            };
        };
      });
    };
  }
  var target = document.querySelector('body');

  // create an observer instance
  var observer = new MutationObserver(function (mutations) {
    replaceTerm(mutations);
    mutations.forEach(function (mutation) {
      console.log(mutation.type);
    });
  });

  // configuration of the observer:
  var config = { attributes: true, childList: true, characterData: true };

  // pass in the target node, as well as the observer options
  observer.observe(target, config);
})();


//CSS CALLOUT FROM USERSTYLE
//a[href="term"] {
//  color: #812EC7 !important;
//  font-weight: bold;
//  pointer-events:none;
//  cursor: default;
//}
