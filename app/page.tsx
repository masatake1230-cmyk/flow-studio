export default function Page() {
  return (
    <main className="grid">
      <div
        className="card"
        style={{ background:'#ff3b81', color:'#000', fontWeight:700, textAlign:'center' }}
      >
        ★ このピンク箱が出ていれば「最新ビルド」が表示できています
      </div>

      <section className="card">
        <h2>Tab A: Inspiration Bank</h2>
        <p>写真/動画/メモを保存して、タグとキャプションで整理。</p>
        <a className="btn" href="/inspiration">開く</a>
      </section>

      <section className="card">
        <h2>Tab B: Mood Mirror</h2>
        <p>1分日記と感情チェック。週/月のパターンを見える化。</p>
        <a className="btn" href="/mood">開く</a>
      </section>

      <section className="card">
        <h2>Tab C: Ideal Life Tracker</h2>
        <p>理想ルーチン（サウナ/朝カフェ/施術/ジム）をスコア化。</p>
        <a className="btn" href="/ideal">開く</a>
      </section>
    </main>
  );
}
