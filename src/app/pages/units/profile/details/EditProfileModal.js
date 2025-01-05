import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useParams} from 'react-router-dom'
import {useFormik} from 'formik'
import {Modal} from 'react-bootstrap'
import {
  getActivities,
  getActivityCategories,
  getCapacities,
  getServices,
  getTypes,
  updateUnitInfo,
} from '../../_requests'
import clsx from 'clsx'
import Select from 'react-select'

function EditProfileModal(props) {
  const {unitId} = useParams()
  const {show, onHide, onComplete, unitDetails} = props
  
  // form validation
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('this field is required')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols'),
  })
  const loadOptions = [{value: '', label: 'loading ...'}]
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false)
  const [isCategoriesDisabled, setIsCategoriesDisabled] = useState(false)
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false)
  const [isActivitiesDisabled, setIsActivitiesDisabled] = useState(false)
  const [isTypesLoading, setIsTypesLoading] = useState(false)
  const [isTypesDisabled, setIsTypesDisabled] = useState(false)
  const [isCapacitiesLoading, setIsCapacitiesLoading] = useState(false)
  const [isCapacitiesDisabled, setIsCapacitiesDisabled] = useState(false)
  const [isServicesLoading, setIsServicesLoading] = useState(false)
  const [isServicesDisabled, setIsServicesDisabled] = useState(false)
  const [categoriesOptions, setCategoriesOptions] = useState([])
  const [categoryChoice, setCategoryChoice] = useState([])
  const [activitiesOptions, setActivitiesOptions] = useState([])
  const [activityChoice, setActivityChoice] = useState([])
  const [typesOptions, setTypesOptions] = useState([])
  const [typeChoice, setTypeChoice] = useState([])
  const [capacitiesOptions, setCapacitiesOptions] = useState([])
  const [capacityChoice, setCapacityChoice] = useState([])
  const [servicesOptions, setServicesOptions] = useState([])
  const [serviceChoice, setServiceChoice] = useState([])
  const [genderOptions, setGenderOptions] = useState([
    {
      value: 'male',
      label: 'male',
    },
    {
      value: 'female',
      label: 'female',
    },
    {
      value: 'both',
      label: 'both',
    },
  ])
  const [genderChoice, setGenderChoice] = useState([])
  const [loading, setLoading] = useState(false)
  const [alertType, setAlertType] = useState('success')
  
  const [initialValues, setinitialValues] = useState({
    name: unitDetails.name,
    category_id: unitDetails.activity_category ? unitDetails.activity_category.id : 0,
    activity_id: unitDetails.activity ? unitDetails.activity.id : 0,
    type_id: unitDetails.type ? unitDetails.type.id : 0,
    length: unitDetails.length,
    width: unitDetails.width,
    capacity_id: unitDetails.capacity_id,
    services: [],
    gender: unitDetails.gender,
    starting_from: unitDetails.starting_from,
    description: unitDetails.description,
    branch_id: unitDetails.branch ? unitDetails.branch.id : 0,
  })
  const categoriesDefaultValue = () => {
    const value = categoriesOptions.filter((option) => option.value == initialValues.category_id)
    const defaultValue = value.length === 0 ? categoriesOptions[0] : value
    setCategoryChoice(defaultValue)
  }
  const activitiesDefaultValue = () => {
    const value = activitiesOptions.filter((option) => option.value == initialValues.activity_id)
    const defaultValue = value.length === 0 ? activitiesOptions[0] : value
    setActivityChoice(defaultValue)
  }
  const typesDefaultValue = () => {
    const value = typesOptions.filter((option) => option.value == initialValues.type_id)
    const defaultValue = value.length === 0 ? typesOptions[0] : value
    setTypeChoice(defaultValue)
  }
  const capacitiesDefaultValue = () => {
    const value = capacitiesOptions.filter((option) => option.value == initialValues.capacity_id)
    const defaultValue = value.length === 0 ? capacitiesOptions[0] : value
    setCapacityChoice(defaultValue)
  }
  const genderDefaultValue = () => {
    const value = genderOptions.filter((option) => option.value == initialValues.gender)
    const defaultValue = value.length === 0 ? genderOptions[0] : value
    setGenderChoice(defaultValue)
  }
  const servicesDefaultValue = () => {
    const values = []
    if (unitDetails.services.length > 0) {
      for (let i = 0; i < unitDetails.services.length; i++) {
        const v = servicesOptions.filter((option) => option.value == unitDetails.services[i].id)
        for (let i = 0; i < v.length; i++) {
          values.push(v[i])
        }
      }
    }
    setinitialValues({...initialValues, services: values})
    setServiceChoice(values)
  }

  const onChangeActivity = (choice) => {
    setActivityChoice(choice)
    formik.setFieldValue('activity_id', choice.value)
  }
  const onChangeType = (choice) => {
    setTypeChoice(choice)
    formik.setFieldValue('type_id', choice.value)
  }
  const onChangeCapacity = (choice) => {
    setCapacityChoice(choice)
    formik.setFieldValue('capacity_id', choice.value)
  }
  const onChangeService = (choice) => {
    setServiceChoice(choice)
    formik.setFieldValue('services', choice)
  }
  const onChangeGender = (choice) => {
    setGenderChoice(choice)
    formik.setFieldValue('gender', choice.value)
  }
  useEffect(() => {
    genderDefaultValue()
    // categories
    getActivityCategories()
      .then((res) => {
        setCategoriesOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
      })
      .catch((err) => {
        setCategoriesOptions([])
      })
    // activities
    getActivities(unitDetails.activity_category.id)
      .then((res) => {
        setActivitiesOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
        // types
        const activityArr = res.data.data.filter((a) => a.id === unitDetails.activity.id)
        if (activityArr.length > 0) {
          setTypesOptions(
            activityArr[0].types.map((el) => ({
              value: el.id,
              label: el.name,
            }))
          )
        } else {
          setTypesOptions([])
        }
        // capacities
        if (activityArr.length > 0) {
          setCapacitiesOptions(
            activityArr[0].capacities.map((el) => ({
              value: el.id,
              label: el.name,
            }))
          )
        } else {
          setCapacitiesOptions([])
        }
        // services
        if (activityArr.length > 0) {
          setServicesOptions(
            activityArr[0].services.map((el) => ({
              value: el.id,
              label: el.name,
            }))
          )
        } else {
          setServicesOptions([])
        }
      })
      .catch((err) => {
        setActivitiesOptions([])
      })
    // types
    // getTypes()
    //   .then((res) => {
    //     setTypesOptions(
    //       res.data.data.map((el) => ({
    //         value: el.id,
    //         label: el.name,
    //       }))
    //     )
    //   })
    //   .catch((err) => {
    //     setTypesOptions([])
    //   })
    // capacities
    getCapacities()
      .then((res) => {
        setCapacitiesOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
      })
      .catch((err) => {
        setCapacitiesOptions([])
      })
    // services
    getServices()
      .then((res) => {
        setServicesOptions(
          res.data.data.map((el) => ({
            value: el.id,
            label: el.name,
          }))
        )
      })
      .catch((err) => {
        setServicesOptions([])
      })
  }, [])

  useEffect(() => {
    categoriesDefaultValue()
  }, [categoriesOptions])
  useEffect(() => {
    activitiesDefaultValue()
  }, [activitiesOptions])
  useEffect(() => {
    typesDefaultValue()
  }, [typesOptions])
  useEffect(() => {
    capacitiesDefaultValue()
  }, [capacitiesOptions])
  useEffect(() => {
    servicesDefaultValue()
  }, [servicesOptions])

  const onChangeCategory = (choice) => {
    setIsActivitiesLoading(true)
    setIsActivitiesDisabled(true)
    setCategoryChoice(choice)
    setActivityChoice(loadOptions[0])
    formik.setFieldValue('category_id', choice.value)
    if (choice.value) {
      getActivities(choice.value)
        .then((res) => {
          if (res.data.data.length > 0) {
            setActivitiesOptions(
              res.data.data.map((el) => ({
                value: el.id,
                label: el.name,
              }))
            )
          }
          setIsActivitiesLoading(false)
          setIsActivitiesDisabled(false)
        })
        .catch((err) => {
          setIsActivitiesLoading(false)
          setIsActivitiesDisabled(false)
        })
    } else {
      setIsActivitiesLoading(false)
      setIsActivitiesDisabled(false)
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, {setStatus, setFieldValue}) => {
      setLoading(true)
      console.log('you are here now mr');
      try {
        
        await updateUnitInfo(values, unitId).then((res) => {
          setAlertType('success')
          setLoading(false)
          onComplete()
        })
      } catch (error) {
        setAlertType('danger')
        setStatus(error.response.data.message)
        setLoading(false)
      }
    },
  })
  return (
    <Modal show={show} onHide={onHide} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>update unit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          {formik.status && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
            </div>
          )}
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
          {/* activity category */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>category:</label>
            <div className='col-sm-9'>
              <Select
                isLoading={isCategoriesLoading}
                isDisabled={isCategoriesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select category'
                name='category_id'
                defaultValue={!isCategoriesDisabled ? categoryChoice : loadOptions[0]}
                value={!isCategoriesDisabled ? categoryChoice : loadOptions[0]}
                options={categoriesOptions}
                onChange={onChangeCategory}
              />
            </div>
            {formik.touched.category_id && formik.errors.category_id && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.category_id}</span>
                </div>
              </div>
            )}
          </div>
          {/* activity */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>activity:</label>
            <div className='col-sm-9'>
              <Select
                isLoading={isActivitiesLoading}
                isDisabled={isActivitiesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select activity'
                name='activity_id'
                defaultValue={activityChoice}
                value={activityChoice}
                options={activitiesOptions}
                onChange={onChangeActivity}
              />
            </div>
            {formik.touched.activity_id && formik.errors.activity_id && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.activity_id}</span>
                </div>
              </div>
            )}
          </div>
          {/* type */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>type:</label>
            <div className='col-sm-9'>
              <Select
                isLoading={isTypesLoading}
                isDisabled={isTypesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select type'
                name='type_id'
                defaultValue={!isTypesDisabled ? typeChoice : loadOptions[0]}
                value={!isTypesDisabled ? typeChoice : loadOptions[0]}
                options={typesOptions}
                onChange={onChangeType}
              />
            </div>
            {formik.touched.type_id && formik.errors.type_id && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.type_id}</span>
                </div>
              </div>
            )}
          </div>
          {/* capacity */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>capacity:</label>
            <div className='col-sm-9'>
              <Select
                isLoading={isCapacitiesLoading}
                isDisabled={isCapacitiesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select capacity'
                name='capacity_id'
                defaultValue={!isCapacitiesDisabled ? capacityChoice : loadOptions[0]}
                value={!isCapacitiesDisabled ? capacityChoice : loadOptions[0]}
                options={capacitiesOptions}
                onChange={onChangeCapacity}
              />
            </div>
            {formik.touched.capacity_id && formik.errors.capacity_id && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.capacity_id}</span>
                </div>
              </div>
            )}
          </div>
          {/* service */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>service:</label>
            <div className='col-sm-9'>
              <Select
                isMulti
                closeMenuOnSelect={false}
                isLoading={isServicesLoading}
                isDisabled={isServicesDisabled}
                isSearchable={true}
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select services'
                name='services'
                defaultValue={!isServicesDisabled ? serviceChoice : loadOptions[0]}
                value={!isServicesDisabled ? serviceChoice : loadOptions[0]}
                options={servicesOptions}
                onChange={onChangeService}
              />
            </div>
            {formik.touched.services && formik.errors.services && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.services}</span>
                </div>
              </div>
            )}
          </div>
          {/* gender */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>gender:</label>
            <div className='col-sm-9'>
              <Select
                className='react-select-container'
                classNamePrefix='react-select'
                placeholder='select gender'
                name='gender'
                defaultValue={genderChoice}
                value={genderChoice}
                options={genderOptions}
                onChange={onChangeGender}
              />
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.gender}</span>
                </div>
              </div>
            )}
          </div>
          {/* size */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>size:</label>
            <div className='col-sm-9'>
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='input-group'>
                    <input
                      type='number'
                      min='1'
                      autoComplete='off'
                      {...formik.getFieldProps('length')}
                      className={clsx('form-control form-control-solid', {
                        'is-invalid': formik.touched.length && formik.errors.length,
                      })}
                      placeholder='length'
                    />
                    <span className='input-group-text'>M</span>
                  </div>
                  {formik.touched.length && formik.errors.length && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.length}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className='col-sm-6'>
                  <div className='input-group'>
                    <input
                      type='number'
                      min='1'
                      autoComplete='off'
                      {...formik.getFieldProps('width')}
                      className={clsx('form-control form-control-solid', {
                        'is-invalid': formik.touched.width && formik.errors.width,
                      })}
                      placeholder='width'
                    />
                    <span className='input-group-text'>M</span>
                  </div>
                  {formik.touched.width && formik.errors.width && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.width}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Starting From */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>starting from:</label>
            <div className='col-sm-9'>
              <div className='input-group'>
                <input
                  type='number'
                  min='1'
                  autoComplete='off'
                  {...formik.getFieldProps('starting_from')}
                  className={clsx('form-control form-control-solid', {
                    'is-invalid': formik.touched.starting_from && formik.errors.starting_from,
                  })}
                  placeholder='Starting From'
                />
                <span className='input-group-text'>SAR</span>
              </div>
              {formik.touched.starting_from && formik.errors.starting_from && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.starting_from}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* phone */}
          <div className='row mb-5'>
            <label className='col-sm-3 form-label fw-bold'>description:</label>
            <div className='col-sm-9'>
              <div className='input-group mb-3'>
                <textarea
                  {...formik.getFieldProps('description')}
                  className={clsx('form-control form-control-solid', {
                    'is-invalid': formik.touched.description && formik.errors.description,
                  })}
                  placeholder='enter description'
                ></textarea>
              </div>
              {formik.touched.description && formik.errors.description && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.description}</span>
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
      </Modal.Body>
    </Modal>
  )
}

export default EditProfileModal
