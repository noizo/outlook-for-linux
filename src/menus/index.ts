import { app, nativeImage, ipcMain, Tray, Menu } from 'electron';
import { preferences } from './preferences';
import { help } from './help';

let shouldQuit = false;

export class Menus {
  iconPath: any;
  config: any;
  tray!: Tray;
  image!: Electron.NativeImage;

  constructor(config, iconPath) {
    this.iconPath = iconPath;
    this.config = config;
  }

  static quit() {
    shouldQuit = true;
    app.quit();
  }

  static reload(window) {
    window.show();
    window.reload();
  }

  static open(window) {
    window.show();
  }

  register(window) {
    const appMenu = Menu.buildFromTemplate([
      {
        label: 'Open',
        accelerator: 'ctrl+O',
        click: () => Menus.open(window)
      },
      {
        label: 'Refresh',
        accelerator: 'ctrl+R',
        click: () => Menus.reload(window)
      },
      {
        label: 'Quit',
        accelerator: 'ctrl+Q',
        click: () => Menus.quit()
      }
    ]);

    window.setMenu(
      Menu.buildFromTemplate([
        {
          // workaround for alt+shift showing the hidden menu and blocking input
          label: ''
        },
        {
          label: 'File',
          submenu: appMenu
        },
        preferences(this.config, window),
        help(app)
      ])
    );

    this.tray = new Tray(this.iconPath);
    this.tray.setToolTip('Microsoft Teams');
    this.tray.on('click', () => {
      if (window.isFocused()) {
        window.hide();
      } else {
        window.show();
        window.focus();
      }
    });
    this.tray.setContextMenu(appMenu);

    window.on('close', event => {
      if (!shouldQuit) {
        event.preventDefault();
        window.hide();
      } else {
        app.quit();
      }
    });

    ipcMain.on('notifications', (event, { count, icon }) => {
      try {
        this.image = nativeImage.createFromDataURL(icon);
        this.tray.setImage(this.image);
        window.flashFrame(count > 0);
      } catch (e) {
        console.error(`Could not update tray icon: ${e.message}`, e);
      }
    });
  }
}
