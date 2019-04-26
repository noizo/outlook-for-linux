# Outlook-for-linux

![](https://img.shields.io/github/release/IsmaelMartinez/teams-for-linux.svg?style=flat)
![](https://img.shields.io/github/downloads/IsmaelMartinez/teams-for-linux/total.svg?style=flat)
[![Build Status](https://travis-ci.org/IsmaelMartinez/teams-for-linux.svg?branch=develop)](https://travis-ci.org/IsmaelMartinez/teams-for-linux)
[![dependencies Status](https://david-dm.org/IsmaelMartinez/teams-for-linux/status.svg)](https://david-dm.org/IsmaelMartinez/teams-for-linux)
[![devDependencies Status](https://david-dm.org/IsmaelMartinez/teams-for-linux/dev-status.svg)](https://david-dm.org/IsmaelMartinez/teams-for-linux?type=dev)

Unofficial Microsoft Outlook client for Linux using [Electron](https://electronjs.org/).
It uses the Web App and wraps it as a standalone application using Electron.

<<<<<<< HEAD
## Install

You can download the tarball, rpm or deb from the [releases page](https://github.com/IsmaelMartinez/teams-for-linux/releases).

## Run from source

```bash
yarn start
```

## Build for linux

```bash
yarn run dist:linux
```

This will build an deb, rpm, snap, AppImage and tar.gz files in the dist folder. This files can be run in most popular linux distributions.

Is possible to specify the snap or AppImage build type using running this:

```bash
yarn run dist:linux:snap
```

### Install using snap file

To install the snap file using the generated file use this command.

```bash
sudo snap install teams-for-linux_VERSION_amd64.snap --dangerous
```

#### Use camera using the Snap build

Snap uses confinement to provide more security, this restric the access to hardware or data on your device to prevent security issues.

The camera is a restricted device on Snap, so you need to allow the access to the camera on Outlook For Linux to be able to do videocalls, to do that run this command after the installation of the snap to create an interface to the camera:

```bash
sudo snap connect teams:camera core:camera
```

=======
>>>>>>> 2c1c19546a8954db54630ac40c6f8bc797893e7c
## Available starting arguments

Check in the config [README.md](app/config/README.md) in the config folder.

## Contributing

Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information about how to run this application from source, and/or how to contribute.

## History

Read about the history about this project in the [HISTORY.md](HISTORY.md) file.

## Known issues

Known issues and workarounds can be found in the [KNOWN_ISSUES.md](KNOWN_ISSUES.md) file.

## License

[GPLv3](LICENSE.md)
