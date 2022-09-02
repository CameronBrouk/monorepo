import fetch from 'node-fetch'

const domain = 'http://localhost:4000'

export const getSingle = async (api: string, id: number) => {
  const response = await fetch(`${domain}/${api}/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const responseBody = await response.text()
  const isJSON =
    typeof responseBody === 'string' ? /{.*}/.test(responseBody) : false
  const body = isJSON ? JSON.parse(responseBody) : responseBody

  if (response.status !== 200) console.log(body)

  return {
    body,
    status: response.status
  }
}

export const createSingle = async (api: string, data: any) => {
  const response = await fetch(`${domain}/${api}`, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  const responseBody = await response.text()
  const isJSON =
    typeof responseBody === 'string' ? /{.*}/.test(responseBody) : false
  const body = isJSON ? JSON.parse(responseBody) : responseBody

  if (response.status !== 200) console.log(body)

  return {
    body,
    status: response.status
  }
}

export const updateSingle = async (api: string, data: any, id: string) => {
  const response = await fetch(`${domain}/${api}/${id}`, {
    body: JSON.stringify(data),
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' }
  })
  const responseBody = await response.text()
  const isJSON =
    typeof responseBody === 'string' ? /{.*}/.test(responseBody) : false
  const body = isJSON ? JSON.parse(responseBody) : responseBody

  if (response.status !== 200) console.log(body)

  return {
    body,
    status: response.status
  }
}
