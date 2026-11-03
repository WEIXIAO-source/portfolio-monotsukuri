# 第5回 サーバの動かし方

1. このフォルダ(server)を VS Code で開く
2. ターミナルを開く(表示 → ターミナル)。右側に server と出ていることを確かめる
3. 最初の1回だけ:npm install (Express が node_modules に入る。数十秒かかる)
4. 起動:node --watch server.js → 「サーバを起動しました」と出る(starter は STEP 1 を書いてから)
5. ブラウザで http://localhost:3000/ を開く
6. --watch を付けて起動していれば、保存するたびに自動で再起動する。止めるときは Ctrl + C

確かめる URL

| URL | 返るもの | ステータス |
| --- | --- | --- |
| http://localhost:3000/ | index.html | 200 |
| http://localhost:3000/api/works | 作品の配列(JSON) | 200 |
| http://localhost:3000/api/works/2 | id が 2 の作品(JSON) | 200 |
| http://localhost:3000/api/works/99 | {"error": "…"} | 404 |

うまくいかないとき

- node が見つからない → Node.js が入っていない。nodejs.org から LTS をインストールして、VS Code を開き直す
- Cannot find module 'express' → npm install をしていない。server フォルダの中で実行する
- EADDRINUSE → 前のサーバが動いたまま。そのターミナルで Ctrl + C
- ページは開くが一覧が空 → STEP 4 まで書いたか、保存したか。F12 の Network タブで /api/works の行を見る
- Cannot set headers after they are sent → STEP 6 の return 忘れ
