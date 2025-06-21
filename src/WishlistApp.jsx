
import React, { useState } from 'react'

function WishlistApp() {
  const [items, setItems] = useState([])
  const [input, setInput] = useState('')

  const addItem = () => {
    if (input.trim()) {
      setItems([...items, input.trim()])
      setInput('')
    }
  }

  return (
    <div className="app">
      <h1>Wishlist</h1>
      <div className="input">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Добавь желание" />
        <button onClick={addItem}>+</button>
      </div>
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  )
}

export default WishlistApp
