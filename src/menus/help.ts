import open from 'opn';
import { App } from 'electron';

export function help(app: App): Electron.MenuItemConstructorOptions {
  return {
    label: 'Help',
    submenu: [
      {
        label: 'Online Documentation',
        click: () => open('https://support.office.com/en-us/teams?omkt=en-001')
      },
      {
        label: 'Github Project',
        click: () => open('https://github.com/JamieMagee/teams-for-linux')
      },
      { type: 'separator' },
      {
        label: `Version ${app.getVersion()}`,
        enabled: false
      },
      { role: 'toggledevtools' }
    ]
  };
}
