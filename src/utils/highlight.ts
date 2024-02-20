import 'highlight.js/styles/base16/tomorrow-night.css';

import hljs from 'highlight.js';

// ----------------------------------------------------------------------

interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition(): void;
}

declare global {
  interface Window {
    hljs: any;
    t: (key: string) => string;
  }

  interface Document {
    startViewTransition: (cb: () => void | Promise<void>) => ViewTransition;
  }
}

hljs.configure({
  languages: ['javascript', 'sh', 'bash', 'html', 'scss', 'css', 'json'],
});

if (typeof window !== 'undefined') {
  window.hljs = hljs;
}
