export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Ошибка: ${res.status}`);
}
