// استقبال رسائل التذكير من التطبيق وإظهار الإشعارات
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    const { title, body, tag } = event.data;
    
    self.registration.showNotification(title, {
      body: body,
      icon: 'icon.png', // يمكنك وضع مسار أيقونة تطبيقك هنا
      badge: 'icon.png',
      tag: tag || 'duwai-notification',
      vibrate: [200, 100, 200], // نمط الاهتزاز
      dir: 'rtl',
      lang: 'ar',
      actions: [
        { action: 'taken', title: 'تم تناولها' },
        { action: 'snooze', title: 'تأجيل 15د' }
      ]
    });
  }
});

// التعامل مع الضغط على الإشعار
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // فتح التطبيق عند الضغط على الإشعار
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('./index.html');
    })
  );
});
