'use client';
import BackupBar from "../../components/BackupBar";
import { getLocal, setLocal } from "../../lib/storage";
import { useEffect, useMemo, useState } from "react";

type Inspiration = {
  id: string;
  createdAt: number;
  type: 'photo'|'video'|'text';
  content: string; // URL or text
  tags: string[];
  caption?: string;
};

function uid(){ return Math.random().toString(36).slice(2); }

export default function InspirationPage(){
  const [items, setItems] = useState<Inspiration[]>([]);
  const [type, setType] = useState<'photo'|'video'|'text'>('text');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [caption, setCaption] = useState('');

  useEffect(()=>{
    setItems(getLocal<Inspiration[]>('flow_inspiration', []));
  },[]);

  function save(list: Inspiration[]){
    setItems(list);
    setLocal('flow_inspiration', list);
  }

  function add(){
    if(!content.trim()) return;
    const item: Inspiration = {
      id: uid(),
      createdAt: Date.now(),
      type, content: content.trim(),
      tags: tags.split(',').map(t=>t.trim()).filter(Boolean),
      caption: caption.trim() || undefined
    };
    save([item, ...items]);
    setContent(''); setTags(''); setCaption('');
  }

  function remove(id: string){
    save(items.filter(i=>i.id!==id));
  }

  return (
    <main className="vstack">
      <BackupBar />
      <div className="card vstack">
        <h2>Inspiration Bank</h2>
        <div className="row">
          <select className="select" value={type} onChange={e=>setType(e.target.value as any)}>
            <option value="text">テキスト</option>
            <option value="photo">写真URL</option>
            <option value="video">動画URL</option>
          </select>
          <input className="input" placeholder="内容（テキスト or URL）" value={content} onChange={e=>setContent(e.target.value)} />
        </div>
        <div className="row">
          <input className="input" placeholder="タグ（カンマ区切り）" value={tags} onChange={e=>setTags(e.target.value)} />
          <input className="input" placeholder="キャプション（任意）" value={caption} onChange={e=>setCaption(e.target.value)} />
          <button className="btn" onClick={add}>追加</button>
        </div>
      </div>

      <section className="grid">
        {items.map(i=>(
          <article className="card vstack" key={i.id}>
            <small className="muted">{new Date(i.createdAt).toLocaleString()}</small>
            <div><strong>タイプ:</strong> {i.type}</div>
            {i.type==='text' ? (
              <div>{i.content}</div>
            ) : i.type==='photo' ? (
              <img src={i.content} alt="photo" style={{width:'100%', borderRadius:12}} />
            ) : (
              <video src={i.content} controls style={{width:'100%', borderRadius:12}} />
            )}
            {i.caption && <div><strong>キャプション:</strong> {i.caption}</div>}
            {i.tags.length>0 && <div><strong>タグ:</strong> {i.tags.join(', ')}</div>}
            <div className="row" style={{justifyContent:'flex-end'}}>
              <button className="btn" onClick={()=>remove(i.id)}>削除</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
