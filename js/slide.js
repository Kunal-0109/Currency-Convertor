const nav = document.querySelector('.navigation');
const bck = document.querySelector('.bck');
const options = document.querySelectorAll('.navigation .option:not(.bck)');

options.forEach(option => {
    option.addEventListener('mouseenter', (e) => {
        const target = e.target;

        // Get dimensions and relative positioning of the hovered item
        const width = target.offsetWidth;
        const height = target.offsetHeight;
        const left = target.offsetLeft;
        const top = target.offsetTop;

        // Apply styles to the background block
        bck.style.opacity = '1';
        bck.style.width = `${width}px`;
        bck.style.height = `${height}px`;
        bck.style.transform = `translate(${left}px, ${top}px)`;
    });
});

// Hide the background pill smoothly when the mouse completely leaves the navigation bar
nav.addEventListener('mouseleave', () => {
    bck.style.opacity = '0';
    bck.style.width = '0';
});
