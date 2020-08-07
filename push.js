const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BEGq1GvPiuPfMlE0dmut6eZrd1iJHNoYhHR0sbhtASVT-Pko5yT8eBz5UEGwabKC9rkUU_Z4klY2CNV86dO3zPk",
   "privateKey": "gyVn0mP5MkxcKnqr8_iVj8KF-JgnL9i_TMKBNLPqgp4"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/c6MNQuVob2A:APA91bFFKz0DbFoRQRtPeeoxt3N20Ir-dDdibqM8wL4ugmMBfof94naTUrF5idK6gQAwCcCTSFcKTae1O1b2B96-UY7zffhgoYl84ZlXDkxFRQ94gxY91lVJs07reh40MZRHT-aDIOEi",
   "keys": {
       "p256dh": "BB5TkyQbBa+P7YWf2l2KDQJ81ICZRrOUQmroQuOmhZP1TwdPDAjev6sLR9oHWfQU7y4wlRI8RE+C0BaCfXqXvu8=",
       "auth": "WZHFDQKctYQaK97FjGxgVg=="
   }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '92373393987',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);