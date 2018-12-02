export default function(type, text) {
    const container = document.querySelector('#prompt');
    if(!container) return;
    if(container.childNodes.length > 4) return;
    const div = document.createElement('div');
    const icon = type === 'error' ? 'close-circle' : type === 'success' ? 'checkmark-circle' : 'warning';
    container.appendChild(div);
    div.classList.add('prompt-inner', type);
    div.innerHTML = `<ion-icon name="${icon}" class="prompt-icon"></ion-icon>` + "<p>" + text + "</p>";

    setTimeout(() => {
        div.classList.add('closed', type);
        setTimeout(() => {
            div.parentElement.removeChild(div);
        }, 400);
    }, 5000);
}