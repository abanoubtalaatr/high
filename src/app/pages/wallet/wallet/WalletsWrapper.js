import { useEffect, useState } from 'react'
import { KTIcon } from '../../../../_metronic/helpers'
import { getWallets } from '../_requests'
import Spinner from '../../../components/spinner/Spinner'
import CountryWallet from './CountryWallet'

function WalletsWrapper() {

  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalRecord, setTotalRecord] = useState(0)

  // get items
  const getItemsHandler = () => {
    setIsLoaded(true)
    getWallets()
      .then((res) => {
        const data = res.data.data;
        setItems(data)
        setTotalRecord(data.length)
        setIsLoaded(false)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
  }

  useEffect(() => {
    setIsLoaded(true)
    getItemsHandler()
  }, [])

  return (
      <div className='row'>
        {isLoaded ? (
          <div className='mb-3'>
            <Spinner contentText={'loading ...'} />
          </div>
        ) : errorMessage ? (
          <div className='alert alert-danger d-flex align-items-center  mb-0'>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : totalRecord === 0 ? (
          <div className='mb-3'>there is no data to display</div>
        ) : (
          items.map((e) => {
            return (
              <CountryWallet walletDetails={e} />
            )
          })
        )}
      </div>
  )
}

export default WalletsWrapper
