oninstall = function(e) {
  e.waitUntil(new Promise(function(r) { setTimeout(r, 5); }));
};

onactivate = function(e) {
  e.waitUntil(new Promise(function(r) { setTimeout(r, 5); }));
};

self.addEventListener('message', function(e) {
  var message = e.data;
  if (typeof message == 'object' && 'port' in message) {
    var response = 'Ack for: ' + message.from;
    try {
      message.port.postMessage(response);
    } catch(e) {}
  }
});
