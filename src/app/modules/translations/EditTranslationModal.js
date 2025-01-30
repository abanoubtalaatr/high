import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { updateTranslation } from './_requests';

function EditTranslationModal(props) {
  const location = useLocation();
  const itemDetails = location.state;
  const { show, onHide, onComplete, translateItemDetails, modelName } = props;
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  // Initialize form values
  const [initialValues, setInitialValues] = useState({
    lang: translateItemDetails.lang || 'ar',
    translations: translateItemDetails.translations.reduce((acc, translation) => {
      acc[translation.column_name] = translation.translation || '';
      return acc;
    }, {}),
  });

  const onHideHandler = () => {
    formik.resetForm();
    onHide(false);
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        // Convert translations object to a flat structure
        const payload = {
          lang: values.lang,
          ...Object.entries(values.translations).reduce((acc, [column_name, translation]) => {
            acc[`column_name`] = column_name;
            acc[`translation`] = translation;
            return acc;
          }, {}),
        };

        await updateTranslation(payload, modelName, itemDetails.id).then((res) => {
          resetForm();
          setAlertType('success');
          setAlertMessage(res.data.message);
          setLoading(false);
          onComplete(true);
        });
      } catch (error) {
        setAlertType('danger');
        setAlertMessage(error.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    },
  });

  return (
    <Modal show={show} onHide={onHideHandler} backdrop='static' keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          Edit Translation for {itemDetails.name} ({translateItemDetails.name})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
          {alertMessage && (
            <div className={`mb-lg-15 alert alert-${alertType}`}>
              <div className='alert-text font-weight-bold'>{alertMessage}</div>
            </div>
          )}

          {/* Dynamically render input fields for each translation column */}
          {translateItemDetails.translations.map((translation, index) => (
            <div key={index} className='row mb-5'>
              <label className='col-sm-3 form-label fw-bold'>{translation.column_name}:</label>
              <div className='col-sm-9'>
                <input
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps(`translations.${translation.column_name}`)}
                  className={clsx('form-control form-control-solid', {
                    'is-invalid':
                      formik.touched.translations?.[translation.column_name] &&
                      formik.errors.translations?.[translation.column_name],
                  })}
                  placeholder={`Enter ${translation.column_name} translation`}
                />
                {formik.touched.translations?.[translation.column_name] &&
                  formik.errors.translations?.[translation.column_name] && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.translations[translation.column_name]}</span>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ))}

          {/* Form buttons */}
          <div className='d-flex justify-content-between'>
            <button type='button' className='btn btn-light mt-5 mb-5' onClick={onHideHandler}>
              Cancel
            </button>
            <button
              type='submit'
              className='btn btn-primary mt-5 mb-5'
              data-kt-indicator={loading && 'on'}
            >
              <span className='indicator-label'>Update</span>
              <span className='indicator-progress'>
                Updating...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default EditTranslationModal;
