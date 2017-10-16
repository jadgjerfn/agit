<?php
  if ($q == "school"){
    array_push($text, 'n{"b":"Redirecting you to HBMS Schoology...", "t":"Redirecting..", "img":["https://p4.zdassets.com/hc/theme_assets/958824/200230227/contact.png"], "clr":"darkblue"}');
    array_push($go, "https://laketravis.schoology.com/login/ldap?school=17707999");
  } elseif ($q == "") {
    array_push($go, "https://aeio.io");
  } else {
    array_push($go, "https://google.com/search??hl=en&btnI=I&q=" . str_replace("%20", "+", urlencode($_GET["q"])));
  }
?>
