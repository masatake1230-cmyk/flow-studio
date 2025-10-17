'use client';
import BackupBar from '@/components/BackupBar';
import { getLocal, setLocal } from '@/lib/storage';
import { useEffect, useMemo, useState } from 'react';

type Mood = {
  id: string;
  createdAt: number;
  score: number; // 1..5
  note?: string;
  energy?: number;
  stress?: number;
};

function uid(){ return Math.random().toString(36).slice(2); }

export default function MoodPage(){
  const [items, setItems] = useState<Mood[]>([]);
  const [score, setScore] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [stress, setStress] = useState(3);
  const [note, setNote] = useState('');

  useEffect(()=>{
    setItems(getLocal<Mood[]>('flow_mood', []));
  },[]);

  function save(list: Mood[]){
    setItems(list);
    setLocal('flow_mood', list);
  }

  function add(){
    const m: Mood = { id: uid(), createdAt: Date.now(), score, energy, stress, note: note.trim()||undefined };
    save([m, ...items]);
    setNote('');
  }

  const weekly = useMemo(()=>{
    const now = Date.now();
    const weekAgo = now - 7*24*60*60*1000;
    const data = items.filter(i=>i.createdAt>=weekAgo);
    if (data.length===0) return { avg: 0, energy: 0, stress: 0 };
    const avg = data.reduce((s,i)=>s+i.score,0)/data.length;
    const energy = data.reduce((s,i)=>s+(i.energy||0),0)/data.length;
    const stress = data.reduce((s,i)=>s+(i.stress||0),0)/data.length;
    return { avg, energy, stress };
  },[items]);

  return (
    <main className="vstack">
      <BackupBar />
      <section className="card vstack">
        <h2>Mood Mirror</h2>
        <div className="grid">
          <div className="vstack">
            <label>気分（1〜5）: {score}</label>
            <input type="range" min={1} max={5} value={score} onChange={e=>setScore(Number(e.target.value))} />
          </div>
          <div className="vstack">
            <label>エネルギー: {energy}</label>
            <input type="range" min={1} max={5} value={energy} onChange={e=>setEnergy(Number(e.target.value))} />
          </div>
          <div className="vstack">
            <label>ストレス: {stress}</label>
            <input type="range" min={1} max={5} value={stress} onChange={e=>setStress(Number(e.target.value))} />
          </div>
        </div>
        <textarea className="textarea" placeholder="一言メモ" value={note} onChange={e=>setNote(e.target.value)} />
        <div className="row" style={{justifyContent:'flex-end'}}>
          <button className="btn" onClick={add}>保存</button>
        </div>
      </section>

      <section className="card vstack">
        <h3>直近7日のざっくり平均</h3>
        <div className="grid">
          <div className="card"><strong>気分</strong><div style={{fontSize:24}}>{weekly.avg.toFixed(1)}</div></div>
          <div className="card"><strong>エネルギー</strong><div style={{fontSize:24}}>{weekly.energy.toFixed(1)}</div></div>
          <div className="card"><strong>ストレス</strong><div style={{fontSize:24}}>{weekly.stress.toFixed(1)}</div></div>
        </div>
      </section>

      <section className="grid">
        {items.map(i=>(
          <article className="card vstack" key={i.id}>
            <small className="muted">{new Date(i.createdAt).toLocaleString()}</small>
            <div>気分: {i.score} / エネルギー: {i.energy} / ストレス: {i.stress}</div>
            {i.note && <div>メモ: {i.note}</div>}
          </article>
        ))}
      </section>
    </main>
  );
}
