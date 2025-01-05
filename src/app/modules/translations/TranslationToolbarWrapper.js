import { useEffect, useState } from 'react'
import { KTIcon } from '../../../_metronic/helpers'
import { PageTitleWrapper } from '../../../_metronic/layout/components/toolbar/page-title'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function TranslationToolbarWrapper(props) {
  const { model } = props
  const navigate = useNavigate();

  const { itemId } = useParams()
  const [backUrl, setBackUrl] = useState(model)
  const backUrlHandler = () => {
      model === 'partners' ? setBackUrl(`../${itemId}/owner`) : model === 'units' ? setBackUrl(`../${itemId}/details`) : setBackUrl(`../${model}`)
  }
  const handleBack = () => {
    navigate(-1); // Go back one step
  };

  useEffect(() => {
    backUrlHandler()
  }, [model])
  return (  
    <div id='kt_app_toolbar' className='app-toolbar py-3 py-lg-6'>
      <div id='kt_app_toolbar_container' className='p-0 d-flex flex-stack container-fluid'>
        <PageTitleWrapper />
        <button onClick={handleBack} className='btn btn-light btn-sm btn-flex fw-bold'>
          <KTIcon iconName='double-left' className='fs-6 me-1' />
          back
        </button>
      </div>
    </div>
  )
}

export default TranslationToolbarWrapper
