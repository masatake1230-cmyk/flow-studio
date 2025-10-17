'use client';
import { exportAll, importAll } from '../lib/storage'; // ← 相対パスに変更！
import { useRef, useState } from 'react';

export default function BackupBar() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string>('');

  return (
    <div className="row" style={{justifyContent:'space-between', marginBottom: 12}}>
      <div className="hstack">
        <button className="btn" onClick={() => exportAll()}>バックアップ書き出し</button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) importAll(file, () => setMsg('インポート完了！'));
          }}
        />
        <button className="btn" onClick={() => fileRef.current?.click()}>バックアップ読み込み</button>
      </div>
      <small className="muted">{msg}</small>
    </div>
  );
}
