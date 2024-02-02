# 気象状況可視化システム

このシステムはGPSモジュールを使用して、特定の場所の天気情報を簡単に取得し描画することができます。さらに、OpenAIのAPIを利用して、一週間の天気予報をお天気アナウンサーのように説明する機能も備えています。

## フロントエンド

### 言語

- TypeScript

### フレームワーク

- Next.js (Pages Router)

### ライブラリ

- Chakra UI
- OpenAI (API)
- open-meteo (API) - 緯度経度から一週間の天気情報を取得。
- Vercel CLI
- Chart.js - 天気情報をグラフ化。

### ホスティング先

- Vercel: [https://weather-info-monitoring.vercel.app/](https://weather-info-monitoring.vercel.app/)

## バックエンド

### 使用言語

- Node.js (TypeScript)

### ライブラリ

- Google Cloud Platform (Cloud Firestore)
- Firebase CLI
- Serialport - GPSモジュールからのデータ取得。
- Node-cron - 1分ごとにSerialportからの情報を取得し、Firestoreに送信。

### リポジトリURL

- GitHub: [https://github.com/naruto1031/weather-info-monitoring-server](https://github.com/naruto1031/weather-info-monitoring-server)
