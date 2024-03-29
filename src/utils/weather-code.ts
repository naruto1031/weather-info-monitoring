interface WeatherCode {
  [key: number]: string;
}

export const weatherCodes: WeatherCode = {
  0: '晴天',
  1: '晴れ時々曇り',
  2: '晴れ時々曇り',
  3: '晴れ時々曇り',
  45: '霧と降る霧氷',
  48: '霧と降る霧氷',
  51: '霧雨: 軽い',
  53: '霧雨: 中程度',
  55: '霧雨: 濃い強度',
  56: '氷結霧雨: 軽い',
  57: '氷結霧雨: 濃い強度',
  61: '雨: 小雨',
  63: '雨: 中程度',
  65: '雨: 激しい雨',
  66: '凍てつく雨: 軽い',
  67: '凍てつく雨: 激しい',
  71: '降雪量: わずか',
  73: '降雪量: 中程度',
  75: '降雪量: 激しい',
  77: '雪の粒',
  80: 'にわか雨: 小雨',
  81: 'にわか雨: 中程度',
  82: 'にわか雨: 激しい雨',
  85: '雪が少し降ったり',
  86: '激しく降ったりします',
  95: '雷雨: わずかまたは中程度',
  96: 'わずかまたは激しいひょうを伴う雷雨',
  99: 'わずかまたは激しいひょうを伴う雷雨'
};
