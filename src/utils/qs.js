export default (params) => Object.keys(params)
  .filter((k) => typeof params[k] !== 'undefined')
  .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
  .join('&');
