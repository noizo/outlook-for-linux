import { NativeImage } from 'electron';

export function nativeNotifications({ ipc, iconPath }) {
  return () => {
    const icon = NativeImage.createFromPath(iconPath);
    if (typeof ipc.Notify !== 'undefined') {
      ipc.Notify.prototype.show = function show() {
        const notification = new Notification(this.title, {
          body: this.options.body,
          icon: icon.toDataURL()
        });
        notification.onclick = () => {
          ipc.send('nativeNotificationClick');
        };
      };
    }
  };
}
