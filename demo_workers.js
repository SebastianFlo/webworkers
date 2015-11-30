var i = 0;

function timedCount() {
    i = i + 1;
    //message back to html
    postMessage(i);
    setTimeout("timedCount()",500);
}

timedCount();

onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data);
  console.log('Posting message back to main script');
  postMessage(workerResult);
}