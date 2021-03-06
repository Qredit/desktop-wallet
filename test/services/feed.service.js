'use strict'

describe('feedService', () => {
  let feedService

  beforeEach(() => {
    module('arkclient.services')

    inject($injector => {
      feedService = $injector.get('feedService')
    })
  })

  describe('fetchBlogEntries', () => {
    it('fetches and parses the ARK.io feed URL', () => {
      const stub = sinon.stub(feedService, 'fetchAndParse').resolves('OK')
      feedService.fetchBlogEntries()
      expect(stub.firstCall.args[0]).to.eql('https://cointelegraph.com/rss')
    })
  })
})
