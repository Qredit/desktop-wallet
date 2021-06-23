; (function () {
  'use strict'

  /**
   * NOTE This component uses the entire AccountController yet: it's the first
   * step to refactor the `index.html`
   */

  angular
    .module('arkclient.components')
    .component('tokensbrowsertab', {
      templateUrl: 'src/components/account/templates/tokensbrowser-tab.html',
      bindings: {
        accountCtrl: '='
      },
      controller: TokensBrowserTabController
    })

  function TokensBrowserTabController($scope) {
    this.$onInit = () => {
      this.ul = this.accountCtrl
    }
  }
})()
