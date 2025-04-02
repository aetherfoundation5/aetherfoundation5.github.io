document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-transactions');

    toggleBtn.addEventListener('click', () => {
        window.location.href = "../history/index.html";
    });
});
