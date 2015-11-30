/*
    Web workers have no access to:
    = The window object
    = The document object
    = The parent object
*/
var w;

function startWorker() {
    //check browser support
    if(typeof(Worker) !== "undefined") {
        // create web worker object
        if(typeof(w) == "undefined") {
            w = new Worker("demo_workers.js");
        }
        // event listener
        w.onmessage = function(event) {
            console.log(event);
            var date = new Date(event.timeStamp);
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var seconds = "0" + date.getSeconds();
            var milis = "0" + date.getMilliseconds();
            console.log(' at ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ':' + milis.substr(-2));
            document.getElementById("result").innerHTML = event.data;
        };
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
    }
}

function stopWorker() { 
    //terminate web worker
    w.terminate();
    //reuse web worker
    w = undefined;
}

function sendMessageToWorker(){
    var id = document.getElementById("field").value;
    //check browser support
    if(typeof(Worker) !== "undefined") {
        // create web worker object
        if(typeof(w) == "undefined") {
            w = new Worker("demo_workers.js");
        }
        //event sender
        w.postMessage(id);
        console.log('Message posted to worker');
        
        w.onmessage = function(event) {
            document.getElementById("result").innerHTML = event.data;
            console.log('Message received from worker');
        }
    }
}

