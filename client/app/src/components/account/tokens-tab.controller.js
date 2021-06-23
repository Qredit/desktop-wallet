; (function () {
  'use strict'

  /**
   * NOTE This component uses the entire AccountController yet: it's the first
   * step to refactor the `index.html`
   */

  angular
    .module('arkclient.components')
    .component('tokensTab', {
      templateUrl: 'src/components/account/templates/tokens-tab.html',
      bindings: {
        accountCtrl: '='
      },
      controller: TokensTabController
    })

  function TokensTabController($scope) {
    this.$onInit = () => {
      this.ul = this.accountCtrl
    }
  }
})()
