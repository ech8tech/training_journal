import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from "./App";

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// if ('serviceWorker' in navigator) {
//   console.log(navigator);
//   window.addEventListener('load', () => {
//     console.log('load');
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }

// Render your React component instead
const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);