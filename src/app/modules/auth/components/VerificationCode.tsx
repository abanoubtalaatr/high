import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {verificationCodein} from '../core/_requests'
import { KTIcon } from '../../../../_metronic/helpers'

const initialValues = {
  code: '',
}

const forgotPasswordSchema = Yup.object().shape({
  code: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('code is required'),
})
export function VerificationCode() {
// const navigate = useNavigate();
  const emailValidation: string | null = localStorage.getItem('EMAIL_VALIDATION')
  
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [error, setError] = useState('dddddd')
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setHasErrors(undefined)
      if(emailValidation != null){
        verificationCodein(emailValidation,values.code)
          .then(({data: {result}}) => { 
                      
            setHasErrors(false)
            setLoading(false)
          })
          .catch(() => {
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('The login detail is incorrect')
          })
        }else{          
          setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setError('error in your email address')
        }
    },
  })

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_password_reset_form'
      onSubmit={formik.handleSubmit}
    >
      <div className='text-center mb-10'>
        {/* begin::Title */}
        <h1 className='text-dark fw-bolder mb-3'>Forgot Password ?</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-500 fw-semibold fs-6'>
          Enter your email to reset your password.
        </div>
        {/* end::Link */}
      </div>

      {/* begin::Title */}
      {hasErrors === true && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>
           {error}
          </div>
        </div>
      )}

      {hasErrors === false && (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>Sent password reset. Please check your email</div>
        </div>
      )}
      {/* end::Title */}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        {/* <label className='form-label fw-bolder text-gray-900 fs-6'>code</label> */}
        <input
          type='text'
          placeholder='Enter Code'
          autoComplete='off'
          {...formik.getFieldProps('code')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.code && formik.errors.code},
            {
              'is-valid': formik.touched.code && !formik.errors.code,
            }
          )}
        />
        {formik.touched.code && formik.errors.code && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.code}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='d-flex flex-wrap justify-content-center pb-lg-0 mb-5'>
        <button type='submit' id='kt_password_reset_submit' className='btn btn-primary me-4'
        disabled={formik.isSubmitting || !formik.isValid} >
          {!loading && <span className='indicator-label'>Verify</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Form group */}
      <Link to='/auth/login' className='btn btn-light btn-sm btn-flex fw-bold mt-5'> 
      <KTIcon iconName='arrow-left' className='fs-3' />
        <span>Back To Login</span>
      </Link>
    </form>
    
  )
}
