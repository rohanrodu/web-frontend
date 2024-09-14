function filterCategory(category) {
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'inline-block';
        } else {
            product.style.display = 'none';
        }
    });
}

function searchProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(query)) {
            product.style.display = 'inline-block';
        } else {
            product.style.display = 'none';
        }
    });
}

function showDetails(name, image, description, price) {
    document.getElementById('modal-title').innerText = name;
    document.getElementById('modal-image').src = image;
    document.getElementById('modal-description').innerText = description;
    document.getElementById('modal-price').innerText = price;
    
    document.getElementById('product-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('product-modal')) {
        closeModal();
    }
};
