import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { getTransaction } from '../../_requests';
import { useParams } from 'react-router-dom';

function CashOutModal(props) {
  const { userId } = useParams()
  const { show, onHide, itemDetails } = props
  const [transactionDetails, setTransactionDetails] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    setIsLoaded(true)
    getTransaction(itemDetails, userId)
      .then((res) => {
        setTransactionDetails(res.data.data)
        setErrorMessage('')
        setIsLoaded(false)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
        setIsLoaded(false)
      })
  }, [])
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{`cash out id: ${transactionDetails.id || ''}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoaded ? (
          'loading ...'
        ) : errorMessage ? (
          <div className={`alert alert-danger d-flex align-items-center p-5 mb-0`}>
            <div className='d-flex flex-column'>{errorMessage}</div>
          </div>
        ) : transactionDetails.length === 0 ? (
          'no data'
        ) : (
          <table className='table table-row-dashed gs-0 gy-3 fs-6'>
            {/* begin::Table body */}
            <tbody>
              <tr>
                <td>id :</td>
                <td className='text-gray-700'>{transactionDetails.id || '---'}</td>
              </tr>
              <tr>
                <td>status :</td>
                <td className='text-gray-700'>
                  {transactionDetails.status || '---'}
                </td>
              </tr>
              <tr>
                <td>date & time :</td>
                <td className='text-gray-700'>{transactionDetails.initiated_at || '---'}</td>
              </tr>
              <tr>
                <td>country :</td>
                <td className='text-gray-700'>{transactionDetails.country || '---'}</td>
              </tr>
              <tr>
                <td>bank name:</td>
                <td className='text-gray-700'>{transactionDetails.bank_name || '---'}</td>
              </tr>
              <tr>
                <td>IBAN:</td>
                <td className='text-gray-700'>{transactionDetails.iban || '---'}</td>
              </tr>
              <tr>
                <td>account holder name:</td>
                <td className='text-gray-700'>{transactionDetails.account_name || '---'}</td>
              </tr>
              <tr>
                <td>amount:</td>
                <td className='text-gray-700'>{transactionDetails.amount || '---'}</td>
              </tr>
              <tr>
                <td>reason:</td>
                <td className='text-gray-700'>{transactionDetails.action_reason || '---'}</td>
              </tr>
              <tr>
                <td>action by:</td>
                <td className='text-gray-700'>{transactionDetails.action_by ? transactionDetails.action_by.name : '---'}</td>
              </tr>
              <tr>
                <td>action date:</td>
                <td className='text-gray-700'>{transactionDetails.action_at || '---'}</td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default CashOutModal
