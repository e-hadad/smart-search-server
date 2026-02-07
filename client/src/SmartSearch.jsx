// import React, { useState, useEffect } from 'react';
// import { Search, Image as ImageIcon, Loader2, Sparkles, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';

// const SmartSearch = () => {
//   const [query, setQuery] = useState('');
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   // פונקציית החיפוש
//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
//       setImages(response.data);
//     } catch (error) {
//       console.error("Search failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F8F9FA] text-[#1D1D1F] font-sans">
//       {/* Header & Search Section */}
//       <header className="pt-20 pb-12 px-4">
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="max-w-3xl mx-auto text-center"
//         >
//           <div className="flex justify-center mb-4">
//             <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
//               <Sparkles className="text-white w-8 h-8" />
//             </div>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
//             Smart Drive Search
//           </h1>
//           <p className="text-gray-500 text-lg mb-8">
//             חיפוש תמונות לפי תוכן, צבעים ואווירה - בכוח ה-AI
//           </p>

//           {/* Search Bar */}
//           <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="חפשי משהו... (למשל: 'כלב רץ בדשא' או 'שקיעה כתומה')"
//               className="w-full px-6 py-4 bg-white border-none rounded-2xl shadow-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg transition-all pr-14"
//             />
//             <button 
//               type="submit"
//               disabled={loading}
//               className="absolute left-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//             >
//               {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
//             </button>
//           </form>
//         </motion.div>
//       </header>

//       {/* Results Grid */}
//       <main className="max-w-7xl mx-auto px-6 pb-20">
//         <AnimatePresence mode='wait'>
//           {images.length > 0 ? (
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//             >
//               {images.map((img, index) => (
//                 <motion.div
//                   key={img._id || index}
//                   layoutId={img._id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: index * 0.05 }}
//                   onClick={() => setSelectedImage(img)}
//                   className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-zoom-in"
//                 >
//                   <div className="aspect-square overflow-hidden">
//                     // בתוך ה-map של התוצאות
// <div className="aspect-square overflow-hidden">
//   <img
//     // ה-ID מגיע מה-JSON, והכתובת היא ה-Proxy בשרת שלך בפורט 5000
//     src={`http://localhost:5000/drive/view/${img.id}`} 
//     alt={img.name}
//     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//     // הוספת logic למקרה של שגיאה בטעינה
//     onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Image+Error'; }}
//   />
// </div>
//                   </div>
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
//                     <p className="font-medium truncate">{img.name}</p>
//                     <span className="text-xs text-gray-200">התאמה: {(img.score * 100).toFixed(0)}%</span>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           ) : (
//             !loading && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-gray-400">
//                 <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
//                 <p>הקלידי חיפוש כדי לראות תוצאות מהכונן שלך</p>
//               </motion.div>
//             )
//           )}
//         </AnimatePresence>
//       </main>

//       {/* Image Modal (Lightbox) */}
//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-10"
//             onClick={() => setSelectedImage(null)}
//           >
//             <button className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors">
//               <X className="w-8 h-8" />
//             </button>
//             <motion.img
//               layoutId={selectedImage._id}
//               src={selectedImage.url}
//               className="max-w-full max-h-full rounded-lg shadow-2xl"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default SmartSearch;
import React, { useState } from 'react';
import axios from 'axios';

const SmartSearch = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`
      );
      setImages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
const downloadImage = async (id, name) => {
  const response = await fetch(`http://localhost:5000/drive/view/${id}`);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name || 'image.jpg';

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};


  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }} dir="rtl">
      <h2>חיפוש תמונות</h2>

      {/* חיפוש */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="הקלידי חיפוש..."
          style={{
            flex: 1,
            padding: 8,
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'טוען...' : 'חיפוש'}
        </button>
      </div>

      {/* תוצאות */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: 20
        }}
      >
        {images.map((img) => (
          <div
            key={img.id}
            style={{
              width: 200,
              margin: 10,
              textAlign: 'center',
              border: '1px solid #ddd',
              padding: 8
            }}
          >
            <img
              src={`http://localhost:5000/drive/view/${img.id}`}
              alt={img.name}
              style={{
                width: '100%',
                height: 140,
                objectFit: 'contain',
                background: '#f5f5f5'
              }}
            />

            <p style={{ fontSize: 12, margin: '6px 0 2px' }}>
              {img.name}
            </p>

            <p style={{ fontSize: 11, color: '#555' }}>
              Similarity: {(img.score * 100).toFixed(2)}%
            </p>

            {/* כפתור הורדה */}
            <button
              onClick={() => downloadImage(img.id, img.name)}
              style={{
                marginTop: 6,
                padding: '4px 10px',
                fontSize: 11,
                cursor: 'pointer'
              }}
            >
              הורדה
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartSearch;
