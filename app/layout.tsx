import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flow Studio',
  description: 'Inspiration × Mood × Ideal Life',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/icon-192.png' },
    { rel: 'apple-touch-icon', url: '/icon-192.png' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <div className="container">
          <header className="vstack">
            <div className="title">Flow Studio</div>
            <div className="subtitle">Inspiration × Mood × Ideal Life</div>
            <nav className="nav">
              <a href="/">Dashboard</a>
              <a href="/inspiration">Inspiration</a>
              <a href="/mood">Mood</a>
              <a href="/ideal">Ideal</a>
            </nav>
          </header>
          <hr />
          {children}
          <footer className="mt-8">
            <small className="muted">PWA: ホーム画面に追加でアプリ化できます。</small>
            <script
              dangerouslySetInnerHTML={{
                __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{})})}`
              }}
            />
          </footer>
        </div>
      </body>
    </html>
  );
}
