import App from '@src/App';
import { createRoot } from 'react-dom/client';
import tailwindcssOutput from '../dist/tailwind-output.css?inline';

const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });

if (navigator.userAgent.includes('Firefox')) {
  /**
   * In the firefox environment, adoptedStyleSheets cannot be used due to the bug
   * @url https://bugzilla.mozilla.org/show_bug.cgi?id=1770592
   *
   * Injecting styles into the document, this may cause style conflicts with the host page
   */
  const styleElement = document.createElement('style');
  styleElement.innerHTML = tailwindcssOutput;
  shadowRoot.appendChild(styleElement);
} else {
  /** Inject styles into shadow dom */
  const globalStyleSheet = new CSSStyleSheet();
  globalStyleSheet.replaceSync(tailwindcssOutput);
  shadowRoot.adoptedStyleSheets = [globalStyleSheet];
}

shadowRoot.appendChild(rootIntoShadow);

const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      const elementNode = document.querySelector('nav[aria-label="Profile timelines"]');
      if (elementNode) {
        const parent = elementNode.parentNode as HTMLElement;
        parent.insertBefore(root, elementNode);
        createRoot(rootIntoShadow).render(<App />);
        observer.disconnect();
        break;
      }
    }
  }
});

// 配置观察选项
const config = { attributes: true, childList: true, subtree: true };

// 选择要观察的目标节点
const targetNode = document.body;

// 开始观察目标节点
observer.observe(targetNode, config);

// 如果你以后想要停止观察
// observer.disconnect();
