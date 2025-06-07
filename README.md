# Audiophile E-commerce Website

## Introduction
This project is a modern, responsive e-commerce website designed to showcase high-fidelity audio products. It provides a seamless browsing experience across various devices, featuring dynamic product displays, a functional shopping cart, and a multi-step checkout process. The application emphasizes clean UI/UX, accessibility, and robust front-end functionality.

## Features

*   **Responsive Design**: Optimized for seamless viewing and interaction across desktop, tablet, and mobile devices, utilizing CSS Grid and Flexbox for adaptive layouts.
*   **Dynamic Product Listing**: Products are dynamically loaded and rendered on category pages based on selection (e.g., Headphones, Speakers, Earphones).
*   **Product Detail Pages**: Dedicated pages for each product, displaying comprehensive information, features, items in the box, and a gallery.
*   **Interactive Shopping Cart**: Users can add products to the cart, adjust quantities, and remove items. The cart dynamically updates totals (including VAT and shipping).
*   **Multi-step Checkout Process**: A robust checkout form with client-side validation for shipping, billing, and payment details (e-Money or Cash on Delivery).
*   **Order Confirmation Modal**: A detailed order summary displayed upon successful checkout.
*   **Hamburger Mobile Navigation**: A responsive navigation menu for mobile and tablet views, allowing easy access to product categories.
*   **Image Optimization**: Utilizes `<picture>` elements for responsive image loading based on screen size.
*   **Local Web Server Integration**: Instructions for running the application using Python's built-in HTTP server to avoid CORS issues.

## Technologies Used

*   **HTML5**: Semantic markup for structuring content.
*   **CSS3**: Styling with a focus on responsive design, Flexbox, and Grid layouts.
*   **JavaScript (ES6+)**: Core client-side logic for dynamic content, cart management, and form validation.
*   **Data.json**: A local JSON file serving as a data source for product information.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Python installed on your system to run a local web server.

*   [Python 3](https://www.python.org/downloads/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    cd audiophile-ecommerce
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd <your-project-folder>
    ```
    (Replace `<your-project-folder>` with the actual name of the cloned directory, e.g., `audiophile-ecommerce`.

### Running the Application

To avoid Cross-Origin Resource Sharing (CORS) issues when loading `data.json` locally, it's recommended to run the application using a local web server.

1.  **Start the Python HTTP server**:
    ```bash
    python3 -m http.server 8000
    ```
    This will start a server on port 8000.

2.  **Open in your browser**:
    Navigate to `http://localhost:8000/index.html` in your web browser.

## Usage

*   **Home Page (`index.html`)**: Browse featured products and navigate to category pages.
*   **Category Pages (`category.html?name=<category>`)**: View products filtered by category (e.g., `headphones`, `speakers`, `earphones`).
*   **Product Detail Page (`product.html?slug=<product-slug>`)**: See detailed information about a specific product.
*   **Shopping Cart**: Click the cart icon in the header to view and manage your cart.
*   **Checkout Page (`checkout.html`)**: Complete your purchase by filling out the form.

## Project Structure

```
.
├── assets/                  # Contains all images and icons (desktop, tablet, mobile versions)
│   ├── home/
│   ├── product-xx99-mark-two-headphones/
│   └── ...
├── css/
│   └── style.css            # Main stylesheet for the application
├── data.json                # JSON data file for product information
├── js/
│   ├── cart.js              # Handles shopping cart logic
│   ├── checkout.js          # Manages checkout form validation and order summary
│   ├── dataService.js       # Functions for fetching product data
│   ├── main.js              # Main application logic and event listeners
│   └── productRenderer.js   # Renders product-related HTML elements
├── index.html               # Homepage
├── category.html            # Product category listing page
├── product.html             # Individual product detail page
├── checkout.html            # Checkout form page
└── README.md                # This file
```

## Contact

For any questions or feedback, please feel free to reach out.

[Prince Hammond/princehammond2579@gmail.com/www.linkedin.com/in/prince-hammond]

--- 