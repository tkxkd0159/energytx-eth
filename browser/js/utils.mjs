function removeElementsByClass(class_name){
    const e = document.querySelectorAll(class_name);
    for (let i of e) {
        console.log(i.innerText)
    }
    e.forEach(e => e.parentNode.removeChild(e))
}

export { removeElementsByClass }