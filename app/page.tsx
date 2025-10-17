export default function Page() {
  return (
    <main className="grid">
      <div className="card" style={{background:'#ff3b81', color:'#000', fontWeight:700}}>
        ★ 新しいビルドが見えています（このピンク箱が出ていればOK）
      </div>
      {/* 既存の3カードはこの下にそのまま */}

export default function Page() {
  return (
    // app/page.tsx の先頭あたり
export default function Page() {
  return (
    <main className="grid">
      <div className="card" style={{background:'#ff3b81', color:'#000', fontWeight:700}}>
        ★ このピンク箱が見えたら新しいデプロイが表示できています
      </div>
      {/* 既存の3つのカードはこのまま */}
    <main className="grid">
      <section className="card">
        <h2 className="text-xl font-semibold">Tab A: Inspiration Bank</h2>
        <p className="mt-1 text-sm muted">写真/動画/メモを保存して、タグとキャプションで整理。</p>
        <a className="btn mt-4" href="/inspiration">開く</a>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Tab B: Mood Mirror</h2>
        <p className="mt-1 text-sm muted">1分日記と感情チェック。週/月のパターンを見える化。</p>
        <a className="btn mt-4" href="/mood">開く</a>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Tab C: Ideal Life Tracker</h2>
        <p className="mt-1 text-sm muted">理想ルーチン（サウナ/朝カフェ/施術/ジム）をスコア化。</p>
        <a className="btn mt-4" href="/ideal">開く</a>
      </section>
    </main>
  );
}
