import { useEffect, useState } from "react";

export default function WishlistApp() {
  const [wishlistName, setWishlistName] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", link: "", note: "" });
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wishlistData = params.get("wishlist");
    if (wishlistData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(wishlistData));
        if (parsed.name) setWishlistName(parsed.name);
        if (parsed.items) setItems(parsed.items);
      } catch (e) {
        console.error("Ошибка при загрузке списка желаний:", e);
      }
    }
  }, []);

  const addItem = () => {
    if (!newItem.title.trim()) return;
    setItems([...items, { ...newItem, id: crypto.randomUUID() }]);
    setNewItem({ title: "", link: "", note: "" });
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const generateShareUrl = () => {
    const data = encodeURIComponent(JSON.stringify({ name: wishlistName, items }));
    const url = `${window.location.origin}/?wishlist=${data}`;
    setShareUrl(url);
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>🎁 Мой Вишлист</h1>

      <input
        placeholder="Название вишлиста"
        value={wishlistName}
        onChange={(e) => setWishlistName(e.target.value)}
        style={{ width: '100%', padding: 8, marginTop: 12 }}
      />

      <div style={{ marginTop: 16 }}>
        <input
          placeholder="Название подарка"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          placeholder="Ссылка (по желанию)"
          value={newItem.link}
          onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          placeholder="Комментарий (например: цвет, размер)"
          value={newItem.note}
          onChange={(e) => setNewItem({ ...newItem, note: e.target.value })}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <button onClick={addItem} style={{ width: '100%', padding: 10 }}>➕ Добавить</button>
      </div>

      <div style={{ marginTop: 20 }}>
        {items.map(item => (
          <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <div style={{ fontWeight: 'bold' }}>{item.title}</div>
            {item.note && <div style={{ fontSize: 14, color: '#555' }}>{item.note}</div>}
            {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer">Перейти к товару</a>}
            <button onClick={() => removeItem(item.id)} style={{ marginTop: 8, width: '100%' }}>Удалить</button>
          </div>
        ))}
      </div>

      <button onClick={generateShareUrl} style={{ marginTop: 16, width: '100%', padding: 10 }}>🔗 Поделиться списком</button>
      {shareUrl && (
        <div style={{ marginTop: 12, padding: 8, backgroundColor: '#f0f0f0', wordBreak: 'break-all' }}>
          <strong>Скопируй ссылку:</strong><br />
          <a href={shareUrl}>{shareUrl}</a>
        </div>
      )}
    </div>
  );
}