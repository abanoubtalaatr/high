import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import {getPage} from '../_requests'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {decode} from 'html-entities'
import Spinner from '../../../components/spinner/Spinner'

function ViewPage() {
  const navigate = useNavigate()
  const {itemId} = useParams()
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [image, setImage] = useState('')

  const [initialValues, setInitialValues] = useState({
    title: '',
    image: '',
    slug: '',
    target: '',
    status: '',
    content: '',
  })

  const imageHandler = () => {
    if (image) {
      setImage(image)
    } else {
      setImage(toAbsoluteUrl('/media/avatars/blank.png'))
    }
  }
  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  useEffect(() => {
    setLoading(true)
    getPage(itemId)
      .then((res) => {
        const newData = res.data.data
        setInitialValues({
          title: newData.title,
          image: newData.image,
          slug: newData.slug,
          target: newData.target,
          status: newData.status.toLowerCase(),
          content: newData.content,
        })
        setImage(newData.image)
        setLoading(false)
      })
      .catch((err) => {
        navigate('/error/404')
      })
    imageHandler()
  }, [])
  return (
    <div className='card'>
      <div className='card-body py-5 pt-5'>
        {loading ? (
          <div className='mb-3'>
            <Spinner contentText={'loading ...'} />
          </div>
        ) : alertMessage ? (
          <div className={`mb-lg-15 alert alert-${alertType}`}>
            <div className='alert-text font-weight-bold'>{alertMessage}</div>
          </div>
        ) : (
          <>
            <div className='row justify-content-center text-align-center mb-5'>
              <div className='col-md-8'>
                <img
                  className='image-input-wrapper mw-100'
                  src={image}
                  onError={imageErrorHandler}
                />
              </div>
            </div>
            <div className='row justify-content-center text-align-center mb-5'>
              <div className='col-md-8'>
                <h3 className='mb-5'>{initialValues.title}</h3>
                <div dangerouslySetInnerHTML={{__html: decode(initialValues.content)}} />
              </div>
            </div>
          </>
        )}

        {/* card-footer */}
        <div className='card-footer ps-0 pe-0'>
          <div className='d-flex justify-content-between'>
            <Link to='/pages-content/pages' className='btn btn-light'>
              <KTIcon iconName='arrow-left' className='fs-6 text-muted me-1' />
              back
            </Link>
          </div>
        </div>
        {/* end card-footer */}
      </div>
    </div>
  )
}

export default ViewPage
