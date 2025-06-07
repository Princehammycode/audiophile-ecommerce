// js/productRenderer.js

function renderProductPreview(product, index, onCategoryPage = true) {
    // Determine image paths (adjust based on your asset structure)
    const imageDesktop = product.categoryImage.desktop;
    const imageTablet = product.categoryImage.tablet;
    const imageMobile = product.categoryImage.mobile;

    // For category page, alternate layout
    const orderClass = onCategoryPage && (index % 2 !== 0) ? 'product-item-reverse' : '';

    return `
        <article class="product-item ${orderClass}">
            <picture class="product-item-image-wrapper">
                <source media="(min-width: 1024px)" srcset="${imageDesktop}">
                <source media="(min-width: 768px)" srcset="${imageTablet}">
                <img src="${imageMobile}" alt="${product.name}">
            </picture>
            <div class="product-item-content">
                ${product.new ? '<p class="overline">NEW PRODUCT</p>' : ''}
                <h2>${product.name}</h2>
                <p class="product-item-description">${product.description}</p>
                <a href="product.html?slug=${product.slug}" class="btn btn-primary">SEE PRODUCT</a>
            </div>
        </article>
    `;
}

function renderProductDetail(product) {
    const imageDesktop = product.image.desktop;
    const imageTablet = product.image.tablet;
    const imageMobile = product.image.mobile;

    return `
        <div class="product-detail-layout">
            <picture class="product-detail-image-wrapper">
                <source media="(min-width: 1024px)" srcset="${imageDesktop}">
                <source media="(min-width: 768px)" srcset="${imageTablet}">
                <img src="${imageMobile}" alt="${product.name}" id="main-product-image">
            </picture>
            <div class="product-detail-content">
                ${product.new ? '<p class="overline">NEW PRODUCT</p>' : ''}
                <h1 id="product-title">${product.name}</h1>
                <p class="product-detail-description">${product.description}</p>
                <p class="product-price">$${product.price.toLocaleString()}</p>
                <div class="add-to-cart-controls">
                    <div class="quantity-control product-quantity">
                        <button class="quantity-btn minus" id="product-quantity-minus">-</button>
                        <span class="quantity-value" id="product-quantity-value">1</span>
                        <button class="quantity-btn plus" id="product-quantity-plus">+</button>
                    </div>
                    <button class="btn btn-primary" id="add-to-cart-button" data-product-id="${product.id}">ADD TO CART</button>
                </div>
            </div>
        </div>
    `;
}

function renderProductFeatures(featuresText) {
    // Split features by newline and wrap in paragraphs
    return featuresText.split('\n\n').map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`).join('');
}

function renderProductIncludes(includesArray) {
    return includesArray.map(item => `
        <li>
            <span class="include-quantity">${item.quantity}x</span>
            <span class="include-item">${item.item}</span>
        </li>
    `).join('');
}

function renderProductGallery(gallery, productName) {
    // Assuming gallery object has first, second, third keys with mobile, tablet, desktop sub-keys
    const images = [gallery.first, gallery.second, gallery.third];
    return images.map((imgSet, index) => `
        <picture class="gallery-image gallery-image-${index + 1}">
            <source media="(min-width: 1024px)" srcset="${imgSet.desktop}">
            <source media="(min-width: 768px)" srcset="${imgSet.tablet}">
            <img src="${imgSet.mobile}" alt="${productName} gallery image ${index + 1}">
        </picture>
    `).join('');
}

function renderRelatedProduct(relatedProduct) {
    // relatedProduct is an object from the 'others' array
    return `
        <div class="related-product-card">
            <picture>
                <source media="(min-width: 1024px)" srcset="${relatedProduct.image.desktop}">
                <source media="(min-width: 768px)" srcset="${relatedProduct.image.tablet}">
                <img src="${relatedProduct.image.mobile}" alt="${relatedProduct.name}">
            </picture>
            <h3>${relatedProduct.name}</h3>
            <a href="product.html?slug=${relatedProduct.slug}" class="btn btn-primary">SEE PRODUCT</a>
        </div>
    `;
}