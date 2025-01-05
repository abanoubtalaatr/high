
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Select from 'react-select'
import { Link, useNavigate } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import axios from 'axios'
import { createHelpCenter, getHelpCenter } from '../_requests'
const API_URL = process.env.REACT_APP_API_URL

function CreateHelpCenter() {
  const navigate = useNavigate()

  // form validation
  const numberRegExp = /^[0-9]+$/
  const formSchema = Yup.object().shape({
    title: Yup.string()
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(200, 'Maximum 50 symbols'),
    slug: Yup.string()
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(200, 'Maximum 50 symbols'),
    order: Yup.string()
      .required('this field is required')
      .min(1, 'Minimum 3 symbols')
      .max(10, 'Maximum 50 symbols')
      .matches(numberRegExp, 'number is not valid'),
    content: Yup.string().required('this field is required').min(3, 'Minimum 3 symbols'),
    status: Yup.string().required('this field is required'),
    parent_id: Yup.string().required('this field is required'),
  })

  const statusOptions = [
    {
      value: '1',
      label: 'publish',
    },
    {
      value: '0',
      label: 'unpublish',
    },
  ]
  const parentDefualtOptions = [{ value: '0', label: 'parent' }]
  const [isParentsLoading, setIsParentsLoading] = useState(false)
  const [isParentsDisabled, setIsParentsDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [statusChoice, setStatusChoice] = useState(statusOptions[0])
  const [parentsOptions, setParentsOptions] = useState([])
  const [parentChoice, setParentChoice] = useState(parentDefualtOptions[0])

  const initialValues = {
    title: '',
    slug: '',
    status: statusChoice.value,
    order: '1',
    content: '',
    parent_id: parentDefualtOptions.value,
  }
  const onChangeStatus = (choice) => {
    setStatusChoice(choice)
    formik.setFieldValue('status', choice.value)
  }
  const onChangeParentId = (choice) => {
    setParentChoice(choice)
    formik.setFieldValue('parent_id', choice.value)
  }
  const HOST = `${API_URL}/help-centers/image/upload`

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
  const parentsOptionsHandler = () => {
    const newParentsOptions = [...parentDefualtOptions, ...parentsOptions]
    setParentsOptions(newParentsOptions)
  }
  useEffect(() => {
    setIsParentsLoading(true)
    setIsParentsDisabled(true)
    getHelpCenter()
      .then((res) => {
        const parents = res.data.data
        setParentsOptions(
          parents.map((el) => ({
            value: el.id,
            label: el.title,
          }))
        )
        setIsParentsLoading(false)
        setIsParentsDisabled(false)
      })
      .catch((err) => {
        setIsParentsLoading(false)
        setIsParentsDisabled(false)
      })
  }, [])
  useEffect(() => {
    parentsOptionsHandler()
  }, [isParentsLoading]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus, resetForm, setFieldValue }) => {
      setLoading(true)
      try {
        await createHelpCenter(values).then((res) => {
          resetForm()
          setAlertType('success')
          setAlertMessage(res.data.message)
          setLoading(false)
          navigate('/pages-content/help-center')
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
          {/* parent */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>parent:</label>
            <div className='col-sm-9'>
              <Select
                isLoading={isParentsLoading}
                isDisabled={isParentsDisabled}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select parent'
                name='parent_id'
                defaultValue={parentChoice}
                value={parentChoice}
                options={parentsOptions}
                onChange={onChangeParentId}
              />
              {formik.touched.parent_id && formik.errors.parent_id && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.parent_id}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* order */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>order:</label>
            <div className='col-sm-9'>
              <input
                type='number'
                min='1'
                autoComplete='off'
                {...formik.getFieldProps('order')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.order && formik.errors.order,
                })}
                placeholder='enter type order'
              />
              {formik.touched.order && formik.errors.order && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.order}</span>
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
              <Link to='/pages-content/help-center' className='btn btn-light'>
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

export default CreateHelpCenter
