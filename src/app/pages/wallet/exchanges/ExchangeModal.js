import { useState } from 'react'
import { Modal } from 'react-bootstrap'


function ExchangeModal(props) {
  const { show, onHide, itemDetails } = props
  console.log(itemDetails);
  const [isLoaded, setIsLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{`fund id: ${itemDetails.id || ''}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoaded ? (
          'loading ...'
        ) : errorMessage ? (
          <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : itemDetails.length === 0 ? (
          'no data'
        ) : (
          <table className='table table-row-dashed gs-0 gy-3 fs-6'>
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>id :</td>
                <td className='text-gray-700'>{itemDetails.id || '---'}</td>
              </tr>
              <tr>
                <td>date & time :</td>
                <td className='text-gray-700'>{itemDetails.create_at || '---'}</td>
              </tr>
              <tr>
                <td>transaction :</td>
                <td className='text-gray-700'>{itemDetails.transaction || '---'}</td>
              </tr>
              <tr>
                <td>giving amount:</td>
                <td className='text-gray-700'>{itemDetails.amount || '0'}</td>
              </tr>
              <tr>
                <td>currency:</td>
                <td className='text-gray-700'>{itemDetails.currency || '---'}</td>
              </tr>
              <tr>
                <td>exchanged amount:</td>
                <td className='text-gray-700'>{itemDetails.exchanged_amount || '0'}</td>
              </tr>
              <tr>
                <td>exchanged currency:</td>
                <td className='text-gray-700'>{itemDetails.exchanged_currency || '---'}</td>
              </tr>
              <tr>
                <td>old phone number:</td>
                <td className='text-gray-700'>{itemDetails.old_phone || '---'}</td>
              </tr>
              <tr>
                <td>new phone number:</td>
                <td className='text-gray-700'>{itemDetails.new_phone || '---'}</td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
        )}

      </Modal.Body>
    </Modal>
  )
}

export default ExchangeModal
