import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import Images from './Images'
import Spinner from '../../../../components/spinner/Spinner'
import { getPagesGallery } from '../../_requests'

function GalleryPage() {
  const intl = useIntl()
  const { unitId } = useParams()
  const [refresh, setRefresh] = useState(false)
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [gallery, setGallery] = useState([])
  const [parms, setParms] = useState({
    limit: 100,
  })
  // get items
  const getItemsHandler = () => {
    getPagesGallery(parms)
      .then((res) => {
        setItems(res.data.data)
        setIsLoaded(false)
        setRefresh(false)
        setErrorMessage('')
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
        setRefresh(false)
      })
  }
  useEffect(() => {
    setIsLoaded(true)
    getItemsHandler()
  }, [refresh])
  return (
    <div className='card'>
      {/* begin::Body */}
      <div className='card-body py-3'>
        {isLoaded ? (
          <div className='mb-3'>
            <Spinner contentText={'loading ...'} />
          </div>
        ) : items.length === 0 ? (
          'no photo have been added'
        ) : (
          <>
            {errorMessage && (
              <div className={`alert alert-danger d-flex align-items-center p-5 mb-0 mb-5`}>
                <div className='d-flex flex-column'>{errorMessage}</div>
              </div>
            )}
            <Images items={items} refresh={setRefresh} />
          </>
        )}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export default GalleryPage
