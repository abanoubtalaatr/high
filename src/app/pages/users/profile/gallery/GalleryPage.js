import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {createGallery, getGallery} from '../../_requests'
import {useIntl} from 'react-intl'
import Images from './Images'

function GalleryPage() {
  const intl = useIntl()
  const {unitId} = useParams()
  const [refresh, setRefresh] = useState(false)
  const [apiRespone, setapiRespone] = useState(false)
  const [items, setItems] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [gallery, setGallery] = useState([])
  const [parms, setParms] = useState({
    limit: 100,
  })
  const completeHandler = () => {
    setRefresh(true)
  }
  // get items
  const getItemsHandler = () => {
    getGallery(parms, unitId)
      .then((res) => {
        setapiRespone(true)
        setItems(res.data.data)
        setIsLoaded(false)
        setRefresh(false)
      })
      .catch((err) => {
        setapiRespone(true)
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
        setRefresh(false)
      })
  }
  const onUploadHandler = (event) => {
    const files = event.target.files
    setGallery(files)
  }

  useEffect(() => {
    setIsLoaded(true)
    getItemsHandler()
  }, [])
  useEffect(() => {
    if (refresh) {
      setIsLoaded(true)
      getItemsHandler()
    }
  }, [refresh])

  useEffect(() => {
    if (gallery.length > 0) {
      setLoading(true)
      const formData = new FormData()
      for (let i = 0; i < gallery.length; i++) {
        formData.append(`images[${i}]`, gallery[i])
      }
      createGallery(unitId, formData)
        .then((res) => {
          setLoading(false)
          setRefresh(true)
        })
        .catch((error) => {
          setLoading(false)
          setErrorMessage(error.response.data.message)
        })
    }
  }, [gallery])

  return (
    <div className='card'>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5 align-items-end'>
        <h5 className='card-title align-items-start flex-column'>
          <span className='mb-3 fw-bolder'>
            {intl.formatMessage({id: 'GALLERY'})} ({items.length})
          </span>
        </h5>
        <div className='card-toolbar gap-3 mb-5'>
          <label
            className='btn btn-primary btn-sm btn-flex fw-bold'
            data-kt-indicator={loading && 'on'}
          >
            <input
              type='file'
              name='avatar'
              accept='.png, .jpg, .jpeg'
              multiple
              style={{display: 'none'}}
              onChange={onUploadHandler}
            />
            <i className='fa-solid fa-cloud-arrow-up'></i>
            <span className='indicator-label'>upload</span>
            <span className='indicator-progress'>
              upload ...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          </label>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {!apiRespone || isLoaded ? (
          'loading ...'
        ) : items.length === 0 ? (
          'no photo have been added, you can upload photos by pressing the upload button'
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
