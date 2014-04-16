function log(msg) {
  var name = document.location.pathname.substr(1) + document.location.hash;
  parent.document.getElementById('log').innerHTML += '<b>' + name + '</b>: ' + msg + '<br/>';
}

function test_header(msg) {
  log('<b>* ' + msg + '</b>');
}

function pass(msg) {
  log('<span style="color:green">PASS: </span>' + msg);
}

function error(msg) {
  log('<span style="color:red">ERROR: </span>' + msg);
}

function assert(expr) {
  try {
    if (eval(expr))
      pass(expr);
    else
      error(expr);
  } catch (e) {
    error(expr + ' threw exception ' + e);
  }
}

var testFinished = false;
setTimeout(function () {
  if (!testFinished) {
    error('*** Test timeout ***');
    done();
  }
}, 3000);

function errorHandler(e) {
  error('Got unexpected error: ' + e.name + ' ' + e.description);
  testFinished = true;
  done();
}

function done() {
  if (testFinished)
    return;
  testFinished = true;
  if (window.onTestFinished)
    onTestFinished();
  log("===== Test finished =====");
}

function sendMessagePortToServiceWorker(sw, from, handler) {
  var messageChannel = new MessageChannel();
  messageChannel.port1.onmessage = handler;
  sw.postMessage({port:messageChannel.port2, from:from},
                 [messageChannel.port2]);
}

var currentChangeCount = 0,
    currentStateChangeCount = 0;

if (navigator.serviceWorker) {
  navigator.serviceWorker.oncurrentchange = function() {
    ++currentChangeCount;
    setStateChangeCounter(navigator.serviceWorker.active,
                          'currentStateChangeCount');
  };

  setStateChangeCounter(navigator.serviceWorker.current,
                        'currentStateChangeCount');
}

function setStateChangeCounter(sw, counterName) {
  if (sw)
    sw.onstatechange = function() { eval('++' + counterName); };
}
