
import { ShoppingCart, Search, User } from 'lucide-react';
import './index.css'
const HomePage = () => {
  // Mock data for featured product and product list
  const featuredProduct = {
    name: "Featured Product",
    description: "This is our featured product with an amazing discount!",
    image: "/api/placeholder/400/300",
    price: "$99.99"
  };

  const products = [
    { id: 1, name: "Product 1", image: "/api/placeholder/200/200", price: "$19.99" },
    { id: 2, name: "Product 2", image: "/api/placeholder/200/200", price: "$29.99" },
    { id: 3, name: "Product 3", image: "/api/placeholder/200/200", price: "$39.99" },
    { id: 4, name: "Product 4", image: "/api/placeholder/200/200", price: "$49.99" },
    { id: 5, name: "Product 5", image: "/api/placeholder/200/200", price: "$59.99" },
    { id: 6, name: "Product 6", image: "/api/placeholder/200/200", price: "$69.99" },
  ];

  return (
    <div className="home-page">
      <header>
        <div className="logo">E-Shop</div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        <div className="icons">
          <Search size={20} />
          <User size={20} />
          <ShoppingCart size={20} />
        </div>
      </header>

      <main>
        <section className="featured-product">
          <img src={featuredProduct.image} alt={featuredProduct.name} />
          <div className="featured-product-info">
            <h2>{featuredProduct.name}</h2>
            <p>{featuredProduct.description}</p>
            <span className="price">{featuredProduct.price}</span>
            <button>Add to Cart</button>
          </div>
        </section>

        <section className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <span className="price">{product.price}</span>
              <button>Add to Cart</button>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <p>&copy; 2024 E-Shop. All rights reserved.</p>
      </footer>

      
    </div>
  );
};

export default HomePage;