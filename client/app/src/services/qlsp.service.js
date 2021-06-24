import axios from 'axios'
import moment from 'moment'

class QslpService {
  async getTransaction(transactionid) {
    const response = await axios
      .get(`https://qslp.qredit.cloud/api/transaction/${transactionid}`)

    return response.data // .transform(response.data.Data, dateTimeFormat)
  }

  async getToken(tokenid) {
    const response = await axios
      .get(`https://qslp.qredit.cloud/api/token/${tokenid}`)

    return response.data; // .transform(response.data.Data, dateTimeFormat)
  }

  async getTokens() {
    const response = await axios
      .get(`https://qslp.qredit.cloud/api/tokens`)

    return response.data // .transform(response.data.Data, dateTimeFormat)
  }

  async getWalletTokens(walletid) {
    const response = await axios
      .get(`https://qslp.qredit.cloud/api/address/${walletid}`)

    return response.data // .transform(response.data.Data, dateTimeFormat)
  }

  async getTransactions(tokenid) {
    const response = await axios
      .get(`https://qslp.qredit.cloud/api/transactions/${tokenid}`)

    return response.data // .transform(response.data.Data, dateTimeFormat)
  }
}

export default new QslpService()
