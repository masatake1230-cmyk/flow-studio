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
        {/* --- 一度だけSWとキャッシュを完全解除（反映確認できたら削除OK） --- */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
  if (window.caches?.keys) caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
}
`,
          }}
        />
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
          <footer style={{ marginTop: 24 }}>
            <small className="muted">PWA: ホーム画面に追加でアプリ化できます。</small>
            {/* ↓↓↓ SWの再登録コードは削除（再導入するまで不要） ↓↓↓ */}
            {/*
            <script
              dangerouslySetInnerHTML={{
                __html: \`if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{})})}\`
              }}
            />
            */}
          </footer>
        </div>
      </body>
    </html>
  );
}
