import fetch from "isomorphic-unfetch";

// params.url
// params.data
// params.method
export const  makeRequest = async params => {
  return fetch(params.url, {
    method: params.method,
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
    body: params.data ? JSON.stringify(params.data) : null,
  }).then(resp => resp.json())
}
