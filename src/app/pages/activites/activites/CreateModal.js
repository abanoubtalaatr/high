import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { Button, Modal } from 'react-bootstrap'
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { createactivity } from '../_requests'
import Select from 'react-select'
import { useParams } from 'react-router-dom'
import { getGeneralCapacities, getGeneralServices, getGeneralTypes } from '../../setup-files/_requests'

function CreateModal(props) {
  const { show, onHide } = props
  const { catId } = useParams()
  const statusOptions = [
    { value: '1', label: 'active' },
    { value: '0', label: 'inactive' },
  ]
  const numberRegExp = /^[0-9]+$/
  // form validation
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('this field is required')
      .min(2, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
    order: Yup.string()
      .required('this field is required')
      .min(1, 'Minimum 3 symbols')
      .max(10, 'Maximum 50 symbols')
      .matches(numberRegExp, 'number is not valid'),
    active: Yup.mixed()
      .required('this field is required')
      .oneOf(['0', '1'])
      .label('Selected Country'),
    types: Yup.array(),
  })
  const [isTypesLoading, setIsTypesLoading] = useState(false)
  const [isTypesDisabled, setIsTypesDisabled] = useState(false)
  const [isCapacitiesLoading, setIsCapacitiesLoading] = useState(false)
  const [isCapacitiesDisabled, setIsCapacitiesDisabled] = useState(false)
  const [isServicesLoading, setIsServicesLoading] = useState(false)
  const [isServicesDisabled, setIsServicesDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  const [image, setImage] = useState('')
  const [updateImageStatus, setUpdateImageStatus] = useState(false)
  const [typesOptions, setTypesOptions] = useState([])
  const [typeChoice, setTypeChoice] = useState([])
  const [capacitiesOptions, setCapacitiesOptions] = useState([])
  const [capacityChoice, setCapacityChoice] = useState([])
  const [servicesOptions, setServicesOptions] = useState([])
  const [serviceChoice, setServiceChoice] = useState([])
  const [activitesCategoriesOptions, setActivitesCategoriesOptions] = useState([])
  const [activityCategoryChoice, setActivityCategoryChoice] = useState([])
  const initialValues = {
    name: '',
    image: '',
    order: '',
    active: '',
    min_users_no: '',
    max_users_no: '',
    types: [],
    capacities: [],
    services: [],
    activity_category_id: '',
  }
  const [imageBg, setImageBg] = useState('')
  const onChangeImage = (event) => {
    const file = event.target.files[0]
    setImage(file)
    const formData = new FormData()
    const img = formData.append('image', file)
    formik.setFieldValue('image', img)
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
  const removePhotoHandler = () => {
    setImage('')
    setImageBg(toAbsoluteUrl('/media/avatars/blank.png'))
  }
  const typesOptionsHandler = (res) => {
    setTypesOptions(
      res.map((el) => ({
        value: el.id,
        label: el.name,
      }))
    )
  }
  const capacitiesOptionsHandler = (res) => {
    setCapacitiesOptions(
      res.map((el) => ({
        value: el.id,
        label: el.name,
      }))
    )
  }
  const servicesOptionsHandler = (res) => {
    setServicesOptions(
      res.map((el) => ({
        value: el.id,
        label: el.name,
      }))
    )
  }
  // handle onChange event of the dropdown
  const typesHandleChange = (e) => {
    let selected = Array.isArray(e) ? e.map((x) => x.value) : []
    formik.setFieldValue('types', selected)
    setTypeChoice(e)
  }
  const capacitiesHandleChange = (e) => {
    console.log(e);
    let selected = Array.isArray(e) ? e.map((x) => x.value) : []
    formik.setFieldValue('capacities', selected)
    setCapacityChoice(e)
  }
  const servicesHandleChange = (e) => {
    let selected = Array.isArray(e) ? e.map((x) => x.value) : []
    formik.setFieldValue('services', selected)
    setServiceChoice(e)
  }
  const ActivitiesCategoriesHandleChange = (e) => {
    // let selected = Array.isArray(e) ? e.map((x) => x.value) : []
    formik.setFieldValue('activity_category_id', e.value)
    setActivityCategoryChoice(e)
  }

  useEffect(() => {
    if (show) {
      imageHandler()
      setIsTypesLoading(true)
      setIsTypesDisabled(true)
      setIsCapacitiesLoading(true)
      setIsCapacitiesDisabled(true)
      setIsServicesLoading(true)
      setIsServicesDisabled(true)
      getGeneralTypes()
        .then((res) => {
          typesOptionsHandler(res.data.data)
          setIsTypesLoading(false)
          setIsTypesDisabled(false)
          setIsCapacitiesLoading(false)
          setIsCapacitiesDisabled(false)
          setIsServicesLoading(false)
          setIsServicesDisabled(false)
        })
        .catch((err) => {
          typesOptionsHandler([])
          setIsTypesLoading(false)
          setIsTypesDisabled(false)
          setIsCapacitiesLoading(false)
          setIsCapacitiesDisabled(false)
          setIsServicesLoading(false)
          setIsServicesDisabled(false)
        })
        getGeneralCapacities()
        .then((res) => {
          capacitiesOptionsHandler(res.data.data)
        })
        .catch((err) => {
          capacitiesOptionsHandler([])
        })
      getGeneralServices()
        .then((res) => {
          servicesOptionsHandler(res.data.data)
        })
        .catch((err) => {
          servicesOptionsHandler([])
        })
    }
  }, [show])
  // formik
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus, resetForm, setFieldValue }) => {
      setLoading(true)
      const formData = new FormData()
      formData.append('name', values.name)
      updateImageStatus && formData.append('image', image)
      formData.append('order', values.order)
      formData.append('active', values.active)
      formData.append('min_users_no', values.min_users_no)
      formData.append('max_users_no', values.max_users_no)
      values.types.forEach((type) => formData.append('types[]', type))
      values.capacities.forEach((capacities) => formData.append('capacities[]', capacities))
      values.services.forEach((services) => formData.append('services[]', services))
      try {
        await createactivity(formData, catId).then((res) => {
          setAlertType('success')
          resetForm()
          setStatus(res.data.message)
          setLoading(false)
          setUpdateImageStatus(false)
          window.location.reload()
        })
      } catch (err) {
        setAlertType('danger')
        setStatus(err.response.data.message)
        setLoading(false)
      }
    },
  })

  return (
    <Modal show={show} onHide={onHide} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>create new activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          {formik.status && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
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
          {/* name */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>name:</label>
            <div className='col-sm-9'>
              <input
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('name')}
                className={clsx('form-control form-control-solid', {
                  'is-invalid': formik.touched.name && formik.errors.name,
                })}
                placeholder='enter name'
              />
              {formik.touched.name && formik.errors.name && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.name}</span>
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
                placeholder='enter order'
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
          {/* age range */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>number of users:</label>
            <div className='col-sm-9'>
              <div className='row'>
                <div className='col-sm-6'>
                  <input
                    type='number'
                    min='1'
                    autoComplete='off'
                    {...formik.getFieldProps('min_users_no')}
                    className={clsx('form-control form-control-solid', {
                      'is-invalid': formik.touched.min_users_no && formik.errors.min_users_no,
                    })}
                    placeholder='min'
                  />
                  {formik.touched.min_users_no && formik.errors.min_users_no && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.min_users_no}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className='col-sm-6'>
                  <input
                    type='number'
                    min='1'
                    autoComplete='off'
                    {...formik.getFieldProps('max_users_no')}
                    className={clsx('form-control form-control-solid', {
                      'is-invalid': formik.touched.max_users_no && formik.errors.max_users_no,
                    })}
                    placeholder='end'
                  />
                  {formik.touched.max_users_no && formik.errors.max_users_no && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.max_users_no}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* status */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>status:</label>
            <div className='col-sm-9'>
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                options={statusOptions}
                // defaultValue={statusDefaultValue}
                onChange={(selectedOption) => {
                  formik.setFieldValue('active', selectedOption.value)
                }}
                name='active'
              />
              {formik.touched.active && formik.errors.active && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.active}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* types */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>types:</label>
            <div className='col-sm-9'>
              <Select
                isLoading={isTypesLoading}
                isDisabled={isTypesDisabled}
                isMulti
                closeMenuOnSelect={false}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder={!isTypesDisabled ? 'select types' : 'loading ...'}
                name='types'
                defaultValue={typeChoice}
                value={typeChoice}
                options={typesOptions}
                onChange={typesHandleChange}
              />
              {formik.touched.types && formik.errors.types && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.types}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* capacities */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>capacities:</label>
            <div className='col-sm-9'>
              <Select
                isLoading={isCapacitiesLoading}
                isDisabled={isCapacitiesDisabled}
                isMulti
                closeMenuOnSelect={false}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder={!isCapacitiesDisabled ? 'select capacities' : 'loading ...'}
                name='capacities'
                defaultValue={capacityChoice}
                value={capacityChoice}
                options={capacitiesOptions}
                onChange={capacitiesHandleChange}
              />
              {formik.touched.capacities && formik.errors.capacities && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.capacityChoice}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* services */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>services:</label>
            <div className='col-sm-9'>
              <Select
                isLoading={isServicesLoading}
                isDisabled={isServicesDisabled}
                isMulti
                closeMenuOnSelect={false}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                name='services'
                placeholder={!isServicesDisabled ? 'select services' : 'loading ...'}
                defaultValue={serviceChoice}
                value={serviceChoice}
                options={servicesOptions}
                onChange={servicesHandleChange}
              />
              {formik.touched.services && formik.errors.services && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.services}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* form button */}
          <div className='d-flex justify-content-between'>
            <button type='button' className='btn btn-light mt-5 mb-5' onClick={onHide}>
              cancel
            </button>
            <button
              type='submit'
              className='btn btn-primary mt-5 mb-5'
              data-kt-indicator={loading && 'on'}
            >
              <span className='indicator-label'>create</span>
              <span className='indicator-progress'>
                create ...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            </button>
          </div>
          {/* end form button */}
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateModal
