/*global chrome*/

console.log('Javascript code successfully injected!');

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

window.addEventListener('mouseup', ()=>{
    const selection = getSelectionText();

    localStorage.setItem('code_text',selection);
    chrome.storage.local.set({code_text: selection}).then(()=>{
        console.log(selection)
    });

    chrome.storage.local.get(['code_text']).then((result)=>{
        console.log(result.code_text);
    })
})
