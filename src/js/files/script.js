function indents() {
    const header = document.querySelector('.header');
    const page = document.querySelector('.page');

    //Оступ от шапки
    let hHeader = window.getComputedStyle(header, false).height;
    hHeader = Number(hHeader.slice(0, hHeader.length - 2));
    if (page) {
        page.style.paddingTop = hHeader + 'px';
    }

}

window.addEventListener('scroll', () => {
    indents();
});

window.addEventListener('resize', () => {
    indents();
});

indents();

//========================================================================================================================================================

const closeButton = document.querySelector('.right-home__close');
if (closeButton) {
    closeButton.addEventListener('click', function (e) {
        e.preventDefault();

        const homeRight = this.closest('.home__right');
        if (homeRight) {
            homeRight.classList.add('hidden');
        }
    });
}

//========================================================================================================================================================

let input = document.querySelector('input[type="file"]');
if (input) {
    const preview = document.querySelector(".forms__previews");
    const fileList = [];
    input.addEventListener("change", onChange);
    function onChange() {
        const file = input.files[0];
        if (file) {
            const item = document.createElement("div");
            item.classList.add("forms__preview");
            const fileName = document.createElement("span");
            fileName.textContent = file.name;
            fileName.classList.add("file-name");
            const remove = document.createElement("div");
            remove.classList.add("forms__preview-close");
            const fileItem = {
                name: file.name,
                modified: file.lastModified,
                size: file.size
            };
            fileList.push(fileItem);
            remove.addEventListener("click", (() => {
                fileList.splice(fileList.indexOf(fileItem), 1);
                item.classList.add("removing");
                setTimeout((() => item.remove()), 100);
            }));
            item.appendChild(remove);
            item.appendChild(fileName);
            preview.appendChild(item);
        }
        input.value = "";
        const newInput = input.cloneNode(true);
        input.replaceWith(newInput);
        input = newInput;
        input.addEventListener("change", onChange);
    }
}