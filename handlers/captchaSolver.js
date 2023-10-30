import Rucaptcha from "rucaptcha-client";

export async function solveCaptcha(imageUrl) {
  try {
    const rucaptcha = new Rucaptcha(xxxxxxxxxxxxxxx); // ваш API-ключ

    // Если ключ API был указан неверно, выбросит RucaptchaError с кодом
    // ERROR_KEY_DOES_NOT_EXIST. Полезно вызывать этот метод сразу после
    // инициализации, чтобы убедиться, что ключ API указан верно.
    const balance = await rucaptcha.getBalance();
    const answer = await rucaptcha.solve(imageUrl);
    return answer.text;
  } catch (err) {
    throw err;
  }
}
