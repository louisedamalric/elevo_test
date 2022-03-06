export const getRequest = async (url) => {
  const response = await fetch(url)
  return await response.json()
}

export const request = async (url, values, method) => {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values)
  })
  return await response.json()
}
