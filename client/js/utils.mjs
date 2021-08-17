function removeElementsByClass(class_name){
    const e = document.querySelectorAll(class_name);
    e.forEach(e => e.parentNode.removeChild(e))
}

function makeDisplayElement(content) {
    let p = document.createElement('p');
    p.setAttribute("class", "display")
    p.innerText = content;
    document.body.appendChild(p);
}

function hexToNum(x) {
    return parseInt(x, 16)
}

const CDN_PORT = 7777

export { removeElementsByClass, makeDisplayElement,
        hexToNum,
        CDN_PORT }