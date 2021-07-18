export default async function simplifiedFetch(url, method, parameters = {}) {
  const token = document.querySelector('meta[name="csrf-token"]').content

  const raw = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', "X-CSRF-Token": token, },
    body: JSON.stringify(parameters)
  })

  return await raw.json()
}