# VARIABLES

# The search box on the page
search =
  # Submit the search
  dsubmit: ->
    drun this.rtext()
    true
  # Get the input text
  rtext: ->
    $(".search-area input")[0].value
  # Set the input text
  dtext: (val )->
    $(".search-area input")[0].value = val


# FUNCTIONS

# Is this a real color?
rrcolor = (ctc) ->
  hawks = document.createElement 'div'
  hawks.style.borderColor = ''
  hawks.style.borderColor = ctc
  tmpcolor = hawks.style.borderColor
  return false if tmpcolor.length is 0
  true
# Change the color
dscolor = (ctc) ->
  color = ctc
  $(".search-icon").css {"border": "1px solid " + color}
  $(".page-overlord span, .link").css {"color": color}
  $(".search-icon svg")[0].setAttribute "fill", color
  $(".sel")[0].innerHTML = "::selection {background: " + color + ";color: white;}"
  $(".sel")[0].innerHTML += "::-moz-selection {background: " + color + ";color: white;}"
# Try the command
drun = (cmd) ->

  $.get "q?&q=" + cmd, (data) ->
    data = JSON.parse data
    #  for x in [0...data.text.length] by 1
    #    notify data.text[x].substr 1 if data.text[x]["0"] is "n"
    for x in [0...data.go.length] by 1
      if x is data.go.length - 1
        location.href = data.go[x]
      else
        window.open data.go[x]
  true
# Notify something
notify = (txt) ->
  alert "This browser does not support desktop notification. Get Chromium." if !('Notification' of window)
  send txt if Notification.permission is "granted"
  if Notification.permission isnt "denied"
    if Notification.permission isnt "granted"
      Notification.requestPermission (permission) ->
        if permission == 'granted'
          send txt
        true

send = (txt) ->
  pj = JSON.parse(txt)
  dscolor pj.clr
  options =
    body: pj.b
    icon: pj.img[Math.floor(Math.random() * pj.img.length)]
  notification = new Notification(pj.t, options)
  true


# RUN ON LOAD

# If there is anything after the #, run it
if window.location.hash.substr 1 is ""
  phoenix = decodeURIComponent window.location.hash.substr(1).trim()
  search.dtext phoenix
  drun phoenix


# DOM EVENTS

# When a key is pressed in the search area, see if it's an enter
$(".search-area input")[0].onkeydown = (event) ->
  search.dsubmit() if event.keyCode is 13
  true
# When the search button is pressed, submit
$(".search-icon")[0].onclick = ->
  search.dsubmit()
  true

# When the "what is this?" is pressed, do this
$(".content .link")[0].onclick = ->
  drun "octopus"
  true

# Change color on key up
$(".search-area input")[0].onkeyup =  ->
  color = "rgb(" + Math.floor(Math.random() * 225) + "," + Math.floor(Math.random() * 225) + "," + Math.floor(Math.random() * 225) + ")"
  owls = search.rtext().trim()
  color = 'rgb(49, 51, 53)' if owls.length is 0
  color = owls if rrcolor owls
  dscolor color
  true
