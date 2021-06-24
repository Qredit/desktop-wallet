![QREDIT-DESKTOP](/desktop-wallet.png)

[![Build Status](https://travis-ci.com/qredit/desktop-wallet.svg?branch=master)](https://travis-ci.com/qredit/desktop-wallet)
[![Github Latest Release](https://img.shields.io/github/release/qredit/desktop-wallet.svg)](https://github.com/qredit/desktop-wallet/releases/latest)
[![Github Downloads](https://img.shields.io/github/downloads/qredit/desktop-wallet/latest/total.svg?logo=github)](https://github.com/qredit/desktop-wallet/releases/latest)


## Download
[Latest Release](https://github.com/qredit/desktop-wallet/releases)

## Features
* Available on ***Windows***, ***Linux*** (Ubuntu/Debian) and ***MacOSX*** (signed).
* QSLP tokens enabled for Qredit and Ark Blockchain
* No need to download the Qredit or Ark blockchain, just sync to the network: launch and use within seconds.
* View any account from its address (transactions, delegate status and votes).
* Label any account and add your own contacts.
* Hardware wallet support : Ledger Nano S.
* Real-time currency value (updated every 5 min) in USD, EUR, BTC, HKD, JPY, CNY, AUD, GBP, Rubble, ...
* Autoconnect to a healthy Qredit network peer. If the peer is not good anymore, it will automatically find a new one.
* Send XQR from / to any account.
* Easily switch to a different network, or private chains.
* Choose between dark or light mode.
* Isolated processes on Windows and MacOSX to prevent from data sniffing or injection.
* Translations
* Change your delegate vote.
* When new version is available, message is shown in the right upper part.
* Easy to update - download latest version, start installation program and it will automatically remove previous version and install new one.
* Second signature supported.
* **SAVE YOUR PASSPHRASE(S) - if you lose it, you lose access to that particular address(es). There is no forgot my password option with blockchains and no one can help you retrieve it!**


## Screenshots
![dashboard](/screenshot.png)
![account](/screenshot2.png)

## Build

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. Optionally switch to node 8.11.2, because this is currently developed with this version:
```
nvm install 8.11.2
nvm use
```

Install from source:
```bash
# Clone this repository
git clone https://github.com/qredit/desktop-wallet
# Go into the repository
cd desktop-wallet
# Install dependencies
npm install
```

* In some cases, [node-hid](https://github.com/node-hid/node-hid) doesn't provide pre-built binaries, so is necessary to install the [node-hid dependencies](https://github.com/node-hid/node-hid#compiling-from-source) to build them from source before running `npm install`.

Then start:
```bash
npm start
```

### Requirements to build from OS X

```
brew tap Homebrew/bundle
brew bundle
```

## Contributing

* If you find any bugs, submit an [issue](../../issues) or open [pull-request](../../pulls), helping us catch and fix them.

## Authors
- Nayiem Willems <nayiem@qredit.io>
- FX Thoorens <fx@ark.io>
- Guillaume Verbal <doweig@ark.io>
- Lúcio Rubens <lucio@ark.io>
- Juan Martín <juan@ark.io>


