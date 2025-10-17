'use client';
import BackupBar from '@/components/BackupBar';
import { getLocal, setLocal } from '@/lib/storage';
import { useEffect, useMemo, useState } from 'react';

type Habit = { key: string; label: string };
const DEFAULTS: Habit[] = [
  { key: 'sauna', label: 'サウナ' },
  { key: 'cafe', label: '朝カフェ' },
  { key: 'massage', label: '施術' },
  { key: 'gym', label: 'ジム' },
];

type DayState = {
  date: string; // YYYY-MM-DD
  done: Record<string, boolean>;
  note?: string;
};

function todayStr(){
  const d = new Date();
  return d.toISOString().slice(0,10);
}

export default function IdealPage(){
  const [habits, setHabits] = useState<Habit[]>([]);
  const [days, setDays] = useState<DayState[]>([]);
  const [note, setNote] = useState('');

  useEffect(()=>{
    setHabits(getLocal<Habit[]>('flow_habits', DEFAULTS));
    setDays(getLocal<DayState[]>('flow_days', []));
  },[]);

  function save(h: Habit[], d: DayState[]){
    setHabits(h); setDays(d);
    setLocal('flow_habits', h);
    setLocal('flow_days', d);
  }

  const today = days.find(x=>x.date===todayStr()) ?? { date: todayStr(), done: {} };
  function toggle(key: string){
    const next = { ...today, done: { ...today.done, [key]: !today.done[key] } };
    const others = days.filter(x=>x.date!==todayStr());
    save(habits, [next, ...others]);
  }

  function addHabit(){
    const label = prompt('新しい項目の名前')?.trim();
    if(!label) return;
    const key = label.toLowerCase().replace(/\s+/g,'-');
    const nextHabits = [...habits, { key, label }];
    save(nextHabits, days);
  }

  const week = useMemo(()=>{
    const now = new Date();
    const back = new Date(now.getTime() - 6*24*60*60*1000);
    const span = days.filter(d => new Date(d.date) >= back);
    const totalChecks = span.length * habits.length || 1;
    let checked = 0;
    span.forEach(d => habits.forEach(h => { if (d.done[h.key]) checked++; }));
    const rate = (checked / totalChecks) * 100;
    return { checked, totalChecks, rate };
  },[days, habits]);

  return (
    <main className="vstack">
      <BackupBar />
      <section className="card vstack">
        <h2>Ideal Life Tracker</h2>
        <div className="row" style={{justifyContent:'space-between'}}>
          <div><strong>今日:</strong> {todayStr()}</div>
          <button className="btn" onClick={addHabit}>項目を追加</button>
        </div>
        <div className="grid">
          {habits.map(h => (
            <button
              key={h.key}
              className="btn"
              onClick={()=>toggle(h.key)}
              style={{ background: today.done[h.key] ? '#d1fae5' : '#fff', borderColor: today.done[h.key] ? '#10b981' : '#ddd' }}
            >
              {today.done[h.key] ? '✅ ' : ''}{h.label}
            </button>
          ))}
        </div>
        <textarea
          className="textarea"
          placeholder="今日の一言（任意）"
          value={today.note || ''}
          onChange={(e)=>{
            const next = { ...today, note: e.target.value };
            const others = days.filter(x=>x.date!==todayStr());
            save(habits, [next, ...others]);
            setNote(e.target.value);
          }}
        />
      </section>

      <section className="card vstack">
        <h3>直近7日の達成率</h3>
        <div className="row">
          <div className="card"><strong>達成チェック数</strong><div style={{fontSize:24}}>{week.checked}/{week.totalChecks}</div></div>
          <div className="card"><strong>達成率</strong><div style={{fontSize:24}}>{week.rate.toFixed(0)}%</div></div>
        </div>
        <small className="muted">ヒント: 達成率が60%を下回る週は「休息日」を明示的に入れると挽回しやすい。</small>
      </section>

      <section className="vstack">
        <h3>履歴</h3>
        <div className="grid">
          {days.sort((a,b)=>b.date.localeCompare(a.date)).slice(0,21).map(d=>(
            <article className="card" key={d.date}>
              <div><strong>{d.date}</strong></div>
              <div>{habits.map(h => d.done[h.key] ? `✅${h.label}` : `□${h.label}`).join('  ')}</div>
              {d.note && <div>メモ: {d.note}</div>}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
