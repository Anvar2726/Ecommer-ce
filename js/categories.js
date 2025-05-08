const categoriesRow = document.querySelector(".categories__row");

function getCategoryCard({name, image}){
    return `
    <div class="card">
        <a href="/pages/category.html" onclick="saveCategory('${name}')">
            <img src="${image}" alt="${name}" class="card-image">
        </a>
        <div class="card-content">
            <a href="/pages/category.html" onclick="saveCategory('${name}')" class="card-title">${name}</a>
        </div>
    </div>
    `;
}


categories.forEach(el => {
    categoriesRow.innerHTML += getCategoryCard(el)
});

