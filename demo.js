/* Demo only: answers the order form without a server. Nothing is sent anywhere. */
(function () {
  var realFetch = window.fetch.bind(window);
  var alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : input && input.url ? input.url : '';
    var method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    if (method === 'POST' && /\/api\/order-request$/.test(url.split('?')[0])) {
      var d = new Date();
      var pad = function (n) { return (n < 10 ? '0' : '') + n; };
      var suffix = '';
      for (var i = 0; i < 4; i++) suffix += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      var ref = 'RE-' + pad(d.getFullYear() % 100) + pad(d.getMonth() + 1) + pad(d.getDate()) + '-' + suffix;
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(new Response(JSON.stringify({ ref: ref }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
        }, 600);
      });
    }
    return realFetch(input, init);
  };
})();
