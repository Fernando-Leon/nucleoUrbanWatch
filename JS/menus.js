const btnShowRoutes = document.getElementById('router');
const listRoutes = document.getElementById('list-routes');

let statusMenu = false;

btnShowRoutes.addEventListener('click', () => {
    if (statusMenu) { 
        listRoutes.style.display = 'none'; 
        statusMenu = false;
    } 
    else {
        listRoutes.style.display = 'block';
        statusMenu = true;
    }
});

