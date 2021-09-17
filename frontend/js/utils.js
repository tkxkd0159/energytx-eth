function removeElementsBySelector(class_name){
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

function loadingBarStart() {

    let background = document.createElement('div');
    background.id = "loading-back"
    background.style.width = "100%"
    background.style.height = "100%"
    background.style.opacity = 1

    let loader_edge = document.body.clientWidth / 3

    let loading_img = document.createElement('div');
    loading_img.id = "loading-bar"
    loading_img.innerHTML = `<img src='../img/loading.gif' style='width:${loader_edge}px;height:${loader_edge * 3 / 4}px'/>`;

    let main_tag = document.querySelector('main')
    main_tag.appendChild(background);
    main_tag.appendChild(loading_img);
}

function loadingBarStop() {
    let background = document.querySelector('#loading-back')
    let loading_img = document.querySelector('#loading-bar')
    background.remove();
    loading_img.remove();
}

export { removeElementsBySelector, makeDisplayElement,
        hexToNum, loadingBarStart, loadingBarStop }