export default function Page() {
  return (
    <main className="grid gap-4">
      <div
        className="card"
        style={{
          background: '#ff3b81',
          color: '#000',
          fontWeight: 700,
          textAlign: 'center',
          padding: '16px',
          borderRadius: '12px',
        }}
      >
        ★ このピンク箱が見えたら最新デザインが反映されています！
      </div>

      <section className="card">
        <h2 className="text-xl font-semibold">Tab A: Inspiration Bank</h2>
        <p className="mt-1 text-sm text-gray-600">
          写真/動画/メモを保存して、タグとキャプションで整理。
        </p>
        <a className="btn mt-4" href="/inspiration">開く</a>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Tab B: Mood Mirror</h2>
        <p className="mt-1 text-sm text-gray-600">
          1分日記と感情チェック。週/月のパターンを見える化。
        </p>
        <a className="btn mt-4" href="/mood">開く</a>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Tab C: Ideal Life Tracker</h2>
        <p className="mt-1 text-sm text-gray-600">
          理想ルーチン（サウナ/朝カフェ/施術/ジム）をスコア化。
        </p>
        <a className="btn mt-4" href="/ideal">開く</a>
      </section>
    </main>
  );
}
