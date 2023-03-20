import { Web3Provider } from '../context/Web3Context'
import ConnectWallet from '../components/ConnectWallet'
import Request from '../components/Request'

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <ConnectWallet />
      <Request />
      <Component {...pageProps} />
    </Web3Provider>
  )
}

export default MyApp