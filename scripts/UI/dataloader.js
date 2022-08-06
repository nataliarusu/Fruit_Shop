export async function getData(url) {
  const response = await fetch(url);//we get our response obj stream unparsed body from fetch
  const data = await response.json();//it parse the body of the response and parse its body
  return data;
}
//fetch() it is built in browser and it exposed to JS globaly available function in JS
//fetch(url) it will send a GET request!
//it is promisified so it returns promise itself, we don't need to promise it as new Promise
//BUT fetch don't give us json parsed respose, it gives as streamed response