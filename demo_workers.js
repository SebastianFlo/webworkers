var i = 0;

function timedCount() {
    i = i + 1;
    //message back to html
    postMessage(i);
    setTimeout("timedCount()",500);
}

timedCount();