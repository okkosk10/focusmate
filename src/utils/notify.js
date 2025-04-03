// src/utils/notify.js
export function sendNotification(title, options = {}) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options)
    }
  }
  
  export function vibrate(duration = 300) {
    if ('vibrate' in navigator) {
      navigator.vibrate(duration)
    }
  }
  