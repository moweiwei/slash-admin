import 'highlight.js/styles/base16/tomorrow-night.css';

import hljs from 'highlight.js';

// ----------------------------------------------------------------------

declare global {
  interface Window {
    hljs: any;
    t: (key: string) => string;
  }

  interface Document {
    startViewTransition: (callback: () => void) => void;
  }
}

hljs.configure({
  languages: ['javascript', 'sh', 'bash', 'html', 'scss', 'css', 'json'],
});

if (typeof window !== 'undefined') {
  window.hljs = hljs;
}
