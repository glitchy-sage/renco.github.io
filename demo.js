/* Demo only: answers the contact form without a server. Nothing is sent anywhere. */
(function () {
  var realFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : input && input.url ? input.url : '';
    var method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    if (method === 'POST' && /\/api\/contact$/.test(url.split('?')[0])) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(new Response(JSON.stringify({ demo: true }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
        }, 600);
      });
    }
    return realFetch(input, init);
  };
})();
