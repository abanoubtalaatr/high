
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { getPage, updatePage } from '../_requests'
import clsx from 'clsx'
import Select from 'react-select'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { decode } from 'html-entities'
import axios from 'axios'
import { useIntl } from 'react-intl'
import { PageTitle } from '../../../../_metronic/layout/core'
const API_URL = process.env.REACT_APP_API_URL

function EditPage() {
  const intl = useIntl()
  const navigate = useNavigate()
  const { itemId } = useParams()
  const breadCrumbs = [
    {
      title: intl.formatMessage({ id: 'MENU.DASHBOARD' }),
      path: '/dashboard',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: intl.formatMessage({ id: 'PAGES' }),
      path: '/pages-content/pages',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
  // form validation
  const formSchema = Yup.object().shape({
    title: Yup.string()
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(200, 'Maximum 50 symbols'),
    slug: Yup.string()
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(200, 'Maximum 50 symbols'),
    content: Yup.string().required('this field is required').min(3, 'Minimum 3 symbols'),
    status: Yup.string().required('this field is required'),
    target: Yup.string().required('this field is required'),
  })
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [statusChoice, setStatusChoice] = useState()
  const [targetChoice, setTargetChoice] = useState()
  const [image, setImage] = useState('')
  const [imageBg, setImageBg] = useState(toAbsoluteUrl('/media/avatars/blank.png'))
  const [updateImageStatus, setUpdateImageStatus] = useState(false)
  const statusOptions = [
    {
      value: 'publish',
      label: 'publish',
    },
    {
      value: 'unpublish',
      label: 'unpublish',
    },
  ]
  const targetOptions = [
    {
      value: 'player',
      label: 'player',
    },
    {
      value: 'partner',
      label: 'partner',
    },
  ]
  const [initialValues, setInitialValues] = useState({
    title: '',
    image: '',
    slug: '',
    target: '',
    status: '',
    content: '',
  })

  const onChangeImage = (event) => {
    const file = event.target.files[0]
    setImage(file)
    setImageBg(URL.createObjectURL(file))
    setUpdateImageStatus(true)
  }
  const imageHandler = () => {
    if (imageBg) {
      setImageBg(imageBg)
    } else {
      setImageBg(toAbsoluteUrl('/media/avatars/blank.png'))
    }
  }
  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  const removePhotoHandler = () => {
    setImage('')
    setImageBg(toAbsoluteUrl('/media/avatars/blank.png'))
    setUpdateImageStatus(true)
  }
  const onChangeStatus = (choice) => {
    setStatusChoice(choice)
    formik.setFieldValue('status', choice.value)
  }
  const onChangeTarget = (choice) => {
    setTargetChoice(choice)
    formik.setFieldValue('target', choice.value)
  }
  const statusDefaultValue = () => {
    const value = statusOptions.filter((option) => option.value == initialValues.status)
    const defaultValue = value.length === 0 ? statusOptions[0] : value
    setStatusChoice(defaultValue)
  }
  const targetDefaultValue = () => {
    const value = targetOptions.filter((option) => option.value == initialValues.target)
    const defaultValue = value.length === 0 ? targetOptions[0] : value
    setTargetChoice(defaultValue)
  }
  useEffect(() => {
    try {
      getPage(itemId).then((res) => {
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
        setImageBg(newData.image)
      })
    } catch (err) {
      navigate('/pages-content/pages')
    }

    imageHandler()
  }, [])
  useEffect(() => {
    statusDefaultValue()
    targetDefaultValue()
  }, [initialValues])
  const HOST = `${API_URL}/pages/image/upload`
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise(async (resolve, reject) => {
          try {
            const file = await loader.file
            const response = await axios.request({
              method: 'POST',
              url: `${HOST}`,
              data: {
                image: file,
              },
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            resolve({
              default: `${response.data.data.url}`,
            })
          } catch (error) {
            reject(error)
          }
        })
      },
      abort: () => { },
    }
  }
  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return uploadAdapter(loader)
    }
  }
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus, resetForm }) => {
      setLoading(true)
      const formData = new FormData()
      formData.append('_method', 'put')
      formData.append('title', values.title)
      updateImageStatus && formData.append('image', image)
      formData.append('slug', values.slug)
      formData.append('target', values.target)
      formData.append('status', values.status)
      formData.append('content', decode(values.content))
      try {
        await updatePage(formData, itemId).then((res) => {
          setAlertType('success')
          setLoading(false)
          resetForm()
          removePhotoHandler()
          setAlertMessage(res.data.message)
          navigate('/pages-content/pages')
        })
      } catch (error) {
        setAlertType('danger')
        setAlertMessage(error.response.data.message)
        setLoading(false)
      }
    },
  })
  return (
    <>
      <PageTitle breadcrumbs={breadCrumbs}>{initialValues.title}</PageTitle>
      <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        <div className='card'>
          <div className='card-body py-3 pt-5'>
            {alertMessage && (
              <div className={`mb-lg-15 alert alert-${alertType}`}>
                <div className='alert-text font-weight-bold'>{alertMessage}</div>
              </div>
            )}
            {/* image */}
            {/* <div dangerouslySetInnerHTML={{__html: decode(initialValues.content)}} /> */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>image:</label>
              <div className='col-sm-9'>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <img
                    className='image-input-wrapper w-125px h-125px'
                    src={imageBg}
                    onError={imageErrorHandler}
                  />
                  {image && (
                    <span
                      className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='remove'
                      data-bs-toggle='tooltip'
                      data-bs-dismiss='click'
                      title='Remove photo'
                      onClick={removePhotoHandler}
                    >
                      <KTIcon iconName='trash' className='fs-6' />
                    </span>
                  )}
                  <div className='image-input-tools'>
                    <label
                      className='btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow'
                      data-kt-image-input-action='change'
                      data-bs-toggle='tooltip'
                      data-bs-dismiss='click'
                      title='Change photo'
                    >
                      <KTIcon iconName='pencil' className='fs-6' />
                      <input
                        type='file'
                        name='image'
                        accept='.png, .jpg, .jpeg'
                        onChange={onChangeImage}
                      />
                      <input type='hidden' />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* title */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>title:</label>
              <div className='col-sm-9'>
                <input
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('title')}
                  className={clsx('form-control form-control-solid', {
                    'is-invalid': formik.touched.title && formik.errors.title,
                  })}
                  placeholder='enter title'
                />
                {formik.touched.title && formik.errors.title && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.title}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* slug */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>slug:</label>
              <div className='col-sm-9'>
                <input
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('slug')}
                  className={clsx('form-control form-control-solid', {
                    'is-invalid': formik.touched.slug && formik.errors.slug,
                  })}
                  placeholder='enter slug'
                />
                {formik.touched.slug && formik.errors.slug && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.slug}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* status */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>status:</label>
              <div className='col-sm-9'>
                <Select
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder='select status'
                  name='status'
                  defaultValue={statusChoice}
                  value={statusChoice}
                  options={statusOptions}
                  onChange={onChangeStatus}
                />
                {formik.touched.status && formik.errors.status && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.status}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* target */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>target:</label>
              <div className='col-sm-9'>
                <Select
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder='select target'
                  name='target'
                  defaultValue={targetChoice}
                  value={targetChoice}
                  options={targetOptions}
                  onChange={onChangeTarget}
                />
                {formik.touched.target && formik.errors.target && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.target}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* content */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>content:</label>
              <div className='col-sm-9'>
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    extraPlugins: [uploadPlugin],
                    placeholder: 'enter content here ...',
                    mediaEmbed: {
                      previewsInData: true,
                    },
                  }}
                  data={decode(initialValues.content)}
                  onBlur={(event, editor) => {
                    const data = editor.getData()
                    formik.setFieldValue('content', data)
                  }}
                />
                {formik.touched.content && formik.errors.content && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.content}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* card-footer */}
            <div className='card-footer ps-0 pe-0'>
              <div className='d-flex justify-content-between'>
                <Link to='/pages-content/pages' className='btn btn-light'>
                  <KTIcon iconName='arrow-left' className='fs-6 text-muted me-1' />
                  cancel
                </Link>
                <button type='submit' className='btn btn-primary' data-kt-indicator={loading && 'on'}>
                  <span className='indicator-label'>update</span>
                  <span className='indicator-progress'>
                    update ...
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                </button>
              </div>
            </div>
            {/* end card-footer */}
          </div>
        </div>
      </form>
    </>
  )
}

export default EditPage
