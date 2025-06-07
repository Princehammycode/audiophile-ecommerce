// js/dataService.js
const DATA_FILE = 'data.json';
let productData = null;

async function fetchData() {
    if (productData) {
        return productData;
    }
    try {
        const response = await fetch(DATA_FILE);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        productData = await response.json();
        return productData;
    } catch (error) {
        console.error("Could not fetch product data:", error);
        return []; // Return empty array on error
    }
}

async function getAllProducts() {
    return await fetchData();
}

async function getProductsByCategory(categoryName) {
    const data = await fetchData();
    return data.filter(product => product.category.toLowerCase() === categoryName.toLowerCase());
}

async function getProductBySlug(slug) {
    const data = await fetchData();
    return data.find(product => product.slug === slug);
}