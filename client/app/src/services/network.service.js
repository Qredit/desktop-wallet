; (function () {
  'use strict'

  angular.module('arkclient.services')
    .service('networkService', ['$q', '$http', '$timeout', 'storageService', 'timeService', 'toastService', NetworkService])

  /**
   * NetworkService
   * @constructor
   */
  function NetworkService($q, $http, $timeout, storageService, timeService, toastService) {
    const _path = require('path')
    const ark = require(_path.resolve(__dirname, '../node_modules/qreditjs'))
    const mainNetQreditJsNetworkKey = 'mainnet'

    let network = switchNetwork(storageService.getContext())

    if (!network) {
      network = switchNetwork()
    }
    ark.crypto.setNetworkVersion(network.version || 75)

    const momentTimezone = require('moment-timezone')
    const momentRange = require('moment-range')
    momentRange.extendMoment(momentTimezone)

    const clientVersion = require(_path.resolve(__dirname, '../../package.json')).version

    let peer = {
      ip: network.peerseed,
      network: storageService.getContext(),
      isConnected: false,
      height: 0,
      lastConnection: null,
      price: storageService.getGlobal('peerCurrencies') || { btc: '0.0' }
    }

    const connection = $q.defer()

    connection.notify(peer)

    function setNetwork(name, newnetwork) {
      ensureValidPeerSeed(newnetwork)

      const n = storageService.getGlobal('networks')
      n[name] = newnetwork
      storageService.setGlobal('networks', n)
    }

    function removeNetwork(name) {
      const n = storageService.getGlobal('networks')
      delete n[name]
      storageService.setGlobal('networks', n)
      storageService.deleteState()
    }

    function createNetwork(data) {
      ensureValidPeerSeed(data)
      const networks = storageService.getGlobal('networks')
      const deferred = $q.defer()
      if (networks[data.name]) {
        deferred.reject("Network name '" + data.name + "' already taken, please choose another one")
      } else {
        $http({
          url: data.peerseed + '/api/node/configuration',
          method: 'GET',
          timeout: 5000
        }).then(
          (resp) => {
            const newNetwork = resp.data
            newNetwork.isUnsaved = true
            newNetwork.forcepeer = data.forcepeer
            newNetwork.peerseed = data.peerseed
            newNetwork.slip44 = 1 // default to testnet slip44
            newNetwork.cmcTicker = data.cmcTicker
            deferred.resolve({ name: data.name, network: newNetwork })
          },
          (resp) => {
            deferred.reject('Cannot connect to peer to autoconfigure the network')
          }
        )
      }
      return deferred.promise
    }

    function ensureValidPeerSeed(network) {
      if (!network || !network.peerseed) {
        return
      }

      network.peerseed = network.peerseed.replace(/\/$/, '')
    }

    function switchNetwork(newnetwork, reload) {
      let n
      if (!newnetwork) { // perform round robin
        n = storageService.getGlobal('networks')
        const keys = Object.keys(n)
        let i = keys.indexOf(storageService.getContext()) + 1
        if (i === keys.length) {
          i = 0
        }
        storageService.switchContext(keys[i])
        return window.location.reload()
      }
      storageService.switchContext(newnetwork)
      n = storageService.getGlobal('networks')
      if (!n) {
        n = {
          mainnet: createNetworkFromQreditJs(mainNetQreditJsNetworkKey, 0x4b, 111, 'url(assets/images/images/Ark.jpg)'),
        }
        storageService.setGlobal('networks', n)
      }
      if (reload) {
        return window.location.reload()
      }
      return n[newnetwork]
    }

    function createNetworkFromQreditJs(qreditJsNetworkKey, version, slip44, background) {
      const qreditJsNetwork = ark.networks[qreditJsNetworkKey]

      return {
        qreditJsKey: qreditJsNetworkKey,
        nethash: "7fadccaae136bfa7655aa1e1f2de440804abbf64af9f380ccfbef916e18b485c",
        peerseed: "https://qredit.cloud/",
        token: "XQR",
        symbol: "XQR",
        explorer: "https://explorer.qredit.io/#",
        version: "75",
        slip44: slip44,
        forcepeer: false,
        background: background,
        //        qreditJsKey: qreditJsNetworkKey,
        //        nethash: qreditJsNetwork.nethash,
        //        peerseed: 'http://' + qreditJsNetwork.activePeer.ip + ':' + qreditJsNetwork.activePeer.port,
        //        token: qreditJsNetwork.token,
        //        symbol: qreditJsNetwork.symbol,
        //        explorer: qreditJsNetwork.explorer,
        //        version: version,
        //        slip44: slip44,
        //        forcepeer: false,
        //        background: background,
        theme: 'default',
        themeDark: false
      }
    }

    function tryGetPeersFromQreditJs() {
      if (!network.qreditJsKey) {
        return
      }

      const qreditjsNetwork = qredit.networks[network.qreditJsKey]
      if (!qreditjsNetwork) {
        return
      }

      return qreditjsNetwork.peers
    }

    function getNetwork() {
      return network
    }

    function getNetworkName() {
      return storageService.getContext()
    }

    function getNetworks() {
      return storageService.getGlobal('networks')
    }

    function listenNetworkHeight() {
      $http.get(peer.ip + '/api/blockchain', { timeout: 5000 }).then((resp) => {
        timeService.getTimestamp().then(
          (timestamp) => {
            peer.lastConnection = timestamp
            if (resp.data) {
              if (!resp.data.data) {
                peer.isConnected = false
                peer.error = 'Node is experiencing sychronisation issues'
                connection.notify(peer)
                pickRandomPeer()
              } else {
                peer.height = resp.data.data.block.height
                peer.isConnected = true
                connection.notify(peer)
              }
            } else {
              peer.isConnected = false
              peer.error = resp.statusText || 'Peer Timeout after 5s'
              connection.notify(peer)
            }
          }
        )
      })
      $timeout(() => listenNetworkHeight(), 60000)
    }

    function getFromPeer(api) {
      const deferred = $q.defer()
      peer.lastConnection = new Date()
      $http({
        url: peer.ip + api, //'/api/peers',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          os: 'ark-desktop',
          version: clientVersion,
          port: 1,
          nethash: network.nethash
        },
        timeout: 5000
      }).then(
        (resp) => {
          deferred.resolve(resp.data)
          peer.isConnected = true
          peer.delay = new Date().getTime() - peer.lastConnection.getTime()
          connection.notify(peer)
        },
        (resp) => {
          deferred.reject('Peer disconnected')
          peer.isConnected = false
          peer.error = resp.statusText || 'Peer Timeout after 5s'
          connection.notify(peer)
        }
      )

      return deferred.promise
    }

    function broadcastTransaction(transaction, max) {
      const peers = storageService.get('peers')
      if (!peers) {
        return
      }
      if (!max) {
        max = 10
      }
      for (let i = 0; i < max; i++) {
        if (i < peers.length) {
          postTransaction(transaction, 'http://' + peers[i].ip + ':' + peers[i].port)
        }
      }
    }

    function postTransaction(transaction, ip) {
      const deferred = $q.defer()
      let peerIp = ip
      if (!peerIp) {
        peerIp = peer.ip
      }

      const endpoint = 'transactions'

      $http({
        url: `${peerIp}/${endpoint}`,
        data: { transactions: [transaction] },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          os: 'ark-desktop',
          version: clientVersion,
          port: 1,
          nethash: network.nethash
        }
      }).then((resp) => {
        if (resp.data) {
          // we make sure that tx is well broadcasted
          if (!ip) {
            broadcastTransaction(transaction)
          }
          deferred.resolve(transaction)
        } else {
          deferred.reject(resp.data)
        }
      }, (error) => deferred.reject(error))
      return deferred.promise
    }

    function pickRandomPeer() {
      if (network.forcepeer) {
        return
      }
      getFromPeer('/api/peers')
        .then((response) => {
          if (response.success) {
            const regex127 = RegExp(/^(?!127\.).*/) // does not start with '127.'
            const peers = response.peers.filter((peer) => {
              return peer.status === 'OK' && regex127.test(peer.ip)
            })
            storageService.set('peers', peers)
            findGoodPeer(peers, 0)
          } else {
            findGoodPeer(storageService.get('peers'), 0)
          }
        }, () => findGoodPeer(storageService.get('peers'), 0))
    }

    function findGoodPeer(peers, index, isStaticPeerList) {
      const isPeerListValid = () => peers && index <= peers.length - 1

      if (!isStaticPeerList && !isPeerListValid()) {
        // we don't have any peers, that means the app is probably started for the first time
        // (and therefore we do not have a peer list in our storage)
        // and getting a peer list failed (the peerseed server may be down)
        // in this case we try to get a peer from the hardcoded list in the qreditjs config
        peers = tryGetPeersFromQreditJs()
        isStaticPeerList = true
      } else if (index === 0) {
        peers = peers.sort((a, b) => b.height - a.height || a.delay - b.delay).filter(p => p.ip !== '127.0.0.1')
      }

      // check again or we may have an exception in the case when we couldn't get the static peer list from qreditjs
      if (!isPeerListValid()) {
        return
      }

      peer.ip = 'http://' + peers[index].ip + ':' + peers[index].port
      getFromPeer('/api/blockchain')
        .then((response) => {
          if (response.success && response.height < peer.height) {
            findGoodPeer(peers, index + 1, isStaticPeerList)
          } else {
            peer.height = response.height
            // if we had a static peer list, we now try to get a dynamic peer list
            // because now we know the current peer does work and we don't want to keep the hardcoded peers
            if (isStaticPeerList) {
              pickRandomPeer()
            }
          }
        }, () => findGoodPeer(peers, index + 1, isStaticPeerList))
    }

    function getPeer() {
      return peer
    }

    function getConnection() {
      return connection.promise
    }

    function getLatestClientVersion() {
      const deferred = $q.defer()
      const url = 'https://api.github.com/repos/qredit/desktop-wallet/releases/latest'
      $http.get(url, { timeout: 5000 })
        .then((res) => {
          deferred.resolve(res.data.tag_name)
        }, (e) => {
          // deferred.reject(gettextCatalog.getString("Cannot get latest version"))
        })
      return deferred.promise
    }

    listenNetworkHeight()
    pickRandomPeer()

    return {
      switchNetwork,
      setNetwork,
      createNetwork,
      removeNetwork,
      getNetwork,
      getNetworkName,
      getNetworks,
      getPeer,
      getConnection,
      getFromPeer,
      postTransaction,
      broadcastTransaction,
      pickRandomPeer,
      getLatestClientVersion
    }
  }
})()
