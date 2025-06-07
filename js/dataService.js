const DATA_FILE = 'data.json';
let productData = null;

const getBaseUrl = () => {
    // Check if we're on GitHub Pages
    if (window.location.hostname.includes('github.io')) {
        // Get the repository name from the path
        const pathParts = window.location.pathname.split('/');
        const repoName = pathParts[1];
        return `/${repoName}/`;
    }
    return '/';
};

async function fetchData() {
    if (productData) {
        return productData;
    }
    try {
        const baseUrl = getBaseUrl();
        const response = await fetch(`${baseUrl}${DATA_FILE}`);
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