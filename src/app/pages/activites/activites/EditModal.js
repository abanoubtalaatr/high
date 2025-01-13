import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { Modal } from 'react-bootstrap'
import { KTIcon, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { getActivitesCategories, getactivity, updateactivity } from '../_requests'
import { getCapacities, getServices, getTypes } from '../../setup-files/_requests'
import { useParams } from 'react-router-dom'
import Select from 'react-select'

function EditModal(props) {
  const { show, onHide, onComplete, itemId } = props
  const { catId } = useParams()
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
    active: Yup.string().required('this field is required'),
  })
  const loadOptions = [{ value: '', label: 'loading ...' }]
  const [isTypesLoading, setIsTypesLoading] = useState(false)
  const [isTypesDisabled, setIsTypesDisabled] = useState(false)
  const [isCapacitiesLoading, setIsCapacitiesLoading] = useState(false)
  const [isCapacitiesDisabled, setIsCapacitiesDisabled] = useState(false)
  const [isServicesLoading, setIsServicesLoading] = useState(false)
  const [isServicesDisabled, setIsServicesDisabled] = useState(false)
  const [isActivitesCategoriesLoading, setActivitesCategoriesLoading] = useState(false)
  const [isActivitesCategoriesDisabled, setActivitesCategoriesDisabled] = useState(false)
  const [apiRespone, setApiRespone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [getItemState, setGetItemState] = useState(true)
  const [getItemErrorMessage, setGetItemErrorMessage] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [statusOptions, setStatusOptions] = useState([
    { value: '1', label: 'active' },
    { value: '0', label: 'inactive' },
  ])
  const [typesOptions, setTypesOptions] = useState([])
  const [typeChoice, setTypeChoice] = useState([])
  const [capacitiesOptions, setCapacitiesOptions] = useState([])
  const [capacityChoice, setCapacityChoice] = useState([])
  const [servicesOptions, setServicesOptions] = useState([])
  const [activitesCategoriesOptions, setActivitesCategoriesOptions] = useState([])
  const [serviceChoice, setServiceChoice] = useState([])
  const [activityCategoryChoice, setActivityCategoryChoice] = useState([])
  const [image, setImage] = useState('')
  const [updateImageStatus, setUpdateImageStatus] = useState(false)
  const [initialValues, setInitialValues] = useState({
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
  })
  const [imageBg, setImageBg] = useState(initialValues.image)
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
  const activitesCategoriesOptionsHandler = (res) => {
    setActivitesCategoriesOptions(
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
    // let selected = Array.isArray(e) ? e.map((x) => x.value) : []
    formik.setFieldValue('capacities', e)
    setCapacityChoice(e)
  }
  const servicesHandleChange = (e) => {
    // let selected = Array.isArray(e) ? e.map((x) => x.value) : []
    formik.setFieldValue('services', e)
    setServiceChoice(e)
  }
  const ActivitiesCategoriesHandleChange = (e) => {
    // let selected = Array.isArray(e) ? e.map((x) => x.value) : []
    formik.setFieldValue('activity_category_id', e.value)
    setActivityCategoryChoice(e)
  }
  const activitesCategoriesDefaultValue = () => {
    const value = activitesCategoriesOptions.filter(
      (option) => option.value == initialValues.activity_category_id
    )
    const defaultValue = value.length === 0 ? activitesCategoriesOptions[0] : value
    setActivityCategoryChoice(defaultValue)
  }
  const typesDefaultValue = () => {
    const types_defaultValue = []
    if (initialValues.types.length > 0) {
      for (let t = 0; t < initialValues.types.length; t++) {
        const tv = typesOptions.filter((option) => option.value == initialValues.types[t].id)
        for (let ty = 0; ty < tv.length; ty++) {
          types_defaultValue.push(tv[ty])
        }
      }
    }
    if (types_defaultValue.length > 0) {
      setTypeChoice(types_defaultValue)
      let selected = Array.isArray(types_defaultValue) ? types_defaultValue.map((x) => x.value) : []
      setInitialValues({ ...initialValues, types: selected })
      formik.setFieldValue('types', selected)
      setIsTypesLoading(false)
      setIsTypesDisabled(false)
    }
  }
  const capacitiesDefaultValue = () => {
    const capacities_defaultValue = []
    if (initialValues.capacities.length > 0) {
      for (let c = 0; c < initialValues.capacities.length; c++) {
        const cv = capacitiesOptions.filter(
          (option) => option.value == initialValues.capacities[c].id
        )
        for (let ca = 0; ca < cv.length; ca++) {
          capacities_defaultValue.push(cv[ca])
        }
      }
    }
    if (capacities_defaultValue.length > 0) {
      setCapacityChoice(capacities_defaultValue)
      let selected = Array.isArray(capacities_defaultValue) ? capacities_defaultValue.map((x) => x.value) : []
      setInitialValues({ ...initialValues, capacities: selected })
      formik.setFieldValue('capacities', selected)
      setIsCapacitiesLoading(false)
      setIsCapacitiesDisabled(false)
    }

  }
  const servicesDefaultValue = () => {
    const services_defaultValue = []

    if (initialValues.services.length > 0) {
      for (let s = 0; s < initialValues.services.length; s++) {
        const sv = servicesOptions.filter((option) => option.value == initialValues.services[s].id)
        for (let se = 0; se < sv.length; se++) {
          services_defaultValue.push(sv[se])
        }
      }
    }
    console.log('here services', services_defaultValue)
    if (services_defaultValue.length > 0) {
      
      setServiceChoice(services_defaultValue)
      let selected = Array.isArray(services_defaultValue) ? services_defaultValue.map((x) => x.value) : []
      setInitialValues({ ...initialValues, services: selected })
      formik.setFieldValue('services', selected)
      setIsServicesLoading(false)
      setIsServicesDisabled(false)
    }
  }

  const statusDefaultValue = () => {
    const value = statusOptions.filter((option) => option.value == initialValues.active)
    return value
  }

  useEffect(() => {
    try {
      getactivity(catId, itemId).then((res) => {
        
        const newData = res.data.data
        setInitialValues({ ...newData })
        setAlertType('success')
        setApiRespone(true)
        setImage(newData.image)
        setImageBg(newData.image)
        // get activity categories
        getActivitesCategoriesHandler()
        // get types
        getTypesHandler()
        // get capacities
        getCapacitiesHandler()
        // get services
        getServicesHandler()
        setServiceChoice(newData.services.map((service)=>{
          return {value: service.id, label: service.name}}
        )) 
      })
    } catch (err) {
      setAlertType('danger')
      setGetItemState(true)
      setApiRespone(true)
      setGetItemErrorMessage(err.response.data.message)
    }
    imageHandler()
  }, [])
  // get types
  const getTypesHandler = () => {
    setIsTypesLoading(false)
    setIsTypesDisabled(false)
    getTypes()
      .then((res) => {
        typesOptionsHandler(res.data.data)
      })
      .catch((err) => {
        typesOptionsHandler([])
      })
  }
  // get capacities
  const getCapacitiesHandler = () => {
    
    getCapacities()
      .then((res) => {
        capacitiesOptionsHandler(res.data.data)
      })
      .catch((err) => {
        capacitiesOptionsHandler([])
      })
  }
  // get services
  const getServicesHandler = () => {
    
    getServices()
      .then((res) => {
        servicesOptionsHandler(res.data.data)
      })
      .catch((err) => {
        servicesOptionsHandler([])
      })
  }
  // get Activites Categories
  const getActivitesCategoriesHandler = () => {
    getActivitesCategories()
      .then((res) => {
        activitesCategoriesOptionsHandler(res.data.data)
        setActivitesCategoriesLoading(false)
        setActivitesCategoriesDisabled(false)
      })
      .catch((err) => {
        activitesCategoriesOptionsHandler([])
        setActivitesCategoriesLoading(false)
        setActivitesCategoriesDisabled(false)
      })
  }

  useEffect(() => {
    activitesCategoriesDefaultValue()
  }, [activitesCategoriesOptions])
  useEffect(() => {
    typesDefaultValue()
  }, [typesOptions])
  useEffect(() => {
    capacitiesDefaultValue()
  }, [capacitiesOptions])
  // useEffect(() => {
  //   servicesDefaultValue()
  // }, [servicesOptions])
  // const initialValues = initialValues
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { setStatus, resetForm, setFieldValue }) => {
      setLoading(true)
      const formData = new FormData()
      formData.append('_method', 'put')
      formData.append('name', values.name)
      updateImageStatus && formData.append('image', image)
      formData.append('order', values.order)
      formData.append('active', values.active)
      formData.append('min_users_no', values.min_users_no)
      formData.append('max_users_no', values.max_users_no)
      formData.append('activity_category_id', values.activity_category_id)
      values.types.forEach((type) => formData.append('types[]', type))

      values.capacities.forEach((capacity) => {
        formData.append('capacities[]', capacity.value ?? capacity);
      });   
      console.log(values.services, 'services our')
      values.services.forEach((service) => {
        formData.append('services[]', service.value ?? service.id);
      });
      
      try {
        await updateactivity(formData, catId, itemId).then((res) => {
          setAlertType('success')
          resetForm()
          setStatus(res.data.message)
          setLoading(false)
          onComplete()
          setUpdateImageStatus(false)
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
        <Modal.Title>edit Activity </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!apiRespone ? (
          'loading ...'
        ) : !getItemState ? (
          <div className={`mb-lg-15 alert alert-${alertType}`}>
            <div className='alert-text font-weight-bold'>{getItemErrorMessage}</div>
          </div>
        ) : initialValues.length === 0 ? (
          'no data'
        ) : (
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
                  defaultValue={statusDefaultValue}
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
            {/* Activity Categories */}
            <div className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>Categories:</label>
              <div className='col-sm-9'>
                <Select
                  isLoading={isActivitesCategoriesLoading}
                  isDisabled={isActivitesCategoriesDisabled}
                  isSearchable={true}
                  className='react-select-container'
                  classNamePrefix='react-select'
                  placeholder='select category'
                  name='activity_category_id'
                  defaultValue={activityCategoryChoice}
                  value={activityCategoryChoice}
                  options={activitesCategoriesOptions}
                  onChange={ActivitiesCategoriesHandleChange}
                />
                {formik.touched.ActivitesCategories && formik.errors.activity_category_id && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.activity_category_id}</span>
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
                <span className='indicator-label'>update</span>
                <span className='indicator-progress'>
                  update ...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              </button>
            </div>
            {/* end form button */}
          </form>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default EditModal
