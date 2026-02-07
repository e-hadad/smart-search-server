// // // content.js
// // const injectApp = () => {
// //   if (document.getElementById('smart-search-root')) return;

// //   // יצירת הכפתור הצף
// //   const btn = document.createElement('div');
// //   btn.innerHTML = '🔍';
// //   btn.style.cssText = `
// //     position: fixed; bottom: 30px; left: 30px; z-index: 9999;
// //     width: 50px; height: 50px; background: #4285f4; color: white;
// //     border-radius: 50%; display: flex; align-items: center; justify-content: center;
// //     cursor: pointer; font-size: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
// //   `;

// //   // יצירת ה-Iframe שיכיל את ה-React
// //   const iframe = document.createElement('iframe');
// //   iframe.id = 'smart-search-iframe';
// //   iframe.src = chrome.runtime.getURL('index.html');
// //   iframe.style.cssText = `
// //     position: fixed; bottom: 100px; left: 30px; z-index: 9999;
// //     width: 450px; height: 550px; border: none; border-radius: 12px;
// //     box-shadow: 0 8px 24px rgba(0,0,0,0.2); display: none;
// //   `;

// //   btn.onclick = () => {
// //     iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
// //   };

// //   document.body.appendChild(btn);
// //   document.body.appendChild(iframe);
// // };

// // setTimeout(injectApp, 2000);
// // שינוי 29/01
// const injectApp = () => {
//   if (document.getElementById('smart-search-root')) return;

//   const btn = document.createElement('div');
//   btn.id = 'smart-search-root';
//   btn.innerHTML = '🔍';
//   btn.style.cssText = `
//     position: fixed; bottom: 30px; left: 30px; z-index: 9999;
//     width: 50px; height: 50px; background: #4285f4; color: white;
//     border-radius: 50%; display: flex; align-items: center; justify-content: center;
//     cursor: pointer; font-size: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
//   `;

//   const iframe = document.createElement('iframe');
//   iframe.id = 'smart-search-iframe';
//   iframe.src = chrome.runtime.getURL('index.html');
//   iframe.style.cssText = `
//     position: fixed; bottom: 100px; left: 30px; z-index: 9999;
//     width: 450px; height: 600px; border: none; border-radius: 12px;
//     box-shadow: 0 8px 24px rgba(0,0,0,0.2); display: none;
//     background: white;
//   `;

//   btn.onclick = () => {
//     iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
//   };

//   document.body.appendChild(btn);
//   document.body.appendChild(iframe);
// };

// // המתנה קלה כדי לוודא שדף הדרייב נטען
// setTimeout(injectApp, 2000);
const injectApp = () => {
  if (document.getElementById('smart-search-root')) return;

  const btn = document.createElement('div');
  btn.id = 'smart-search-root-btn';
  btn.innerHTML = '🔍';
  btn.style.cssText = `
    position: fixed; bottom: 30px; left: 30px; z-index: 9999;
    width: 50px; height: 50px; background: #4285f4; color: white;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  `;

  const iframe = document.createElement('iframe');
  iframe.id = 'smart-search-iframe';
  iframe.src = chrome.runtime.getURL('index.html');
  iframe.style.cssText = `
    position: fixed; bottom: 100px; left: 30px; z-index: 9999;
    width: 450px; height: 600px; border: none; border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2); display: none;
    background: white;
  `;

  btn.onclick = () => {
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
  };

  document.body.appendChild(btn);
  document.body.appendChild(iframe);
};

setTimeout(injectApp, 2000);