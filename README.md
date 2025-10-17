# Flow Studio (PWA)

Inspiration × Mood × Ideal Life をひとつにまとめた、iPhoneホーム追加OKのPWA。  
**サーバー不要 / ログイン不要 / データは端末ローカル保存（localStorage）** 方式です。
バックアップJSONの出力/読み込みに対応。

## 機能
- **Inspiration Bank**: 写真/動画URL/テキスト＋タグ＋キャプション保存
- **Mood Mirror**: 気分・エネルギー・ストレス（1〜5）とメモの記録、直近7日の平均
- **Ideal Life Tracker**: ルーチン（サウナ/朝カフェ/施術/ジム）などの達成チェック、直近7日の達成率

## ローカル実行
```bash
npm install
npm run dev
# http://localhost:3000
```

## デプロイ（Vercel）
1. このリポジトリをGitHubにアップロード
2. https://vercel.com/import からリポジトリを選択（設定はデフォルトでOK）
3. デプロイURLをiPhoneのSafariで開く
4. 共有メニュー → 「ホーム画面に追加」でアプリ化（PWA）

## データの扱い
- 端末のlocalStorageに保存（ブラウザのストレージを消すと消えます）
- 右上の「バックアップ書き出し / 読み込み」でJSONとして保存・復元可能

## 注意
- 画像/動画はURLを保存する方式（ファイル直接アップロードは現状非対応）
- もし将来サーバー側保存や認証を入れたい場合は、SupabaseやVercel Postgresを追加してAPI化してください。
