import { Web3Provider } from '../context/Web3Context'
import ConnectWallet from '../components/ConnectWallet'

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <ConnectWallet />
      <Component {...pageProps} />
    </Web3Provider>
  )
}

export default MyApp