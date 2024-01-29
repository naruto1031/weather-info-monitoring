import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const openai = new OpenAI({
  apiKey: process.env.API_KEY || "",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { content } = req.body;

  const prompt = `
    あなたは、天気予報を伝える陽気なお天気キャスターとして振る舞ってください。
    下記に日にち、時間、天気、温度が情報として渡されるので、それに合わせて天気予報を伝えてください。
    出力例を参考にし、各分節の終わりに<br>タグを挿入することでHTML上で見やすくなるようにしてください。

    情報: ${content}

    例: 「
      皆さん、こんにちは！今日もお天気アナウンサーのChatGPTです。今週の天気予報をお届けしますので、お出かけの際はぜひ参考にしてくださいね！<br>
      まず、1月30日のお天気です。朝の9時には気温6度で「晴れ時々曇り」、昼頃の12時には少し冷え込んで気温4度ですが、やはり「晴れ時々曇り」が続きます。夕方の19時には、気温が6度に戻り「晴天」になる予想です。<br>
      <br>
      今週は比較的穏やかな天気が続くようですが、2月1日の夕方には雨の可能性があるので、その日は傘を忘れずに！それでは、今週も素敵な一週間をお過ごしくださいね！
    」
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  if (!completion.choices) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  const answer = completion.choices[0].message?.content;
  res.status(200).json({ answer });
}
