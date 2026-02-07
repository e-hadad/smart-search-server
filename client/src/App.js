// // // // // import React, { useState } from 'react';
// // // // // import axios from 'axios';

// // // // // const App = () => {
// // // // //   const [query, setQuery] = useState('');
// // // // //   const [images, setImages] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [isSyncing, setIsSyncing] = useState(false);

// // // // //   const handleSearch = async () => {
// // // // //     if (!query.trim()) return;
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await axios.get(
// // // // //         `https://smart-search-server.onrender.com/api/search?q=${encodeURIComponent(query)}`
// // // // //       );
// // // // //       setImages(res.data);
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       alert("שגיאה בחיפוש");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // פונקציה חדשה: חיפוש לפי דמיון
// // // // //   const findSimilar = async (id, name) => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await axios.get(`http://localhost:5000/api/search/similar/${id}`);
// // // // //       setImages(res.data);
// // // // //       setQuery(`דומות ל: ${name}`);
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       alert("שגיאה בחיפוש תמונות דומות");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleSync = async () => {
// // // // //     setIsSyncing(true);
// // // // //     try {
// // // // //       const response = await axios.post('http://localhost:5000/drive/sync');
// // // // //       alert(`סנכרון הושלם! נוספו ${response.data.added} תמונות חדשות.`);
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       alert("שגיאה בסנכרון");
// // // // //     } finally {
// // // // //       setIsSyncing(false);
// // // // //     }
// // // // //   };

// // // // //   const downloadImage = async (id, name) => {
// // // // //     try {
// // // // //       const response = await fetch(`http://localhost:5000/drive/view/${id}`);
// // // // //       const blob = await response.blob();
// // // // //       const url = window.URL.createObjectURL(blob);
// // // // //       const a = document.createElement('a');
// // // // //       a.href = url;
// // // // //       a.download = name || 'image.jpg';
// // // // //       document.body.appendChild(a);
// // // // //       a.click();
// // // // //       document.body.removeChild(a);
// // // // //       window.URL.revokeObjectURL(url);
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       alert("שגיאה בהורדה");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div style={{ padding: 20, fontFamily: 'Arial' }} dir="rtl">
// // // // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
// // // // //         <h2 style={{ margin: 0 }}>חיפוש תמונות חכם</h2>
// // // // //         <button 
// // // // //           onClick={handleSync} 
// // // // //           disabled={isSyncing}
// // // // //           style={{ 
// // // // //             padding: '6px 12px', 
// // // // //             cursor: 'pointer', 
// // // // //             backgroundColor: isSyncing ? '#ccc' : '#f0f0f0',
// // // // //             border: '1px solid #999',
// // // // //             borderRadius: '4px'
// // // // //           }}
// // // // //         >
// // // // //           {isSyncing ? '🔄 מסנכרן... נא להמתין' : '🔄 סנכרן דרייב'}
// // // // //         </button>
// // // // //       </div>

// // // // //       <div style={{ display: 'flex', gap: 8 }}>
// // // // //         <input
// // // // //           type="text"
// // // // //           value={query}
// // // // //           onChange={(e) => setQuery(e.target.value)}
// // // // //           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
// // // // //           placeholder="הקלידי חיפוש..."
// // // // //           style={{ flex: 1, padding: 8, border: '1px solid #ccc' }}
// // // // //         />
// // // // //         <button
// // // // //           onClick={handleSearch}
// // // // //           disabled={loading}
// // // // //           style={{
// // // // //             padding: '8px 16px',
// // // // //             cursor: 'pointer',
// // // // //             backgroundColor: '#4285f4',
// // // // //             color: 'white',
// // // // //             border: 'none',
// // // // //             fontWeight: 'bold'
// // // // //           }}
// // // // //         >
// // // // //           {loading ? 'טוען...' : 'חיפוש'}
// // // // //         </button>
// // // // //       </div>

// // // // //       <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20, justifyContent: 'center' }}>
// // // // //         {images.map((img) => (
// // // // //           <div
// // // // //             key={img.id}
// // // // //             style={{
// // // // //               width: 200,
// // // // //               margin: 10,
// // // // //               textAlign: 'center',
// // // // //               border: '1px solid #ddd',
// // // // //               padding: 8,
// // // // //               backgroundColor: '#fff',
// // // // //               borderRadius: '8px'
// // // // //             }}
// // // // //           >
// // // // //             <img
// // // // //               src={`http://localhost:5000/drive/view/${img.id}`}
// // // // //               alt={img.name}
// // // // //               style={{ width: '100%', height: 140, objectFit: 'contain', background: '#f5f5f5' }}
// // // // //             />

// // // // //             <p style={{ fontSize: 12, margin: '6px 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
// // // // //               {img.name}
// // // // //             </p>

// // // // //             <p style={{ fontSize: 11, color: '#555', marginBottom: 8 }}>
// // // // //               Similarity: {(img.score * 100).toFixed(2)}%
// // // // //             </p>

// // // // //             {/* כפתורי פעולה */}
// // // // //             <div style={{ display: 'flex', gap: 4 }}>
// // // // //               <button
// // // // //                 onClick={() => findSimilar(img.id, img.name)}
// // // // //                 style={{ flex: 1, padding: '4px', fontSize: 10, cursor: 'pointer', backgroundColor: '#e8f0fe', border: '1px solid #4285f4', borderRadius: '4px' }}
// // // // //               >
// // // // //                 🔍 דומות
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={() => downloadImage(img.id, img.name)}
// // // // //                 style={{ flex: 1, padding: '4px', fontSize: 10, cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' }}
// // // // //               >
// // // // //                 ⬇️ הורדה
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
      
// // // // //       {images.length === 0 && !loading && (
// // // // //         <p style={{ textAlign: 'center', marginTop: 30, color: '#999' }}>
// // // // //             {isSyncing ? "המערכת מעבדת תמונות חדשות מהדרייב... תוכלי לחפש בסיום." : "הזיני מילת חיפוש כדי למצוא תמונות"}
// // // // //         </p>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // // export default App;
// // // // // import React, { useState } from 'react';
// // // // // import axios from 'axios';

// // // // // const App = () => {
// // // // //   const [query, setQuery] = useState('');
// // // // //   const [images, setImages] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [isSyncing, setIsSyncing] = useState(false);
// // // // //   const [selectedImage, setSelectedImage] = useState(null);

// // // // //   // פונקציית החיפוש - תיקון ה-catch
// // // // //   const handleSearch = async () => {
// // // // //     if (!query.trim()) return;
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await axios.get(
// // // // //         `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`
// // // // //       );
// // // // //       setImages(res.data);
// // // // //     } catch (err) {
// // // // //       console.error("Search Error:", err);
// // // // //       // תיקון כאן: הצגת הודעה במקום אובייקט
// // // // //       alert("שגיאה בחיפוש: " + (err.response?.data?.error || err.message));
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // חיפוש תמונות דומות - תיקון ה-catch
// // // // //   const findSimilar = async (id, name, e) => {
// // // // //     e.stopPropagation();
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const res = await axios.get(`http://localhost:5000/api/search/similar/${id}`);
// // // // //       setImages(res.data);
// // // // //       setQuery(`דומות ל: ${name}`);
// // // // //     } catch (err) {
// // // // //       console.error("Similar Search Error:", err);
// // // // //       alert("שגיאה בחיפוש דומות: " + (err.response?.data?.error || err.message));
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // סנכרון מול גוגל דרייב - תיקון ה-catch
// // // // //   const handleSync = async () => {
// // // // //     setIsSyncing(true);
// // // // //     try {
// // // // //       const response = await axios.post('http://localhost:5000/drive/sync');
// // // // //       alert(`סנכרון הושלם! נוספו ${response.data.added} תמונות חדשות.`);
// // // // //     } catch (error) {
// // // // //       console.error("Sync Error:", error);
// // // // //       // תיקון כאן: מניעת הצגת [object Object]
// // // // //       alert("שגיאה בסנכרון: " + (error.response?.data?.error || "השרת לא מגיב"));
// // // // //     } finally {
// // // // //       setIsSyncing(false);
// // // // //     }
// // // // //   };

// // // // //   // הורדת תמונה
// // // // //   const downloadImage = async (id, name, e) => {
// // // // //     if (e) e.stopPropagation();
// // // // //     try {
// // // // //       const response = await fetch(`http://localhost:5000/drive/view/${id}`);
// // // // //       const blob = await response.blob();
// // // // //       const url = window.URL.createObjectURL(blob);
// // // // //       const a = document.createElement('a');
// // // // //       a.href = url;
// // // // //       a.download = name || 'image.jpg';
// // // // //       document.body.appendChild(a);
// // // // //       a.click();
// // // // //       document.body.removeChild(a);
// // // // //       window.URL.revokeObjectURL(url);
// // // // //     } catch (err) {
// // // // //       console.error("Download Error:", err);
// // // // //       alert("שגיאה בהורדה");
// // // // //     }
// // // // //   };
// // // // // return (
// // // // //     <div style={{ 
// // // // //       padding: '20px', 
// // // // //       width: '450px', 
// // // // //       height: '600px', 
// // // // //       display: 'flex', 
// // // // //       flexDirection: 'column', 
// // // // //       fontFamily: 'Segoe UI, Tahoma, sans-serif', 
// // // // //       backgroundColor: '#f4f7f6',
// // // // //       boxSizing: 'border-box'
// // // // //     }} dir="rtl">
      
// // // // //       {/* Header */}
// // // // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
// // // // //         <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#1f1f1f' }}>חיפוש חכם 🚀</h2>
// // // // //         <button 
// // // // //           onClick={handleSync} 
// // // // //           disabled={isSyncing}
// // // // //           style={{ 
// // // // //             padding: '5px 12px', 
// // // // //             cursor: 'pointer', 
// // // // //             backgroundColor: isSyncing ? '#eee' : '#fff', 
// // // // //             border: '1px solid #dadce0', 
// // // // //             borderRadius: '16px',
// // // // //             fontSize: '11px',
// // // // //             transition: 'all 0.2s'
// // // // //           }}
// // // // //         >
// // // // //           {isSyncing ? '🔄 מסנכרן...' : '🔄 סנכרן דרייב'}
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Search Input */}
// // // // //       <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
// // // // //         <input
// // // // //           type="text"
// // // // //           value={query}
// // // // //           onChange={(e) => setQuery(e.target.value)}
// // // // //           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
// // // // //           placeholder="מה את מחפשת היום?"
// // // // //           style={{
// // // // //             flex: 1,
// // // // //             padding: '8px 15px',
// // // // //             borderRadius: '20px',
// // // // //             border: '1px solid #dfe1e5',
// // // // //             outline: 'none',
// // // // //             fontSize: '14px',
// // // // //             boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
// // // // //           }}
// // // // //         />
// // // // //         <button
// // // // //           onClick={handleSearch}
// // // // //           disabled={loading}
// // // // //           style={{
// // // // //             padding: '8px 18px',
// // // // //             backgroundColor: '#1a73e8',
// // // // //             color: 'white',
// // // // //             border: 'none',
// // // // //             borderRadius: '20px',
// // // // //             cursor: 'pointer',
// // // // //             fontWeight: '500'
// // // // //           }}
// // // // //         >
// // // // //           {loading ? '...' : 'חפשי'}
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Results Gallery */}
// // // // //       <div style={{ 
// // // // //         flex: 1, 
// // // // //         overflowY: 'auto', 
// // // // //         display: 'grid', 
// // // // //         gridTemplateColumns: '1fr 1fr', 
// // // // //         gap: '12px',
// // // // //         padding: '2px'
// // // // //       }}>
// // // // //         {images.map((img) => (
// // // // //           <div
// // // // //             key={img.id}
// // // // //             onClick={() => setSelectedImage(img)}
// // // // //             style={{
// // // // //               backgroundColor: '#fff',
// // // // //               border: '1px solid #dadce0',
// // // // //               borderRadius: '8px',
// // // // //               padding: '8px',
// // // // //               display: 'flex',
// // // // //               flexDirection: 'column',
// // // // //               cursor: 'pointer',
// // // // //               transition: 'box-shadow 0.2s',
// // // // //               boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
// // // // //             }}
// // // // //           >
// // // // //             {/* מיכל תמונה ששומר על פרופורציות */}
// // // // //             <div style={{
// // // // //               width: '100%',
// // // // //               height: '110px',
// // // // //               backgroundColor: '#f8f9fa',
// // // // //               borderRadius: '4px',
// // // // //               display: 'flex',
// // // // //               alignItems: 'center',
// // // // //               justifyContent: 'center', // תיקון כאן: justifyContent במקום justify-content
// // // // //               overflow: 'hidden'
// // // // //             }}>
// // // // //               <img
// // // // //                 src={`http://localhost:5000/drive/view/${img.id}`}
// // // // //                 alt={img.name}
// // // // //                 style={{
// // // // //                   maxWidth: '100%',
// // // // //                   maxHeight: '100%',
// // // // //                   objectFit: 'contain'
// // // // //                 }}
// // // // //               />
// // // // //             </div>

// // // // //             <p style={{ 
// // // // //               fontSize: '11px', 
// // // // //               margin: '8px 0', 
// // // // //               whiteSpace: 'nowrap', 
// // // // //               overflow: 'hidden', 
// // // // //               textOverflow: 'ellipsis',
// // // // //               color: '#3c4043'
// // // // //             }}>
// // // // //               {img.name}
// // // // //             </p>

// // // // //             <div style={{ display: 'flex', gap: '4px' }}>
// // // // //               <button
// // // // //                 onClick={(e) => findSimilar(img.id, img.name, e)}
// // // // //                 style={{ 
// // // // //                   flex: 2, 
// // // // //                   padding: '4px', 
// // // // //                   fontSize: '10px', 
// // // // //                   cursor: 'pointer', 
// // // // //                   backgroundColor: '#f1f3f4', 
// // // // //                   border: '1px solid #dadce0', 
// // // // //                   borderRadius: '4px',
// // // // //                   color: '#1a73e8',
// // // // //                   fontWeight: 'bold'
// // // // //                 }}
// // // // //               >
// // // // //                 🔍 דומות
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={(e) => downloadImage(img.id, img.name, e)}
// // // // //                 style={{ 
// // // // //                   flex: 1,
// // // // //                   padding: '4px', 
// // // // //                   fontSize: '10px', 
// // // // //                   cursor: 'pointer', 
// // // // //                   border: '1px solid #dadce0', 
// // // // //                   borderRadius: '4px',
// // // // //                   backgroundColor: '#fff'
// // // // //                 }}
// // // // //               >
// // // // //                 ⬇️
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>

// // // // //       {/* מצבי ריק/טעינה */}
// // // // //       {images.length === 0 && !loading && (
// // // // //         <div style={{ textAlign: 'center', marginTop: '50px', color: '#70757a' }}>
// // // // //           <p style={{ fontSize: '13px' }}>
// // // // //             {isSyncing ? "המערכת מעבדת נתונים..." : "הזיני מילת חיפוש (למשל: 'כלב', 'חוף')"}
// // // // //           </p>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Modal - תצוגה מוגדלת */}
// // // // //       {selectedImage && (
// // // // //         <div 
// // // // //           onClick={() => setSelectedImage(null)}
// // // // //           style={{
// // // // //             position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
// // // // //             backgroundColor: 'rgba(32, 33, 36, 0.9)', display: 'flex', flexDirection: 'column',
// // // // //             justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
// // // // //           }}
// // // // //         >
// // // // //           <img
// // // // //             src={`http://localhost:5000/drive/view/${selectedImage.id}`}
// // // // //             alt={selectedImage.name}
// // // // //             style={{ 
// // // // //               maxWidth: '90%', 
// // // // //               maxHeight: '75vh', 
// // // // //               borderRadius: '8px',
// // // // //               boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
// // // // //               objectFit: 'contain'
// // // // //             }}
// // // // //           />
// // // // //           <p style={{ color: 'white', marginTop: '15px', fontSize: '14px' }}>{selectedImage.name}</p>
// // // // //           <div style={{ display: 'flex', gap: '10px' }}>
// // // // //             <button 
// // // // //               onClick={(e) => downloadImage(selectedImage.id, selectedImage.name, e)}
// // // // //               style={{ padding: '8px 20px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
// // // // //             >
// // // // //               הורדה
// // // // //             </button>
// // // // //             <button 
// // // // //               onClick={() => setSelectedImage(null)}
// // // // //               style={{ padding: '8px 20px', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px', cursor: 'pointer' }}
// // // // //             >
// // // // //               סגור
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default App;

// // // // import React, { useState } from 'react';
// // // // import axios from 'axios';

// // // // const App = () => {
// // // //   const [query, setQuery] = useState('');
// // // //   const [images, setImages] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [isSyncing, setIsSyncing] = useState(false);
// // // //   const [selectedImage, setSelectedImage] = useState(null);

// // // //   // פונקציית החיפוש - תיקון ה-catch
// // // //   const handleSearch = async () => {
// // // //     if (!query.trim()) return;
// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await axios.get(
// // // //         `https://localhost:5000/api/search?q=${encodeURIComponent(query)}`
// // // //       );
// // // //       setImages(res.data);
// // // //     } catch (err) {
// // // //       console.error("Search Error:", err);
// // // //       // תיקון כאן: הצגת הודעה במקום אובייקט
// // // //       alert("שגיאה בחיפוש: " + (err.response?.data?.error || err.message));
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // חיפוש תמונות דומות - תיקון ה-catch
// // // //   const findSimilar = async (id, name, e) => {
// // // //     e.stopPropagation();
// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await axios.get(`https://localhost:5000/api/search/similar/${id}`);
// // // //       setImages(res.data);
// // // //       setQuery(`דומות ל: ${name}`);
// // // //     } catch (err) {
// // // //       console.error("Similar Search Error:", err);
// // // //       alert("שגיאה בחיפוש דומות: " + (err.response?.data?.error || err.message));
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // סנכרון מול גוגל דרייב - תיקון ה-catch
// // // //   const handleSync = async () => {
// // // //     setIsSyncing(true);
// // // //     try {
// // // //       const response = await axios.post('https://localhost:5000/drive/sync');
// // // //       alert(`סנכרון הושלם! נוספו ${response.data.added} תמונות חדשות.`);
// // // //     } catch (error) {
// // // //       console.error("Sync Error:", error);
// // // //       // תיקון כאן: מניעת הצגת [object Object]
// // // //       alert("שגיאה בסנכרון: " + (error.response?.data?.error || "השרת לא מגיב"));
// // // //     } finally {
// // // //       setIsSyncing(false);
// // // //     }
// // // //   };

// // // //   // הורדת תמונה
// // // //   const downloadImage = async (id, name, e) => {
// // // //     if (e) e.stopPropagation();
// // // //     try {
// // // //       const response = await fetch(`https://localhost:5000/drive/view/${id}`);
// // // //       const blob = await response.blob();
// // // //       const url = window.URL.createObjectURL(blob);
// // // //       const a = document.createElement('a');
// // // //       a.href = url;
// // // //       a.download = name || 'image.jpg';
// // // //       document.body.appendChild(a);
// // // //       a.click();
// // // //       document.body.removeChild(a);
// // // //       window.URL.revokeObjectURL(url);
// // // //     } catch (err) {
// // // //       console.error("Download Error:", err);
// // // //       alert("שגיאה בהורדה");
// // // //     }
// // // //   };
// // // // return (
// // // //     <div style={{ 
// // // //       padding: '20px', 
// // // //       width: '450px', 
// // // //       height: '600px', 
// // // //       display: 'flex', 
// // // //       flexDirection: 'column', 
// // // //       fontFamily: 'Segoe UI, Tahoma, sans-serif', 
// // // //       backgroundColor: '#f4f7f6',
// // // //       boxSizing: 'border-box'
// // // //     }} dir="rtl">
      
// // // //       {/* Header */}
// // // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
// // // //         <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#1f1f1f' }}>חיפוש חכם 🚀</h2>
// // // //         <button 
// // // //           onClick={handleSync} 
// // // //           disabled={isSyncing}
// // // //           style={{ 
// // // //             padding: '5px 12px', 
// // // //             cursor: 'pointer', 
// // // //             backgroundColor: isSyncing ? '#eee' : '#fff', 
// // // //             border: '1px solid #dadce0', 
// // // //             borderRadius: '16px',
// // // //             fontSize: '11px',
// // // //             transition: 'all 0.2s'
// // // //           }}
// // // //         >
// // // //           {isSyncing ? '🔄 מסנכרן...' : '🔄 סנכרן דרייב'}
// // // //         </button>
// // // //       </div>

// // // //       {/* Search Input */}
// // // //       <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
// // // //         <input
// // // //           type="text"
// // // //           value={query}
// // // //           onChange={(e) => setQuery(e.target.value)}
// // // //           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
// // // //           placeholder="מה את מחפשת היום?"
// // // //           style={{
// // // //             flex: 1,
// // // //             padding: '8px 15px',
// // // //             borderRadius: '20px',
// // // //             border: '1px solid #dfe1e5',
// // // //             outline: 'none',
// // // //             fontSize: '14px',
// // // //             boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
// // // //           }}
// // // //         />
// // // //         <button
// // // //           onClick={handleSearch}
// // // //           disabled={loading}
// // // //           style={{
// // // //             padding: '8px 18px',
// // // //             backgroundColor: '#1a73e8',
// // // //             color: 'white',
// // // //             border: 'none',
// // // //             borderRadius: '20px',
// // // //             cursor: 'pointer',
// // // //             fontWeight: '500'
// // // //           }}
// // // //         >
// // // //           {loading ? '...' : 'חפשי'}
// // // //         </button>
// // // //       </div>

// // // //       {/* Results Gallery */}
// // // //       <div style={{ 
// // // //         flex: 1, 
// // // //         overflowY: 'auto', 
// // // //         display: 'grid', 
// // // //         gridTemplateColumns: '1fr 1fr', 
// // // //         gap: '12px',
// // // //         padding: '2px'
// // // //       }}>
// // // //         {images.map((img) => (
// // // //           <div
// // // //             key={img.id}
// // // //             onClick={() => setSelectedImage(img)}
// // // //             style={{
// // // //               backgroundColor: '#fff',
// // // //               border: '1px solid #dadce0',
// // // //               borderRadius: '8px',
// // // //               padding: '8px',
// // // //               display: 'flex',
// // // //               flexDirection: 'column',
// // // //               cursor: 'pointer',
// // // //               transition: 'box-shadow 0.2s',
// // // //               boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
// // // //             }}
// // // //           >
// // // //             {/* מיכל תמונה ששומר על פרופורציות */}
// // // //             <div style={{
// // // //               width: '100%',
// // // //               height: '110px',
// // // //               backgroundColor: '#f8f9fa',
// // // //               borderRadius: '4px',
// // // //               display: 'flex',
// // // //               alignItems: 'center',
// // // //               justifyContent: 'center', // תיקון כאן: justifyContent במקום justify-content
// // // //               overflow: 'hidden'
// // // //             }}>
// // // //               <img
// // // //                 src={`https://localhost:5000/drive/view/${img.id}`}
// // // //                 alt={img.name}
// // // //                 style={{
// // // //                   maxWidth: '100%',
// // // //                   maxHeight: '100%',
// // // //                   objectFit: 'contain'
// // // //                 }}
// // // //               />
// // // //             </div>

// // // //             <p style={{ 
// // // //               fontSize: '11px', 
// // // //               margin: '8px 0', 
// // // //               whiteSpace: 'nowrap', 
// // // //               overflow: 'hidden', 
// // // //               textOverflow: 'ellipsis',
// // // //               color: '#3c4043'
// // // //             }}>
// // // //               {img.name}
// // // //             </p>

// // // //             <div style={{ display: 'flex', gap: '4px' }}>
// // // //               <button
// // // //                 onClick={(e) => findSimilar(img.id, img.name, e)}
// // // //                 style={{ 
// // // //                   flex: 2, 
// // // //                   padding: '4px', 
// // // //                   fontSize: '10px', 
// // // //                   cursor: 'pointer', 
// // // //                   backgroundColor: '#f1f3f4', 
// // // //                   border: '1px solid #dadce0', 
// // // //                   borderRadius: '4px',
// // // //                   color: '#1a73e8',
// // // //                   fontWeight: 'bold'
// // // //                 }}
// // // //               >
// // // //                 🔍 דומות
// // // //               </button>
// // // //               <button
// // // //                 onClick={(e) => downloadImage(img.id, img.name, e)}
// // // //                 style={{ 
// // // //                   flex: 1,
// // // //                   padding: '4px', 
// // // //                   fontSize: '10px', 
// // // //                   cursor: 'pointer', 
// // // //                   border: '1px solid #dadce0', 
// // // //                   borderRadius: '4px',
// // // //                   backgroundColor: '#fff'
// // // //                 }}
// // // //               >
// // // //                 ⬇️
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>

// // // //       {/* מצבי ריק/טעינה */}
// // // //       {images.length === 0 && !loading && (
// // // //         <div style={{ textAlign: 'center', marginTop: '50px', color: '#70757a' }}>
// // // //           <p style={{ fontSize: '13px' }}>
// // // //             {isSyncing ? "המערכת מעבדת נתונים..." : "הזיני מילת חיפוש (למשל: 'כלב', 'חוף')"}
// // // //           </p>
// // // //         </div>
// // // //       )}

// // // //       {/* Modal - תצוגה מוגדלת */}
// // // //       {selectedImage && (
// // // //         <div 
// // // //           onClick={() => setSelectedImage(null)}
// // // //           style={{
// // // //             position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
// // // //             backgroundColor: 'rgba(32, 33, 36, 0.9)', display: 'flex', flexDirection: 'column',
// // // //             justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
// // // //           }}
// // // //         >
// // // //           <img
// // // //             src={`http://localhost:5000/drive/view/${selectedImage.id}`}
// // // //             alt={selectedImage.name}
// // // //             style={{ 
// // // //               maxWidth: '90%', 
// // // //               maxHeight: '75vh', 
// // // //               borderRadius: '8px',
// // // //               boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
// // // //               objectFit: 'contain'
// // // //             }}
// // // //           />
// // // //           <p style={{ color: 'white', marginTop: '15px', fontSize: '14px' }}>{selectedImage.name}</p>
// // // //           <div style={{ display: 'flex', gap: '10px' }}>
// // // //             <button 
// // // //               onClick={(e) => downloadImage(selectedImage.id, selectedImage.name, e)}
// // // //               style={{ padding: '8px 20px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
// // // //             >
// // // //               הורדה
// // // //             </button>
// // // //             <button 
// // // //               onClick={() => setSelectedImage(null)}
// // // //               style={{ padding: '8px 20px', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px', cursor: 'pointer' }}
// // // //             >
// // // //               סגור
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default App;
// // // import React, { useState } from 'react';
// // // import axios from 'axios';

// // // const App = () => {
// // //   const [query, setQuery] = useState('');
// // //   const [images, setImages] = useState([]);
// // //   const [loading, setLoading] = useState(false);
// // //   const [isSyncing, setIsSyncing] = useState(false);
// // //   const [selectedImage, setSelectedImage] = useState(null);

// // //   // כתובת השרת המעודכנת
// // //   const API_BASE = "http://localhost:5000";

// // //   // פונקציית החיפוש - מתוקן ל-http
// // //   const handleSearch = async () => {
// // //     if (!query.trim()) return;
// // //     setLoading(true);
// // //     try {
// // //       const res = await axios.get(
// // //         `${API_BASE}/api/search?q=${encodeURIComponent(query)}`
// // //       );
// // //       setImages(res.data);
// // //     } catch (err) {
// // //       console.error("Search Error:", err);
// // //       alert("שגיאה בחיפוש: " + (err.response?.data?.error || err.message));
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // חיפוש תמונות דומות - מתוקן ל-http
// // //   const findSimilar = async (id, name, e) => {
// // //     e.stopPropagation();
// // //     setLoading(true);
// // //     try {
// // //       const res = await axios.get(`${API_BASE}/api/search/similar/${id}`);
// // //       setImages(res.data);
// // //       setQuery(`דומות ל: ${name}`);
// // //     } catch (err) {
// // //       console.error("Similar Search Error:", err);
// // //       alert("שגיאה בחיפוש דומות: " + (err.response?.data?.error || err.message));
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // סנכרון מול גוגל דרייב - מתוקן ל-http
// // //   const handleSync = async () => {
// // //     setIsSyncing(true);
// // //     try {
// // //       const response = await axios.post(`${API_BASE}/drive/sync`);
// // //       alert(`סנכרון הושלם! נוספו ${response.data.added} תמונות חדשות.`);
// // //     } catch (error) {
// // //       console.error("Sync Error:", error);
// // //       alert("שגיאה בסנכרון: " + (error.response?.data?.error || "השרת לא מגיב"));
// // //     } finally {
// // //       setIsSyncing(false);
// // //     }
// // //   };

// // //   // הורדת תמונה - מתוקן ל-http
// // //   const downloadImage = async (id, name, e) => {
// // //     if (e) e.stopPropagation();
// // //     try {
// // //       const response = await fetch(`${API_BASE}/drive/view/${id}`);
// // //       const blob = await response.blob();
// // //       const url = window.URL.createObjectURL(blob);
// // //       const a = document.createElement('a');
// // //       a.href = url;
// // //       a.download = name || 'image.jpg';
// // //       document.body.appendChild(a);
// // //       a.click();
// // //       document.body.removeChild(a);
// // //       window.URL.revokeObjectURL(url);
// // //     } catch (err) {
// // //       console.error("Download Error:", err);
// // //       alert("שגיאה בהורדה");
// // //     }
// // //   };

// // //   return (
// // //     <div style={{ 
// // //       padding: '20px', 
// // //       width: '450px', 
// // //       height: '600px', 
// // //       display: 'flex', 
// // //       flexDirection: 'column', 
// // //       fontFamily: 'Segoe UI, Tahoma, sans-serif', 
// // //       backgroundColor: '#f4f7f6',
// // //       boxSizing: 'border-box'
// // //     }} dir="rtl">
      
// // //       {/* Header */}
// // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
// // //         <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#1f1f1f' }}>חיפוש חכם 🚀</h2>
// // //         <button 
// // //           onClick={handleSync} 
// // //           disabled={isSyncing}
// // //           style={{ 
// // //             padding: '5px 12px', 
// // //             cursor: 'pointer', 
// // //             backgroundColor: isSyncing ? '#eee' : '#fff', 
// // //             border: '1px solid #dadce0', 
// // //             borderRadius: '16px',
// // //             fontSize: '11px',
// // //             transition: 'all 0.2s'
// // //           }}
// // //         >
// // //           {isSyncing ? '🔄 מסנכרן...' : '🔄 סנכרן דרייב'}
// // //         </button>
// // //       </div>

// // //       {/* Search Input */}
// // //       <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
// // //         <input
// // //           type="text"
// // //           value={query}
// // //           onChange={(e) => setQuery(e.target.value)}
// // //           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
// // //           placeholder="מה את מחפשת היום?"
// // //           style={{
// // //             flex: 1,
// // //             padding: '8px 15px',
// // //             borderRadius: '20px',
// // //             border: '1px solid #dfe1e5',
// // //             outline: 'none',
// // //             fontSize: '14px',
// // //             boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
// // //           }}
// // //         />
// // //         <button
// // //           onClick={handleSearch}
// // //           disabled={loading}
// // //           style={{
// // //             padding: '8px 18px',
// // //             backgroundColor: '#1a73e8',
// // //             color: 'white',
// // //             border: 'none',
// // //             borderRadius: '20px',
// // //             cursor: 'pointer',
// // //             fontWeight: '500'
// // //           }}
// // //         >
// // //           {loading ? '...' : 'חפשי'}
// // //         </button>
// // //       </div>

// // //       {/* Results Gallery */}
// // //       <div style={{ 
// // //         flex: 1, 
// // //         overflowY: 'auto', 
// // //         display: 'grid', 
// // //         gridTemplateColumns: '1fr 1fr', 
// // //         gap: '12px',
// // //         padding: '2px'
// // //       }}>
// // //         {images.map((img) => (
// // //           <div
// // //             key={img.id}
// // //             onClick={() => setSelectedImage(img)}
// // //             style={{
// // //               backgroundColor: '#fff',
// // //               border: '1px solid #dadce0',
// // //               borderRadius: '8px',
// // //               padding: '8px',
// // //               display: 'flex',
// // //               flexDirection: 'column',
// // //               cursor: 'pointer',
// // //               transition: 'box-shadow 0.2s',
// // //               boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
// // //             }}
// // //           >
// // //             <div style={{
// // //               width: '100%',
// // //               height: '110px',
// // //               backgroundColor: '#f8f9fa',
// // //               borderRadius: '4px',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               justifyContent: 'center', 
// // //               overflow: 'hidden'
// // //             }}>
// // //               <img
// // //                 src={`${API_BASE}/drive/view/${img.id}`}
// // //                 alt={img.name}
// // //                 style={{
// // //                   maxWidth: '100%',
// // //                   maxHeight: '100%',
// // //                   objectFit: 'contain'
// // //                 }}
// // //               />
// // //             </div>

// // //             <p style={{ 
// // //               fontSize: '11px', 
// // //               margin: '8px 0', 
// // //               whiteSpace: 'nowrap', 
// // //               overflow: 'hidden', 
// // //               textOverflow: 'ellipsis',
// // //               color: '#3c4043'
// // //             }}>
// // //               {img.name}
// // //             </p>

// // //             <div style={{ display: 'flex', gap: '4px' }}>
// // //               <button
// // //                 onClick={(e) => findSimilar(img.id, img.name, e)}
// // //                 style={{ 
// // //                   flex: 2, 
// // //                   padding: '4px', 
// // //                   fontSize: '10px', 
// // //                   cursor: 'pointer', 
// // //                   backgroundColor: '#f1f3f4', 
// // //                   border: '1px solid #dadce0', 
// // //                   borderRadius: '4px',
// // //                   color: '#1a73e8',
// // //                   fontWeight: 'bold'
// // //                 }}
// // //               >
// // //                 🔍 דומות
// // //               </button>
// // //               <button
// // //                 onClick={(e) => downloadImage(img.id, img.name, e)}
// // //                 style={{ 
// // //                   flex: 1,
// // //                   padding: '4px', 
// // //                   fontSize: '10px', 
// // //                   cursor: 'pointer', 
// // //                   border: '1px solid #dadce0', 
// // //                   borderRadius: '4px',
// // //                   backgroundColor: '#fff'
// // //                 }}
// // //               >
// // //                 ⬇️
// // //               </button>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* מצבי ריק/טעינה */}
// // //       {images.length === 0 && !loading && (
// // //         <div style={{ textAlign: 'center', marginTop: '50px', color: '#70757a' }}>
// // //           <p style={{ fontSize: '13px' }}>
// // //             {isSyncing ? "המערכת מעבדת נתונים..." : "הזיני מילת חיפוש (למשל: 'כלב', 'חוף')"}
// // //           </p>
// // //         </div>
// // //       )}

// // //       {/* Modal - תצוגה מוגדלת */}
// // //       {selectedImage && (
// // //         <div 
// // //           onClick={() => setSelectedImage(null)}
// // //           style={{
// // //             position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
// // //             backgroundColor: 'rgba(32, 33, 36, 0.9)', display: 'flex', flexDirection: 'column',
// // //             justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
// // //           }}
// // //         >
// // //           <img
// // //             src={`${API_BASE}/drive/view/${selectedImage.id}`}
// // //             alt={selectedImage.name}
// // //             style={{ 
// // //               maxWidth: '90%', 
// // //               maxHeight: '75vh', 
// // //               borderRadius: '8px',
// // //               boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
// // //               objectFit: 'contain'
// // //             }}
// // //           />
// // //           <p style={{ color: 'white', marginTop: '15px', fontSize: '14px' }}>{selectedImage.name}</p>
// // //           <div style={{ display: 'flex', gap: '10px' }}>
// // //             <button 
// // //               onClick={(e) => downloadImage(selectedImage.id, selectedImage.name, e)}
// // //               style={{ padding: '8px 20px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
// // //             >
// // //               הורדה
// // //             </button>
// // //             <button 
// // //               onClick={() => setSelectedImage(null)}
// // //               style={{ padding: '8px 20px', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px', cursor: 'pointer' }}
// // //             >
// // //               סגור
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default App;
// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const App = () => {
// //   const [query, setQuery] = useState('');
// //   const [images, setImages] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [isSyncing, setIsSyncing] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState(null);

// //   // כתובת השרת
// //   const API_BASE = "http://localhost:5000";

// //   // 1. פונקציית חיפוש (Text-to-Image)
// //   const handleSearch = async () => {
// //     if (!query.trim()) return;
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(
// //         `${API_BASE}/api/search?q=${encodeURIComponent(query)}`
// //       );
// //       setImages(res.data);
// //     } catch (err) {
// //       console.error("Search Error:", err);
// //       alert("שגיאה בחיפוש: " + (err.response?.data?.error || err.message));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // 2. חיפוש תמונות דומות (Image-to-Image)
// //   const findSimilar = async (id, name, e) => {
// //     e.stopPropagation();
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(`${API_BASE}/api/search/similar/${id}`);
// //       setImages(res.data);
// //       setQuery(`דומות ל: ${name}`);
// //     } catch (err) {
// //       console.error("Similar Search Error:", err);
// //       alert("שגיאה בחיפוש דומות: " + (err.response?.data?.error || err.message));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // 3. סנכרון חכם מול PostgreSQL (מעודכן)
// //   const handleSync = async () => {
// //     setIsSyncing(true);
// //     try {
// //       // אנחנו שולחים POST לשרת, השרת מעבד את ה-AI ושומר ב-DB
// //       const response = await axios.post(`${API_BASE}/drive/sync`);
      
// //       const { added, total } = response.data;
// //       alert(`הסנכרון הושלם בהצלחה! \n✨ נוספו ${added} תמונות חדשות. \n📊 סה"כ בבסיס הנתונים: ${total}`);
      
// //     } catch (error) {
// //       console.error("Sync Error:", error);
// //       alert("שגיאה בסנכרון: " + (error.response?.data?.error || "השרת לא מגיב. ודאי שה-Backend רץ."));
// //     } finally {
// //       setIsSyncing(false);
// //     }
// //   };

// //   // 4. הורדת תמונה דרך ה-Proxy של השרת
// //   const downloadImage = async (id, name, e) => {
// //     if (e) e.stopPropagation();
// //     try {
// //       const response = await fetch(`${API_BASE}/drive/view/${id}`);
// //       const blob = await response.blob();
// //       const url = window.URL.createObjectURL(blob);
// //       const a = document.createElement('a');
// //       a.href = url;
// //       a.download = name || 'image.jpg';
// //       document.body.appendChild(a);
// //       a.click();
// //       document.body.removeChild(a);
// //       window.URL.revokeObjectURL(url);
// //     } catch (err) {
// //       console.error("Download Error:", err);
// //       alert("שגיאה בהורדת הקובץ");
// //     }
// //   };

// //   return (
// //     <div style={{ 
// //       padding: '20px', 
// //       width: '450px', 
// //       height: '600px', 
// //       display: 'flex', 
// //       flexDirection: 'column', 
// //       fontFamily: 'Segoe UI, Tahoma, sans-serif', 
// //       backgroundColor: '#f4f7f6',
// //       boxSizing: 'border-box'
// //     }} dir="rtl">
      
// //       {/* Header */}
// //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
// //         <div>
// //           <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#1f1f1f' }}>Smart Drive Search 🚀</h2>
// //           <p style={{ margin: 0, fontSize: '10px', color: '#666' }}>מנוע חיפוש ויזואלי מבוסס AI</p>
// //         </div>
// //         <button 
// //           onClick={handleSync} 
// //           disabled={isSyncing}
// //           style={{ 
// //             padding: '6px 14px', 
// //             cursor: isSyncing ? 'not-allowed' : 'pointer', 
// //             backgroundColor: isSyncing ? '#e8eaed' : '#fff', 
// //             color: isSyncing ? '#9aa0a6' : '#1a73e8',
// //             border: '1px solid #dadce0', 
// //             borderRadius: '16px',
// //             fontSize: '11px',
// //             fontWeight: 'bold',
// //             transition: 'all 0.2s',
// //             boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
// //           }}
// //         >
// //           {isSyncing ? '🔄 מעבד AI...' : '🔄 סנכרן כעת'}
// //         </button>
// //       </div>

// //       {/* Search Input Area */}
// //       <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
// //         <input
// //           type="text"
// //           value={query}
// //           onChange={(e) => setQuery(e.target.value)}
// //           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
// //           placeholder="חפשי בתוך התמונות (למשל: חתול לבן...)"
// //           style={{
// //             flex: 1,
// //             padding: '10px 15px',
// //             borderRadius: '20px',
// //             border: '1px solid #dfe1e5',
// //             outline: 'none',
// //             fontSize: '14px',
// //             boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
// //           }}
// //         />
// //         <button
// //           onClick={handleSearch}
// //           disabled={loading || isSyncing}
// //           style={{
// //             padding: '8px 20px',
// //             backgroundColor: '#1a73e8',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '20px',
// //             cursor: 'pointer',
// //             fontWeight: '600',
// //             opacity: (loading || isSyncing) ? 0.7 : 1
// //           }}
// //         >
// //           {loading ? 'חפש...' : 'חפשי'}
// //         </button>
// //       </div>

// //       {/* Results Section */}
// //       <div style={{ 
// //         flex: 1, 
// //         overflowY: 'auto', 
// //         display: 'grid', 
// //         gridTemplateColumns: '1fr 1fr', 
// //         gap: '12px',
// //         padding: '2px'
// //       }}>
// //         {images.map((img) => (
// //           <div
// //             key={img.id}
// //             onClick={() => setSelectedImage(img)}
// //             style={{
// //               backgroundColor: '#fff',
// //               border: '1px solid #dadce0',
// //               borderRadius: '8px',
// //               padding: '8px',
// //               display: 'flex',
// //               flexDirection: 'column',
// //               cursor: 'pointer',
// //               transition: 'transform 0.2s, box-shadow 0.2s',
// //               boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
// //             }}
// //             onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
// //             onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
// //           >
// //             <div style={{
// //               width: '100%',
// //               height: '110px',
// //               backgroundColor: '#f8f9fa',
// //               borderRadius: '4px',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center', 
// //               overflow: 'hidden'
// //             }}>
// //               <img
// //                 src={`${API_BASE}/drive/view/${img.id}`}
// //                 alt={img.name}
// //                 loading="lazy"
// //                 style={{
// //                   maxWidth: '100%',
// //                   maxHeight: '100%',
// //                   objectFit: 'cover'
// //                 }}
// //               />
// //             </div>

// //             <p style={{ 
// //               fontSize: '11px', 
// //               margin: '8px 0', 
// //               whiteSpace: 'nowrap', 
// //               overflow: 'hidden', 
// //               textOverflow: 'ellipsis',
// //               color: '#3c4043',
// //               textAlign: 'center'
// //             }}>
// //               {img.name}
// //             </p>

// //             <div style={{ display: 'flex', gap: '4px' }}>
// //               <button
// //                 onClick={(e) => findSimilar(img.id, img.name, e)}
// //                 style={{ 
// //                   flex: 2, 
// //                   padding: '5px', 
// //                   fontSize: '10px', 
// //                   cursor: 'pointer', 
// //                   backgroundColor: '#e8f0fe', 
// //                   border: '1px solid #d2e3fc', 
// //                   borderRadius: '4px',
// //                   color: '#1967d2',
// //                   fontWeight: 'bold'
// //                 }}
// //               >
// //                 🔍 דומות
// //               </button>
// //               <button
// //                 onClick={(e) => downloadImage(img.id, img.name, e)}
// //                 title="הורדה"
// //                 style={{ 
// //                   flex: 1,
// //                   padding: '5px', 
// //                   fontSize: '10px', 
// //                   cursor: 'pointer', 
// //                   border: '1px solid #dadce0', 
// //                   borderRadius: '4px',
// //                   backgroundColor: '#fff'
// //                 }}
// //               >
// //                 ⬇️
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Empty State / Loading */}
// //       {images.length === 0 && !loading && (
// //         <div style={{ textAlign: 'center', marginTop: '60px', color: '#70757a' }}>
// //           <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
// //           <p style={{ fontSize: '13px' }}>
// //             {isSyncing ? "המערכת מעבדת את התמונות מהדרייב ב-SQL..." : "הזיני מילת חיפוש כדי למצוא תמונות מהר"}
// //           </p>
// //         </div>
// //       )}

// //       {/* Full Image Modal */}
// //       {selectedImage && (
// //         <div 
// //           onClick={() => setSelectedImage(null)}
// //           style={{
// //             position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
// //             backgroundColor: 'rgba(32, 33, 36, 0.95)', display: 'flex', flexDirection: 'column',
// //             justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
// //           }}
// //         >
// //           <img
// //             src={`${API_BASE}/drive/view/${selectedImage.id}`}
// //             alt={selectedImage.name}
// //             style={{ 
// //               maxWidth: '95%', 
// //               maxHeight: '70vh', 
// //               borderRadius: '8px',
// //               boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
// //               objectFit: 'contain',
// //               border: '2px solid #fff'
// //             }}
// //           />
// //           <h3 style={{ color: 'white', marginTop: '15px', fontSize: '16px' }}>{selectedImage.name}</h3>
// //           <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
// //             <button 
// //               onClick={(e) => downloadImage(selectedImage.id, selectedImage.name, e)}
// //               style={{ padding: '10px 25px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '24px', cursor: 'pointer', fontWeight: 'bold' }}
// //             >
// //               הורדה למחשב
// //             </button>
// //             <button 
// //               onClick={() => setSelectedImage(null)}
// //               style={{ padding: '10px 25px', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '24px', cursor: 'pointer' }}
// //             >
// //               סגור
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default App;
// // שינוי 29/01// שינוי 29/01
// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [query, setQuery] = useState('');
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isSyncing, setIsSyncing] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const API_BASE = "http://localhost:5000";

//   // פונקציית התחברות חדשה
//   const handleLogin = () => {
//     const width = 500, height = 600;
//     const left = (window.screen.width / 2) - (width / 2);
//     const top = (window.screen.height / 2) - (height / 2);
//     window.open(
//       `${API_BASE}/auth/google`,
//       'Google Login',
//       `width=${width},height=${height},top=${top},left=${left}`
//     );
//   };

//   const handleSearch = async () => {
//     if (!query.trim()) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${API_BASE}/api/search?q=${encodeURIComponent(query)}`
//       );
//       setImages(res.data);
//     } catch (err) {
//       console.error("Search Error:", err);
//       alert("שגיאה בחיפוש: " + (err.response?.data?.error || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const findSimilar = async (id, name, e) => {
//     e.stopPropagation();
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/api/search/similar/${id}`);
//       setImages(res.data);
//       setQuery(`דומות ל: ${name}`);
//     } catch (err) {
//       console.error("Similar Search Error:", err);
//       alert("שגיאה בחיפוש דומות");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSync = async () => {
//     setIsSyncing(true);
//     try {
//       const response = await axios.post(`${API_BASE}/drive/sync`);
//       alert("הסנכרון התחיל ברקע עבור המשתמשים המחוברים! ✅");
//     } catch (error) {
//       console.error("Sync Error:", error);
//       alert("שגיאה בסנכרון. ודאי שהתחברת לגוגל קודם.");
//     } finally {
//       setIsSyncing(false);
//     }
//   };

//   const downloadImage = async (id, name, e) => {
//     if (e) e.stopPropagation();
//     try {
//       const response = await fetch(`${API_BASE}/drive/view/${id}`);
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = name || 'image.jpg';
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error("Download Error:", err);
//       alert("שגיאה בהורדת הקובץ");
//     }
//   };

//   return (
//     <div style={{
//       padding: '20px', width: '450px', height: '600px',
//       display: 'flex', flexDirection: 'column',
//       fontFamily: 'Segoe UI, Tahoma, sans-serif',
//       backgroundColor: '#f4f7f6', boxSizing: 'border-box'
//     }} dir="rtl">
      
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
//         <div>
//           <h2 style={{ margin: 0, fontSize: '1.2rem', color: '#1f1f1f' }}>Smart Drive Search 🚀</h2>
//           <p style={{ margin: 0, fontSize: '10px', color: '#666' }}>מנוע חיפוש ויזואלי מבוסס AI</p>
//         </div>
//         <div style={{ display: 'flex', gap: '5px' }}>
//           {/* כפתור התחברות חדש בעיצוב התואם לשלך */}
//           <button
//             onClick={handleLogin}
//             style={{
//               padding: '6px 12px', cursor: 'pointer',
//               backgroundColor: '#fff', color: '#34a853',
//               border: '1px solid #dadce0', borderRadius: '16px',
//               fontSize: '11px', fontWeight: 'bold', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
//             }}
//           >
//             🔑 התחברי
//           </button>
//           <button
//             onClick={handleSync}
//             disabled={isSyncing}
//             style={{
//               padding: '6px 12px', 
//               cursor: isSyncing ? 'not-allowed' : 'pointer', 
//               backgroundColor: isSyncing ? '#e8eaed' : '#fff', 
//               color: isSyncing ? '#9aa0a6' : '#1a73e8',
//               border: '1px solid #dadce0', borderRadius: '16px',
//               fontSize: '11px', fontWeight: 'bold', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
//             }}
//           >
//             {isSyncing ? '🔄 סנכרון...' : '🔄 סנכרן'}
//           </button>
//         </div>
//       </div>

//       <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//           placeholder="חפשי בתוך התמונות..."
//           style={{
//             flex: 1, padding: '10px 15px', borderRadius: '20px',
//             border: '1px solid #dfe1e5', outline: 'none', fontSize: '14px'
//           }}
//         />
//         <button
//           onClick={handleSearch}
//           disabled={loading || isSyncing}
//           style={{
//             padding: '8px 20px', backgroundColor: '#1a73e8', color: 'white',
//             border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: '600',
//             opacity: (loading || isSyncing) ? 0.7 : 1
//           }}
//         >
//           {loading ? 'חפש...' : 'חפשי'}
//         </button>
//       </div>

//       <div style={{
//         flex: 1, overflowY: 'auto', display: 'grid',
//         gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '2px'
//       }}>
//         {images.map((img) => (
//           <div
//             key={img.id}
//             onClick={() => setSelectedImage(img)}
//             style={{
//               backgroundColor: '#fff', border: '1px solid #dadce0',
//               borderRadius: '8px', padding: '8px', display: 'flex',
//               flexDirection: 'column', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//             }}
//           >
//             <div style={{
//               width: '100%', height: '110px', backgroundColor: '#f8f9fa',
//               borderRadius: '4px', display: 'flex', alignItems: 'center',
//               justifyContent: 'center', overflow: 'hidden'
//             }}>
//               <img
//                 src={`${API_BASE}/drive/view/${img.id}`}
//                 alt={img.name}
//                 style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
//               />
//             </div>
//             <p style={{ fontSize: '11px', margin: '8px 0', textAlign: 'center', color: '#3c4043' }}>
//               {img.name}
//             </p>
//             <div style={{ display: 'flex', gap: '4px' }}>
//               <button
//                 onClick={(e) => findSimilar(img.id, img.name, e)}
//                 style={{ flex: 2, padding: '5px', fontSize: '10px', cursor: 'pointer', backgroundColor: '#e8f0fe', border: '1px solid #d2e3fc', borderRadius: '4px', color: '#1967d2', fontWeight: 'bold' }}
//               >
//                 🔍 דומות
//               </button>
//               <button
//                 onClick={(e) => downloadImage(img.id, img.name, e)}
//                 style={{ flex: 1, padding: '5px', fontSize: '10px', cursor: 'pointer', border: '1px solid #dadce0', borderRadius: '4px', backgroundColor: '#fff' }}
//               >
//                 ⬇️
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {images.length === 0 && !loading && (
//         <div style={{ textAlign: 'center', marginTop: '60px', color: '#70757a' }}>
//           <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
//           <p style={{ fontSize: '13px' }}>
//             {isSyncing ? "המערכת מעבדת נתונים..." : "הזיני מילת חיפוש למציאת תמונות"}
//           </p>
//         </div>
//       )}

//       {selectedImage && (
//         <div
//           onClick={() => setSelectedImage(null)}
//           style={{
//             position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
//             backgroundColor: 'rgba(32, 33, 36, 0.95)', display: 'flex', flexDirection: 'column',
//             justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px'
//           }}
//         >
//           <img
//             src={`${API_BASE}/drive/view/${selectedImage.id}`}
//             alt={selectedImage.name}
//             style={{ maxWidth: '95%', maxHeight: '70vh', borderRadius: '8px', objectFit: 'contain', border: '2px solid #fff' }}
//           />
//           <h3 style={{ color: 'white', marginTop: '15px' }}>{selectedImage.name}</h3>
//           <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
//             <button
//               onClick={(e) => downloadImage(selectedImage.id, selectedImage.name, e)}
//               style={{ padding: '10px 25px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '24px', cursor: 'pointer', fontWeight: 'bold' }}
//             >
//               הורדה למחשב
//             </button>
//             <button
//               onClick={() => setSelectedImage(null)}
//               style={{ padding: '10px 25px', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '24px', cursor: 'pointer' }}
//             >
//               סגור
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

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