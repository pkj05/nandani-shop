import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error))
  }, [])

  // WhatsApp पर आर्डर भेजने वाला फंक्शन
  const handleBuy = (productName, price) => {
    // 1. अपना मोबाइल नंबर यहाँ लिखें (91 के बाद)
    const phoneNumber = "919149796456" 
    
    // 2. मैसेज तैयार करना
    const message = `Hello, I want to buy *${productName}* Price: ₹${price}. Is it available?`
    
    // 3. WhatsApp लिंक बनाना
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    
    // 4. नई विंडो में खोलना
    window.open(whatsappUrl, '_blank')
  }
  // ✅ Search भी चलेगा और Category बटन भी
const filteredProducts = products.filter(product => {
  const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
  const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
  return matchesSearch && matchesCategory
})
/*const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))*/
  return (
    <div>
      <div className='hero'>
        <h1>Nandani Collection</h1>
        <p>Premium Suits for Elegance</p>
      </div>
      <nav className="navbar">        
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
  
</div>
       
        <input
    type="text"
    placeholder="🔍 Search suits (e.g. Red, Cotton)..."
    style={{ padding: '12px', maxWidth: '400px', fontSize: '16px', borderRadius: '25px', border: '1px solid #ddd', outline: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
      </nav>
      
{/* Category Buttons */}
<div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
  {['All', 'Party', 'Daily', 'Cotton'].map(cat => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      style={{
        padding: '8px 16px',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: selectedCategory === cat ? '#d32f2f' : '#eee', // जो सेलेक्ट है वो लाल, बाकी ग्रे
        color: selectedCategory === cat ? 'white' : 'black',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
    >
      {cat === 'All' ? 'All' : cat + ' Wear'}
    </button>
  ))}
</div>
      <div className="product-container">
        
        {filteredProducts.map((product) => (
          <div key={product.id} className="card">
            <img 
              src={`http://127.0.0.1:8000${product.image}`} 
              alt={product.name} 
            />
            <div className="card-details">
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              
              {/* --- New Logic Starts --- */}
              {product.is_sold ? (
                // अगर बिक गया है (Sold Out):
                <div style={{
                  marginTop: '10px',
                  padding: '8px',
                  backgroundColor: '#ffebee',
                  color: '#c62828',
                  borderRadius: '5px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  border: '1px solid #ef9a9a'
                }}>
                  ❌ SOLD OUT
                </div>
              ) : (
                // अगर उपलब्ध है (Buy Button):
                <button
                  className="btn"
                  onClick={() => handleBuy(product.name, product.price)}
                  style={{ 
                    marginTop: '10px', 
                    width: '100%', 
                    backgroundColor: '#25D366', 
                    color: 'white', 
                    border: 'none', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                  }}
                >
                  Buy on WhatsApp
                </button>
              )}
              {/* --- New Logic Ends --- */}
            </div>
          </div>
        ))}
      </div>
            <footer className="footer">
        <h3>Nandani Collections</h3>
        <p>✨ Premium Suits for Elegance & Style ✨</p>
        
        <p>📍 Gurugram, Haryana</p>
        
        <p>
          Follow us on Instagram: <br />
          <a href="https://instagram.com/nandani_collections" target="_blank">
            @nandani_collections 📸
          </a>
        </p>

        <p style={{ fontSize: '12px', marginTop: '20px', color: '#aaa' }}>
          © 2026 Nandani Collections. All rights reserved.
        </p>
      </footer>
      {/* Footer यहाँ ख़त्म */}

    </div> 
  )
}
    

export default App