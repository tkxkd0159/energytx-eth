function removeElementsByClass(class_name){
    const e = document.querySelectorAll(class_name);
    e.forEach(e => e.parentNode.removeChild(e))
}

function makeDisplayElement(content, selector) {
    let p = document.createElement('p');
    p.setAttribute("class", "display")
    p.innerText = content;
    selector.appendChild(p);
}

function hexToNum(x) {
    return parseInt(x, 16);
}



export { removeElementsByClass, makeDisplayElement,
        hexToNum }