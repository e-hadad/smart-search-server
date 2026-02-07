// import { listFiles } from "./services/drive.service.js";
// import { syncImages } from "./services/syncImages.js";

// const init = async () => {
//   const files = await listFiles();
//   const db = await syncImages(files);
//   console.log("Database after sync:", db);
// };

// init();

import { listFiles } from "./services/drive.service.js";
import { syncImages } from "./services/syncImages.js";

const init = async () => {
  const files = await listFiles(); // שלב ראשון: קח את כל התמונות
  const db = await syncImages(files); // שלב שני: סנכרן עם DB
  console.log("Database after sync:", db);
};

init();
