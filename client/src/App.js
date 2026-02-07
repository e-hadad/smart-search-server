
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // שמירת המייל המחובר
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  const API_BASE = "http://localhost:5000";

  // האזנה לסיום התחברות מוצלח
  // useEffect(() => {
  //   const handleAuthMessage = (event) => {
  //     if (event.data.type === 'AUTH_SUCCESS') {
  //       const email = event.data.email;
  //       setUserEmail(email);
  //       localStorage.setItem('userEmail', email);
  //     }
  //   };
  //   window.addEventListener('message', handleAuthMessage);
  //   return () => window.removeEventListener('message', handleAuthMessage);
  // }, []);
useEffect(() => {
    const handleAuthMessage = (event) => {
        // חשוב לוודא שההודעה מגיעה מהשרת שלך
        if (event.data.type === 'AUTH_SUCCESS') {
            console.log("Auth Success!", event.data.email);
            setUserEmail(event.data.email);
            localStorage.setItem('userEmail', event.data.email);
            // כאן אפשר להוסיף רענון אוטומטי
            alert("התחברת בהצלחה: " + event.data.email);
        }
    };
    window.addEventListener('message', handleAuthMessage);
    return () => window.removeEventListener('message', handleAuthMessage);
}, []);
  const handleLogin = () => {
    const width = 500, height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    window.open(
      `${API_BASE}/auth/google`,
      'Google Login',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    if (!userEmail) return alert("אנא התחברי קודם באמצעות כפתור המפתח");
    
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/api/search?q=${encodeURIComponent(query)}&email=${userEmail}`
      );
      setImages(res.data);
    } catch (err) {
      console.error("Search Error:", err);
      alert("שגיאה בחיפוש: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const findSimilar = async (id, name, e) => {
    e.stopPropagation();
    if (!userEmail) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/search/similar/${id}?email=${userEmail}`);
      setImages(res.data);
      setQuery(`דומות ל: ${name}`);
    } catch (err) {
      console.error("Similar Search Error:", err);
      alert("שגיאה בחיפוש דומות");
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    if (!userEmail) return alert("אנא התחברי קודם");
    setIsSyncing(true);
    try {
      await axios.post(`${API_BASE}/drive/sync`, { email: userEmail });
      alert("הסנכרון התחיל ברקע! ✅");
    } catch (error) {
      console.error("Sync Error:", error);
      alert("שגיאה בסנכרון.");
    } finally {
      setIsSyncing(false);
    }
  };

  const downloadImage = async (id, name, e) => {
    if (e) e.stopPropagation();
    try {
      // הוספת המייל לנתיב הצפייה/הורדה
      const response = await fetch(`${API_BASE}/drive/view/${id}/${userEmail}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name || 'image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download Error:", err);
      alert("שגיאה בהורדת הקובץ");
    }
  };

  return (
    <div style={{
      padding: '20px', width: '450px', height: '600px',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Segoe UI, Tahoma, sans-serif',
      backgroundColor: '#f4f7f6', boxSizing: 'border-box'
    }} dir="rtl">
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#1f1f1f' }}>Smart Drive Search 🚀</h2>
          <p style={{ margin: 0, fontSize: '10px', color: '#666' }}>
            {userEmail ? `מחוברת כ: ${userEmail}` : 'מנוע חיפוש ויזואלי מבוסס AI'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            onClick={handleLogin}
            style={{
              padding: '6px 12px', cursor: 'pointer',
              backgroundColor: '#fff', color: '#34a853',
              border: '1px solid #dadce0', borderRadius: '16px',
              fontSize: '11px', fontWeight: 'bold', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            🔑 {userEmail ? 'החלף' : 'התחברי'}
          </button>
          <button
            onClick={handleSync}
            disabled={isSyncing}
            style={{
              padding: '6px 12px', 
              cursor: isSyncing ? 'not-allowed' : 'pointer', 
              backgroundColor: isSyncing ? '#e8eaed' : '#fff', 
              color: isSyncing ? '#9aa0a6' : '#1a73e8',
              border: '1px solid #dadce0', borderRadius: '16px',
              fontSize: '11px', fontWeight: 'bold', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            {isSyncing ? '🔄 סנכרון...' : '🔄 סנכרן'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="חפשי בתוך התמונות..."
          style={{
            flex: 1, padding: '10px 15px', borderRadius: '20px',
            border: '1px solid #dfe1e5', outline: 'none', fontSize: '14px'
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading || isSyncing}
          style={{
            padding: '8px 20px', backgroundColor: '#1a73e8', color: 'white',
            border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: '600',
            opacity: (loading || isSyncing) ? 0.7 : 1
          }}
        >
          {loading ? 'חפש...' : 'חפשי'}
        </button>
      </div>

      <div style={{
        flex: 1, overflowY: 'auto', display: 'grid',
        gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '2px'
      }}>
        {images.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedImage(img)}
            style={{
              backgroundColor: '#fff', border: '1px solid #dadce0',
              borderRadius: '8px', padding: '8px', display: 'flex',
              flexDirection: 'column', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{
              width: '100%', height: '110px', backgroundColor: '#f8f9fa',
              borderRadius: '4px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', overflow: 'hidden'
            }}>
              <img
                src={`${API_BASE}/drive/view/${img.id}/${userEmail}`}
                alt={img.name}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
              />
            </div>
            <p style={{ fontSize: '11px', margin: '8px 0', textAlign: 'center', color: '#3c4043' }}>
              {img.name}
            </p>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={(e) => findSimilar(img.id, img.name, e)}
                style={{ flex: 2, padding: '5px', fontSize: '10px', cursor: 'pointer', backgroundColor: '#e8f0fe', border: '1px solid #d2e3fc', borderRadius: '4px', color: '#1967d2', fontWeight: 'bold' }}
              >
                🔍 דומות
              </button>
              <button
                onClick={(e) => downloadImage(img.id, img.name, e)}
                style={{ flex: 1, padding: '5px', fontSize: '10px', cursor: 'pointer', border: '1px solid #dadce0', borderRadius: '4px', backgroundColor: '#fff' }}
              >
                ⬇️
              </button>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && !loading && (
        <div style={{ textAlign: 'center', marginTop: '60px', color: '#70757a' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
          <p style={{ fontSize: '13px' }}>
            {isSyncing ? "המערכת מעבדת נתונים..." : "הזיני מילת חיפוש למציאת תמונות"}
          </p>
        </div>
      )}

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(32, 33, 36, 0.95)', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
          }}
        >
          <img
            src={`${API_BASE}/drive/view/${selectedImage.id}/${userEmail}`}
            alt={selectedImage.name}
            style={{ maxWidth: '95%', maxHeight: '70vh', borderRadius: '8px', objectFit: 'contain', border: '2px solid #fff' }}
          />
          <h3 style={{ color: 'white', marginTop: '15px' }}>{selectedImage.name}</h3>
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <button
              onClick={(e) => downloadImage(selectedImage.id, selectedImage.name, e)}
              style={{ padding: '10px 25px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '24px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              הורדה למחשב
            </button>
            <button
              onClick={() => setSelectedImage(null)}
              style={{ padding: '10px 25px', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '24px', cursor: 'pointer' }}
            >
              סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;