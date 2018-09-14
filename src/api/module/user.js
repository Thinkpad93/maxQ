import ax from '../axios';

export function qxLogin(params) {
  return ax.post('https://jsonplaceholder.typicode.com/posts', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
