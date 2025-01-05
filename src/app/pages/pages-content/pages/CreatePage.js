
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { createPage } from '../_requests'
import clsx from 'clsx'
import Select from 'react-select'
import { Link, useNavigate } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
const API_URL = process.env.REACT_APP_API_URL


function CreatePage() {
  const navigate = useNavigate()

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
  const initialValues = {
    title: '',
    image: '',
    slug: '',
    target: '',
    status: '',
    content: '',
  }
  const onChangeImage = (event) => {
    const file = event.target.files[0]
    setImage(file)
    setImageBg(URL.createObjectURL(file))
  }
  const removePhotoHandler = () => {
    setImage('')
    setImageBg(toAbsoluteUrl('/media/avatars/blank.png'))
  }
  const onChangeStatus = (choice) => {
    setStatusChoice(choice)
    formik.setFieldValue('status', choice.value)
  }
  const onChangeTarget = (choice) => {
    setTargetChoice(choice)
    formik.setFieldValue('target', choice.value)
  }
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
    onSubmit: async (values, { setStatus, resetForm, setFieldValue }) => {
      setLoading(true)
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('image', image)
      formData.append('slug', values.slug)
      formData.append('target', values.target)
      formData.append('status', values.status)
      formData.append('content', values.content)
      try {
        await createPage(formData).then((res) => {
          resetForm()
          removePhotoHandler()
          setAlertType('success')
          setAlertMessage(res.data.message)
          setLoading(false)
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
    <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
      <div className='card'>
        <div className='card-body py-3 pt-5'>
          {alertMessage && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{alertMessage}</div>
            </div>
          )}
          {/* image */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>image:</label>
            <div className='col-sm-9'>
              <div className='image-input image-input-outline' data-kt-image-input='true'>
                <div
                  className='image-input-wrapper w-125px h-125px"'
                  style={{
                    backgroundImage: `url('${imageBg}')`,
                  }}
                ></div>
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
                data=''
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
                <span className='indicator-label'>create</span>
                <span className='indicator-progress'>
                  create ...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              </button>
            </div>
          </div>
          {/* end card-footer */}
        </div>
      </div>
    </form>
  )
}

export default CreatePage
