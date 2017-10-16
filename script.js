var drun, dscolor, notify, phoenix, rrcolor, search, send;

search = {
  dsubmit: function() {
    drun(this.rtext());
    return true;
  },
  rtext: function() {
    return $(".search-area input")[0].value;
  },
  dtext: function(val) {
    return $(".search-area input")[0].value = val;
  }
};

rrcolor = function(ctc) {
  var hawks, tmpcolor;
  hawks = document.createElement('div');
  hawks.style.borderColor = '';
  hawks.style.borderColor = ctc;
  tmpcolor = hawks.style.borderColor;
  if (tmpcolor.length === 0) {
    return false;
  }
  return true;
};

dscolor = function(ctc) {
  var color;
  color = ctc;
  $(".search-icon").css({
    "border": "1px solid " + color
  });
  $(".page-overlord span, .link").css({
    "color": color
  });
  $(".search-icon svg")[0].setAttribute("fill", color);
  $(".sel")[0].innerHTML = "::selection {background: " + color + ";color: white;}";
  return $(".sel")[0].innerHTML += "::-moz-selection {background: " + color + ";color: white;}";
};

drun = function(cmd) {
  $.get("q?&q=" + cmd, function(data) {
    var i, j, ref, ref1, results, x;
    data = JSON.parse(data);
    //for (x = i = 0, ref = data.text.length; i < ref; x = i += 1) {
    //  if (data.text[x]["0"] === "n") {
    //    notify(data.text[x].substr(1));
    //  }
    //}
    results = [];
    for (x = j = 0, ref1 = data.go.length; j < ref1; x = j += 1) {
      if (x === data.go.length - 1) {
        results.push(location.href = data.go[x]);
      } else {
        results.push(window.open(data.go[x]));
      }
    }
    return results;
  });
  return true;
};

notify = function(txt) {
  if (!('Notification' in window)) {
    alert("This browser does not support desktop notification. Get Chromium.");
  }
  if (Notification.permission === "granted") {
    send(txt);
  }
  if (Notification.permission !== "denied") {
    if (Notification.permission !== "granted") {
      return Notification.requestPermission(function(permission) {
        if (permission === 'granted') {
          send(txt);
        }
        return true;
      });
    }
  }
};

send = function(txt) {
  var notification, options, pj;
  pj = JSON.parse(txt);
  dscolor(pj.clr);
  options = {
    body: pj.b,
    icon: pj.img[Math.floor(Math.random() * pj.img.length)]
  };
  notification = new Notification(pj.t, options);
  return true;
};

if (window.location.hash.substr(1 === "")) {
  phoenix = decodeURIComponent(window.location.hash.substr(1).trim());
  search.dtext(phoenix);
  drun(phoenix);
}

$(".search-area input")[0].onkeydown = function(event) {
  if (event.keyCode === 13) {
    search.dsubmit();
  }
  return true;
};

$(".search-icon")[0].onclick = function() {
  search.dsubmit();
  return true;
};

$(".content .link")[0].onclick = function() {
  drun("octopus");
  return true;
};

$(".search-area input")[0].onkeyup = function() {
  var color, owls;
  color = "rgb(" + Math.floor(Math.random() * 225) + "," + Math.floor(Math.random() * 225) + "," + Math.floor(Math.random() * 225) + ")";
  owls = search.rtext().trim();
  if (owls.length === 0) {
    color = 'rgb(49, 51, 53)';
  }
  if (rrcolor(owls)) {
    color = owls;
  }
  dscolor(color);
  return true;
};
