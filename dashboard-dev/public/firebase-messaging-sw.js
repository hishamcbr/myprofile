importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');
let my_client;
self.addEventListener('message', event => {
    if (event.data == "ping") {
        my_client = event.source;
    }
});

firebase.initializeApp({
    'messagingSenderId': '190719057519'
});

try {
  if (firebase.messaging.isSupported()) {
    const messaging = firebase.messaging();
  }
} catch (e) {}

// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//         body: 'Background Message body.',
//         icon: '/firebase-logo.png'
//     };

//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });

self.addEventListener('push', function(event) {
    event.preventDefault()
    var pushData = event.data.json();
    try {
        var notificationData = pushData.notification;
        notificationData.sound = '../static/audio/notification.mp3'
        self.registration.showNotification(pushData.notification.title, notificationData);
        const channel = new BroadcastChannel('sw-messages');
        channel.postMessage({
            title: 'Hello from SW'
        });
    } catch (err) {
        console.log('Push error happened: ', err);
    }
});