window.addEventListener("load", function () {
    document.getElementById("register") .addEventListener("click", register);
    document.getElementById("push") .addEventListener("click", setPush);
    navigator.serviceWorker.ready.then(checkPush)
}, false)

function register() {
  navigator.serviceWorker.register("./push.js").then(checkNotification)
}

function checkNotification() {
  Notification.requestPermission(function(permission) {
      if (permission != "denied") {
        document.getElementById("push").disabled = false;
      }
      else {
        alert("プッシュ通知を有効にできません。ブラウザの設定を確認してください。")
      }
  })
}

var subscription = null;

function checkPush(sw) {
  sw.pushManager.getSubscription().then(setSubscription, resetSubscription)
}

function setSubscription(s) {
  if (!s) {
    resetSubscription()
  }
  else {
    document.getElementById("register").disabled = true
    subscription = s
    var p = document.getElementById("push")
    p.textContent = "プッシュ通知を解除する"
    p.disabled = false
    registerNotification(s)
  }
}

function resetSubscription() {
  document.getElementById("register").disabled = true
  subscription = null
  var p = document.getElementById("push")
  p.textContent = "プッシュ通知を有効にする"
  p.disabled = false
}

function setPush() {
    
  if(!subscription)  {
      
    if (Notification.permission == "denied") {
        alert("プッシュ通知を有効にできません。ブラウザの設定を確認してください。")
        return 
    }
    navigator.serviceWorker.ready.then(subscribe)
  }
  else {
    navigator.serviceWorker.ready.then(unsubscribe)
  }
}

function subscribe (sw) {
  sw.pushManager.subscribe({
      userVisibleOnly: true
  }).then(setSubscription,resetSubscription)
}

function unsubscribe () {
  if (subscription) {

    // ...
    alert("hoge")

    subscription.unsubscribe();
  }
  resetSubscription();
}

function registerNotification(s) {
  var endpoint = s.endpoint;
  // Chrome 43以前への対処
  if(('subscriptionId' in s) && !s.endpoint.match(s.subscriptionId)) {
    endpoint += '/' + s.subscriptionId;
  }
  
  console.log("endpoint: ",endpoint.replace(/^https.+?send\//,""))
}
