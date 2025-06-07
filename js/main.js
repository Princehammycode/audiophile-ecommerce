document.addEventListener('DOMContentLoaded', async () => {
    // --- Mobile Navigation ---
    const hamburgerButton = document.querySelector('.hamburger-icon');
    const mobileNavContainer = document.querySelector('.mobile-nav-container');
    const pageBody = document.body;

    if (hamburgerButton && mobileNavContainer) {
        hamburgerButton.addEventListener('click', () => {
            const isOpened = mobileNavContainer.classList.toggle('open');
            hamburgerButton.setAttribute('aria-expanded', isOpened);
            pageBody.style.overflow = isOpened ? 'hidden' : '';
            if(isOpened) {
                // Optional: fetch categories for mobile nav if not hardcoded
                renderMobileNavCategories();
            }
        });
    }
    // Close mobile nav if clicking outside
     document.addEventListener('click', (event) => {
         if (mobileNavContainer && mobileNavContainer.classList.contains('open')) {
             const isClickInsideNav = mobileNavContainer.contains(event.target);
             const isClickOnHamburger = hamburgerButton.contains(event.target);
             if (!isClickInsideNav && !isClickOnHamburger) {
                 mobileNavContainer.classList.remove('open');
                 hamburgerButton.setAttribute('aria-expanded', 'false');
                 pageBody.style.overflow = '';
             }
         }
     });


    async function renderMobileNavCategories() {
         const mobileNavDiv = document.querySelector('.categories-nav-mobile');
         if (!mobileNavDiv || mobileNavDiv.children.length > 0) return; // Already rendered or no container

         mobileNavDiv.innerHTML = `
             <div class="category-card">
                 <img src="assets/shared/desktop/image-category-thumbnail-headphones.png" alt="Headphones" class="category-thumb">
                 <h3>Headphones</h3>
                 <a href="category.html?name=headphones" class="shop-link">SHOP <span class="arrow">></span></a>
             </div>
             <div class="category-card">
                 <img src="assets/shared/desktop/image-category-thumbnail-speakers.png" alt="Speakers" class="category-thumb">
                 <h3>Speakers</h3>
                 <a href="category.html?name=speakers" class="shop-link">SHOP <span class="arrow">></span></a>
             </div>
             <div class="category-card">
                 <img src="assets/shared/desktop/image-category-thumbnail-earphones.png" alt="Earphones" class="category-thumb">
                 <h3>Earphones</h3>
                 <a href="category.html?name=earphones" class="shop-link">SHOP <span class="arrow">></span></a>
             </div>
         `;
         // Add click listeners to close nav after selection
         mobileNavDiv.querySelectorAll('a').forEach(link => {
             link.addEventListener('click', () => {
                 mobileNavContainer.classList.remove('open');
                 hamburgerButton.setAttribute('aria-expanded', 'false');
                 pageBody.style.overflow = '';
             });
         });
     }


    // --- Cart Modal ---
    const cartButton = document.querySelector('.cart-button');
    const cartModal = document.getElementById('cart-modal');
    const cartRemoveAllButton = document.getElementById('cart-remove-all');

    if (cartButton && cartModal) {
        cartButton.addEventListener('click', (e) => {
            e.stopPropagation();
            cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
            pageBody.style.overflow = cartModal.style.display === 'flex' ? 'hidden' : '';
            if (cartModal.style.display === 'flex') {
                renderCartModal();
            }
        });
    }
    // Close cart modal if clicking outside
    if (cartModal) {
         cartModal.addEventListener('click', (event) => {
             if (event.target === cartModal) { 
                 cartModal.style.display = 'none';
                 pageBody.style.overflow = '';
             }
         });
         // Prevent clicks inside content from closing
         const cartModalContent = cartModal.querySelector('.cart-modal-content');
         if (cartModalContent) {
             cartModalContent.addEventListener('click', (event) => event.stopPropagation());
         }
    }


    if (cartRemoveAllButton) {
        cartRemoveAllButton.addEventListener('click', () => {
            clearCart();
        });
    }

    // --- Page Specific Logic ---
    const currentPageId = document.body.id;

    if (currentPageId === 'category-page') {
        const params = new URLSearchParams(window.location.search);
        const categoryName = params.get('name');
        const productListContainer = document.getElementById('product-list-container');
        const categoryTitleEl = document.getElementById('category-title');

        // Get sample product preview elements
        const sampleProductPreview1 = document.querySelector('#sample-product-preview .product-preview');
        const sampleProductPreview2 = document.querySelector('#sample-product-preview-2 .product-preview');
        const sampleProductPreview3 = document.querySelector('#sample-product-preview-3 .product-preview');

        if (categoryName && categoryTitleEl) {
            categoryTitleEl.textContent = categoryName;
            document.title = `Audiophile - ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`;

            // Define sample product data based on category
            let sampleProducts = [];
            switch (categoryName) {
                case 'headphones':
                    sampleProducts = [
                        { slug: 'xx99-mark-two-headphones', new: true, name: 'XX99 Mark II\nHeadphones', description: 'Experience natural, lifelike audio and exceptional\nbuild quality made for the passionate music\nenthusiast.', imagePath: 'assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg' },
                        { slug: 'xx99-mark-one-headphones', new: false, name: 'XX99 Mark I\nHeadphones', description: 'As the gold standard for headphones, the XX99 Mark I offers\nuncompromised fidelity and comfort for training professionals\nand enthusiasts alike.', imagePath: 'assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg' },
                        { slug: 'xx59-headphones', new: false, name: 'XX59\nHeadphones', description: 'Enjoy your audio almost anywhere and everywhere. Built with\na durable yet lightweight body, these headphones are perfect\nfor the nomadic audio enthusiast.', imagePath: 'assets/product-xx59-headphones/desktop/image-category-page-preview.jpg' }
                    ];
                    break;
                case 'speakers':
                    sampleProducts = [
                        { slug: 'zx9-speaker', new: true, name: 'ZX9\nSpeaker', description: 'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.', imagePath: 'assets/product-zx9-speaker/desktop/image-category-page-preview.jpg' },
                        { slug: 'zx7-speaker', new: false, name: 'ZX7\nSpeaker', description: 'Streamlined design meets exceptional sound quality, making this a compact and powerful home audio solution.', imagePath: 'assets/product-zx7-speaker/desktop/image-category-page-preview.jpg' }
                    ];
                    break;
                case 'earphones':
                    sampleProducts = [
                        { slug: 'yx1-earphones', new: true, name: 'YX1 Wireless\nEarphones', description: 'Enjoy incredible sound and sleek aesthetics with these highly compact wireless earphones.', imagePath: 'assets/product-yx1-earphones/desktop/image-category-page-preview.jpg' }
                    ];
                    break;
                default:
                    // Hide sample sections or show a default message
                    if (sampleProductPreview1) sampleProductPreview1.parentElement.style.display = 'none';
                    if (sampleProductPreview2) sampleProductPreview2.parentElement.style.display = 'none';
                    if (sampleProductPreview3) sampleProductPreview3.parentElement.style.display = 'none';
            }

            // Function to update a single sample preview section
            const updateSamplePreview = (sectionElement, productData) => {
                if (!sectionElement || !productData) return;
                sectionElement.querySelector('.product-preview-image img').src = productData.imagePath;
                sectionElement.querySelector('h2').innerHTML = productData.name;
                sectionElement.querySelector('.description').textContent = productData.description;
                sectionElement.querySelector('a.btn').href = `product.html?slug=${productData.slug}`;
                // Handle 'NEW PRODUCT' label visibility
                const overline = sectionElement.querySelector('.overline');
                if (productData.new) {
                    if (overline) overline.style.display = 'block';
                } else {
                     if (overline) overline.style.display = 'none';
                }
            };

            // Update each sample preview section
            if (sampleProducts[0]) updateSamplePreview(sampleProductPreview1, sampleProducts[0]);
            if (sampleProducts[1]) updateSamplePreview(sampleProductPreview2, sampleProducts[1]);
            if (sampleProducts[2]) updateSamplePreview(sampleProductPreview3, sampleProducts[2]);


            // Load and render actual product list (existing logic)
            if (productListContainer) {
                 const products = await getProductsByCategory(categoryName);
                 console.log('Category Name:', categoryName);
                 console.log('Products fetched for category:', products);

                 if (products.length > 0) {
                     // Using the existing renderProductPreview for the main list
                     productListContainer.innerHTML = products.map((p, index) => renderProductPreview(p, index, true)).join('');
                 } else {
                     productListContainer.innerHTML = '<p>No products found in this category.</p>';
                 }
            }

        }
    } else if (currentPageId === 'product-page') {
        const params = new URLSearchParams(window.location.search);
        const productSlug = params.get('slug');
        const productDetailContainer = document.getElementById('product-detail-container');
        const featuresContainer = document.getElementById('product-features');
        const includesContainer = document.getElementById('product-includes');
        const galleryContainer = document.getElementById('product-gallery-container');
        const relatedContainer = document.getElementById('related-products-container');


        if (productSlug && productDetailContainer) {
            const product = await getProductBySlug(productSlug);
            if (product) {
                document.title = `Audiophile - ${product.name}`;
                productDetailContainer.innerHTML = renderProductDetail(product);
                if (featuresContainer) featuresContainer.innerHTML = renderProductFeatures(product.features);
                if (includesContainer) includesContainer.innerHTML = renderProductIncludes(product.includes);
                if (galleryContainer) galleryContainer.innerHTML = renderProductGallery(product.gallery, product.name);

                if (relatedContainer && product.others && product.others.length > 0) {
                    const relatedProductsHtml = await Promise.all(product.others.map(async other => {
                        const relatedProdData = await getProductBySlug(other.slug); 
                        return renderRelatedProduct(other);
                    }));
                    relatedContainer.innerHTML = relatedProductsHtml.join('');
                }


                // Add to cart and quantity logic for product page
                const quantityMinusBtn = document.getElementById('product-quantity-minus');
                const quantityPlusBtn = document.getElementById('product-quantity-plus');
                const quantityValueEl = document.getElementById('product-quantity-value');
                const addToCartBtn = document.getElementById('add-to-cart-button');

                let currentQuantity = 1;
                if(quantityValueEl) quantityValueEl.textContent = currentQuantity;


                if (quantityMinusBtn) {
                    quantityMinusBtn.addEventListener('click', () => {
                        if (currentQuantity > 1) {
                            currentQuantity--;
                            if(quantityValueEl) quantityValueEl.textContent = currentQuantity;
                        }
                    });
                }
                if (quantityPlusBtn) {
                    quantityPlusBtn.addEventListener('click', () => {
                        currentQuantity++;
                        if(quantityValueEl) quantityValueEl.textContent = currentQuantity;
                    });
                }
                if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', () => {
                        addToCart(product, currentQuantity);
                    });
                }

            } else {
                productDetailContainer.innerHTML = '<p>Product not found.</p>';
            }
        }
    }

    initCart();
    renderCartModal();
});