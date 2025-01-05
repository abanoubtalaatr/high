import { KTIcon } from '../../../../_metronic/helpers'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { decode } from 'html-entities'
import axios from 'axios'
import { useState } from 'react'
import { updateTranslation } from '../_requests'
import { PageTitleWrapper } from '../../../../_metronic/layout/components/toolbar/page-title'
import { PageTitle } from '../../../../_metronic/layout/core'
import { useIntl } from 'react-intl'
const API_URL = process.env.REACT_APP_API_URL

function EditTranslationPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const itemDetails = location.state.itemDetails
  const translateItemDetails = location.state.translateItemDetails
  const intl = useIntl()
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
  ]
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [initialValues, setInitialValues] = useState({
    title: translateItemDetails.translations[0].translation,
    body: translateItemDetails.translations[1].translation,
  })
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
    onSubmit: async (values, { setStatus, resetForm, setFieldValue }) => {
      setLoading(true)
      const vals = {
        lang: translateItemDetails.lang,
        column_name: '',
        translation: '',
      }
      translateItemDetails.translations.map((tr) => {
        if (tr.column_name === 'title') {
          vals.column_name = tr.column_name
          vals.translation = values.title
          try {
            updateTranslation(vals, 'page', itemDetails.id).then((res) => {
              resetForm()
              setAlertType('success')
              // setStatus(res.data.message)
              setAlertMessage(res.data.message)
              setLoading(false)

            })
          } catch (error) {
            setAlertType('danger')
            // setStatus(error.response.data.message)
            setAlertMessage(error.response.data.message)
            setLoading(false)
          }
        }
        if (tr.column_name === 'body') {
          vals.column_name = tr.column_name
          vals.translation = values.body
          try {
            updateTranslation(vals, 'page', itemDetails.id).then((res) => {
              resetForm()
              setAlertType('success')
              // setStatus(res.data.message)
              setAlertMessage(res.data.message)
              setLoading(false)

            })
          } catch (error) {
            setAlertType('danger')
            // setStatus(error.response.data.message)
            setAlertMessage(error.response.data.message)
            setLoading(false)
          }
        }
      })
      // navigate(`../translations/${itemDetails.id}`, { state: { ...itemDetails } })
    },
  })

  return (
    <>
      <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
        <div id='kt_app_toolbar_container' className='p-0 d-flex flex-stack container-fluid'>
          <PageTitleWrapper />
          <Link to={`../pages/translations/${itemDetails.id}`}
            state={{ ...itemDetails }}
            className='btn btn-light btn-sm btn-flex fw-bold"'>
            <KTIcon iconName='double-left' className='fs-6  me-1' />
            back
          </Link>
        </div>
      </div>
      {/* <PageTitle breadcrumbs={breadCrumbs}>{`${itemDetails.name} ${intl.formatMessage({ id: 'TRANSLATION' })}`}</PageTitle> */}
      <PageTitle breadcrumbs={breadCrumbs}>{`edit translate ${itemDetails.name} (${translateItemDetails.name})`}</PageTitle>
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
                  data={decode(initialValues.body)}
                  onBlur={(event, editor) => {
                    const data = editor.getData()
                    formik.setFieldValue('body', data)
                  }}
                />
                {formik.touched.body && formik.errors.body && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.body}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* card-footer */}
            <div className='card-footer ps-0 pe-0'>
              <div className='d-flex justify-content-between'>
                <Link to={`../pages/translations/${itemDetails.id}`} className='btn btn-light'
                  state={{ ...itemDetails }}>
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

export default EditTranslationPage
