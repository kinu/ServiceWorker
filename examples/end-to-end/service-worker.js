var port;
var resolve;

oninstall = function(e) {
  e.waitUntil(new Promise(function(r) { resolve = r; }));
}

onactivate = function(e) {
  port.postMessage('ping');
  e.waitUntil(new Promise(function(r) { resolve = r; }));
}

self.addEventListener('message', function(e) {
  var message = e.data;
  if ('port' in message) {
    if (message.from == 'registering doc')
      port = message.port;
    var response = 'Ack for: ' + message.from;
    try {
      message.port.postMessage(response);
    } catch(e) {}
    try {
      message.source.postMessage(response, '*');
    } catch (e) {}
  }
  if (resolve) {
    resolve();
    resolve = null;
  }
});
