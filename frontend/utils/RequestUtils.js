import fetch from 'isomorphic-unfetch'

// params.url
// params.data
// params.method

export const makeRequest = params => {
  const url = params.url || ''
  const requestParams = {
    method: params.method || 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (requestParams.method.toLowerCase() !== 'get') {
    requestParams.body = JSON.stringify(params.data) || null
  }

  return fetch(url, requestParams).then(resp => resp.json())
}
