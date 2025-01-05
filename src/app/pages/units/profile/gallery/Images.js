import {Link, useParams} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import {setMainPhoto, updatePhoto} from '../../_requests'
import DeleteModal from './DeleteModal'

function Images(props) {
  const {unitId} = useParams()
  const {items, refresh} = props
  const [itemID, setItemId] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [alertType, setAlertType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [newPhoto, setNewPhoto] = useState('')
  const [imageId, setImageId] = useState('')
  const [imageBg, setImageBg] = useState('')

  const changeImage = (event) => {
    const file = event.target.files[0]
    setNewPhoto(file)
    setImageId(event.target.id)
    setImageBg(URL.createObjectURL(file))
  }
  useEffect(() => {
    if (newPhoto) {
      const formData = new FormData()
      formData.append('_method', 'put')
      formData.append(`image`, newPhoto)
      updatePhoto(unitId, imageId, formData)
        .then((res) => {
          setAlertType('success')
          setAlertMessage(res.data.message)
          refresh(true)
        })
        .catch((error) => {
          setAlertType('danger')
          setAlertMessage(error.response.data.message)
        })
    }
  }, [newPhoto])

  const imageHandler = (image) => {
    if (image) {
      setImageBg(imageBg)
    } else {
      setImageBg(toAbsoluteUrl('/media/avatars/blank.png'))
    }
  }

  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  const openDeleteModal = (id) => {
    setShowDeleteModal(true)
    setItemId(id)
  }
  const closeDeleteModal = () => setShowDeleteModal(false)
  const completeHandler = () => {
    setShowDeleteModal(false)
    refresh(true)
  }
  const closAlertHandler = () => {
    setAlertMessage('')
    setAlertType('success')
  }
  // main photo change
  const mainPhotoHandler = (id) => {
    setMainPhoto(unitId, id)
      .then((res) => {
        setAlertType('success')
        setAlertMessage(res.data.message)
        refresh(true)
      })
      .catch((error) => {
        setAlertType('danger')
        setAlertMessage(error.response.data.message)
      })
  }
  return (
    <>
      {alertMessage && (
        <div className={`alert alert-${alertType} d-flex align-items-center p-5 mb-0 mb-5`}>
          <div className='d-flex flex-column'>{alertMessage}</div>
          <button
            type='button'
            className='position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto'
            // data-bs-dismiss='alert'
            onClick={closAlertHandler}
          >
            <KTIcon iconName='abstract-11' className={`fs-6 text-${alertType} fs-1`} />
          </button>
        </div>
      )}
      <div className='d-flex gap-5 flex-wrap mb-5 pb-5'>
        {items &&
          items.map((e) => (
            <div key={e.id} className='image-input image-input-outline' data-kt-image-input='true'>
              <div
                className='image-input-wrapper w-125px h-125px"'
                style={{
                  backgroundImage: `url('${e.image}')`,
                }}
              ></div>
              <span
                className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='remove'
                data-bs-toggle='tooltip'
                data-bs-dismiss='click'
                title='Remove photo'
                onClick={() => openDeleteModal(e.id)}
              >
                <KTIcon iconName='trash' className='fs-6' />
              </span>
              <div className='image-input-tools'>
                <span
                  className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                  data-bs-toggle='tooltip'
                  data-bs-dismiss='click'
                  style={{cursor: `${e.main_photo != 0 && 'initial'}`}}
                  onClick={() => mainPhotoHandler(e.id)}
                >
                  <KTIcon iconName='star' className={`${e.main_photo != 0 && 'text-warning'}`} />
                </span>
                <label
                  className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                  data-kt-image-input-action='change'
                  data-bs-toggle='tooltip'
                  data-bs-dismiss='click'
                  title='Change photo'
                >
                  <KTIcon iconName='pencil' className='fs-6' />
                  <input
                    id={e.id}
                    type='file'
                    name='photo'
                    accept='.png, .jpg, .jpeg'
                    onChange={changeImage}
                  />
                  <input type='hidden' />
                </label>
                <a
                  href={`${e.image}`}
                  target='_blank'
                  className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                >
                  <KTIcon iconName='eye' className='fs-6' />
                </a>
              </div>
            </div>
          ))}
      </div>
      {/* modal */}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onHide={closeDeleteModal}
          onComplete={completeHandler}
          itemId={itemID}
        />
      )}
    </>
  )
}

export default Images
