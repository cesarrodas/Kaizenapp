export const exsolve = promise => {
  promise.then(result => ({ ok: true, result }))
  .catch(error => Promise.resolve({ ok: false, error }));
};