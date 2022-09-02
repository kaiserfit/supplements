var json_str = getCookie('usr_d');
var arr = JSON.parse(json_str);
var name = arr[0].cname;
var cid = arr[0].cid;
checkProfile(cid);

document.getElementById("uname").textContent = name;