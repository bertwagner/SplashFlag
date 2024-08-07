"use strict";

//
// Variables
//








//
// Methods
//










// 
// Event listeners
//

document.addEventListener('click', function (event) {
  
  // show hide pages from navigation
  if (event.target.dataset.nav != undefined) {
    let pages = document.querySelectorAll('[data-nav]');
    
    for (let i=0; i < pages.length; i++) {
      let page=pages[i].dataset.nav;
      document.querySelector(`#page-${page}`).classList.add("hidden");
    }

    document.querySelector(`#page-${event.target.dataset.nav}`).classList.remove("hidden");
  }
});



///
/// init
/// 





// const button = document.getElementById("enable");
// button.addEventListener("click", () => {
//   Notification.requestPermission()
//   randomNotification()
// });

function randomNotification() {
    const randomItem = Math.floor(Math.random());
    const notifTitle = 'THE TITLE';
    const notifBody = `Created by Bert.`;
    const notifImg = '';

    const options = {
      body: notifBody,
      icon: notifImg,
    };
    new Notification(notifTitle, options);
    //setTimeout(randomNotification, 3000);
  }

// This function is needed because Chrome doesn't accept a base64 encoded string
// as value for applicationServerKey in pushManager.subscribe yet
// https://bugs.chromium.org/p/chromium/issues/detail?id=802280
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Register a Service Worker.
navigator.serviceWorker.register('service-worker.js');

navigator.serviceWorker.ready
  .then(function (registration) {

    // Use the PushManager to get the user's subscription to the push service.
    return registration.pushManager.getSubscription()
      .then(async function (subscription) {
        // If a subscription was found, return it.
        
        if (subscription) {
          return subscription;
        }

        // Get the server's public key
        const response = await fetch('https://api.splashflag.com/vapidPublicKey');
        const vapidPublicKey = await response.text();
        // Chrome doesn't accept the base64-encoded (string) vapidPublicKey yet
        // urlBase64ToUint8Array() is defined in /tools.js
        console.log('vapid public:',vapidPublicKey)
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
        console.log('converted:',convertedVapidKey);
        // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
        // send notifications that don't have a visible effect for the user).
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        });
      });
  }).then(function (subscription) {
    // console.log('registering:',JSON.stringify({
    //   subscription
    // }))
    // Send the subscription details to the server using the Fetch API.
    fetch('https://api.splashflag.com/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        subscription
      }),
    });

    // document.getElementById('notifications').onclick = function() {
    //   const payload = document.getElementById('notification-payload').value;
    //   const delay = document.getElementById('notification-delay').value;
    //   const ttl = document.getElementById('notification-ttl').value;
  
    //   // Ask the server to send the client a notification (for testing purposes, in actual
    //   // applications the push notification is likely going to be generated by some event
    //   // in the server).
    //   fetch('https://api.splashflag.com/sendNotification', {
    //     method: 'post',
    //     headers: {
    //       'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       subscription: subscription,
    //       payload: payload,
    //       delay: delay,
    //       ttl: ttl,
    //     }),
    //   });
    // };
  });