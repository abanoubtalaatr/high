import {KTIcon, KTSVG} from '../../../../_metronic/helpers'

function PaymentTable(props) {
  const {title, itemDetails} = props
console.log(itemDetails,'details')
  return (
    <>
      <h5 className='card-title mt-5'>
        <span className='mb-3 fw-bolder'>{title}</span>
      </h5>
      {/* begin::Table */}
      <div className='table-responsive'>
        <table className='table table-row-dashed gs-0 gy-4'>
          {/* begin::Table head */}
          <thead></thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            <tr>
              <td className='w-lg-500px'>Payment Method</td>
              <td className='text-gray-700 fw-bolder'>{itemDetails.payment_method || '---'}</td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Price Per User</td>
              <td className='text-gray-700 fw-bolder'>
                <div className='d-flex'>
                  <span className='me-3'> {itemDetails.price_per_user || '0'} SAR</span>
                  <a
                    href='#'
                    className='btn-icon'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_1'
                  >
                    <KTIcon iconName='information' className='fs-3 text-danger' />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Charge For Leave Within</td>
              <td className='text-gray-700 fw-bolder'>
                {itemDetails.charge_for_leave_within || '0'} Hours
              </td>
            </tr>
            {itemDetails.status.toLowerCase() == 'canceled' && (
              <tr>
                <td className='w-lg-500px'>Cancelation Fee Per User</td>
                <td className='text-gray-700 fw-bolder'>
                  <div className='d-flex'>
                    <span className='me-3'>
                      {itemDetails.cancellation_fees_per_user || '0'} SAR ({' '}
                      {itemDetails.cancellation_fee_percentage || '0'}% )
                    </span>
                    <a
                      href='#'
                      className='btn-icon'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_2'
                    >
                      <KTIcon iconName='information' className='fs-3 text-danger' />
                    </a>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          <h5 className='card-title mt-5'>
            <span className='mb-3 fw-bolder'>Summery </span>
          </h5>
          <tbody>
            <tr>
              <td className='w-lg-500px'>Total Payment From Joined Players</td>
              <td className='text-gray-700 fw-bolder'>
                <div className='d-flex'>
                  <span className='me-3'>
                    {' '}
                    {itemDetails.total_payment_from_joined_players || '0'} SAR
                  </span>
                  <a
                    href='#'
                    className='btn-icon'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_3'
                  >
                    <KTIcon iconName='information' className='fs-3 text-danger' />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Total Fee From Left Players</td>
              <td className='text-gray-700 fw-bolder'>
                <div className='d-flex'>
                  <span className='me-3'>
                    {' '}
                    {itemDetails.total_fee_from_left_players || '0'} SAR
                  </span>
                  <a
                    href='#'
                    className='btn-icon'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_4'
                  >
                    <KTIcon iconName='information' className='fs-3 text-danger' />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td className='w-lg-500px'>Total Income From Public Event</td>
              <td className='text-gray-700 fw-bolder'>
                <div className='d-flex'>
                  <span className='me-3'> {itemDetails.total_income_from_event || '0'} SAR</span>
                  <a
                    href='#'
                    className='btn-icon'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_5'
                  >
                    <KTIcon iconName='information' className='fs-3 text-danger' />
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
          {/* end::Table body */}
        </table>
      </div>
      {/* end::Table */}
      {/* modal 1 */}
      <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Price per user Break Down</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <KTSVG
                  path='/media/icons/duotune/arrows/arr061.svg'
                  className='svg-icon svg-icon-2x'
                />
              </div>
            </div>
            <div className='modal-body'>
              <table className='table table-row-dashed gs-0 gy-3'>
                {/* begin::Table body */}
                <tbody>
                  <tr>
                    <td>Price per player :</td>
                    <td className='text-gray-700'>{itemDetails.price_per_user} SAR</td>
                  </tr>
                  <tr>
                    <td>Base Price :</td>
                    <td className='text-gray-700'>{itemDetails?.pricing?.price_per_user?.base_price} SAR</td>
                  </tr>
                  <tr>
                    <td>Discount :</td>
                    <td className='text-gray-700'>{itemDetails?.pricing?.price_per_user?.discount} SAR</td>
                  </tr>
                  <tr>
                    <td>Public Event Price :</td>
                    <td className='text-gray-700'>{itemDetails?.total_income_from_event || '0'} SAR</td>
                  </tr>
                  <tr>
                    <td>Tax ({itemDetails?.pricing?.price_per_user?.tax_percent || '0'} %) :</td>
                    <td className='text-gray-700'>{itemDetails?.pricing?.price_per_user?.tax || '0'} SAR</td>
                  </tr>
                  <tr>
                    <td>Total:</td>
                    <td className='text-gray-700 fw-bolder'>{itemDetails?.pricing?.price_per_user?.total_price} SAR</td>
                  </tr>
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* modal 2 */}
      <div className='modal fade' tabIndex={-1} id='kt_modal_2'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Fee per user Break Down</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <KTSVG
                  path='/media/icons/duotune/arrows/arr061.svg'
                  className='svg-icon svg-icon-2x'
                />
              </div>
            </div>
            <div className='modal-body'>
              <table className='table table-row-dashed gs-0 gy-3'>
                {/* begin::Table body */}
                <tbody>
                  <tr>
                    <td>Fee Price per player :</td>
                    <td className='text-gray-700'>100.00 SAR</td>
                  </tr>
                  <tr>
                    <td>Base Price (Charge) :</td>
                    <td className='text-gray-700'>95.24 SAR</td>
                  </tr>
                  <tr>
                    <td>Discount :</td>
                    <td className='text-gray-700'>0.00 SAR</td>
                  </tr>
                  <tr>
                    <td>Public Event Price (Charge) :</td>
                    <td className='text-gray-700'>95.24 SAR</td>
                  </tr>
                  <tr>
                    <td>Tax (5%) :</td>
                    <td className='text-gray-700'>4.76 SAR</td>
                  </tr>
                  <tr>
                    <td>Total:</td>
                    <td className='text-gray-700 fw-bolder'>100.00 SAR</td>
                  </tr>
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* modal 3 */}
      <div className='modal fade' tabIndex={-1} id='kt_modal_3'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Total Payment from joined players Break Down</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <KTSVG
                  path='/media/icons/duotune/arrows/arr061.svg'
                  className='svg-icon svg-icon-2x'
                />
              </div>
            </div>
            <div className='modal-body'>
              <table className='table table-row-dashed gs-0 gy-3'>
                {/* begin::Table body */}
                <tbody>
                  <tr>
                    <td>Total Number of Players :</td>
                    <td className='text-gray-700'>{itemDetails?.pricing?.total_payment_from_joined_player?.total_joined_players}</td>
                  </tr>
                  <tr>
                    <td>Price per player :</td>
                    <td className='text-gray-700'>{itemDetails?.pricing?.total_payment_from_joined_player?.price_per_user} SAR</td>
                  </tr>
                  <tr>
                    <td>Base Price :</td>
                    <td className='text-gray-700'>{itemDetails?.pricing?.joinedPlayersPricingData?.base_price|| '0'} SAR</td>
                  </tr>
                  <tr>
                    <td>Discount :</td>
                    <td className='text-gray-700'>{itemDetails?.pricing?.joinedPlayersPricingData?.discount|| '0'} SAR</td>
                  </tr>
                  <tr>
                    <td>Public Event Price :</td>
                    <td className='text-gray-700'>{itemDetails?.pricing?.joinedPlayersPricingData?.total_income_from_event|| '0'} SAR</td>
                  </tr>
                  <tr>
                    <td>Tax ({itemDetails?.pricing?.joinedPlayersPricingData?.discount_percent|| '0'} %) :</td>
                    <td className='text-gray-700'>{itemDetails?.pricing?.joinedPlayersPricingData?.tax|| '0'} SAR</td>
                  </tr>
                  <tr>
                    <td>Total:</td>
                    <td className='text-gray-700 fw-bolder'>{itemDetails?.pricing?.joinedPlayersPricingData?.total_price|| '0'} SAR</td>
                  </tr>
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* modal 4 */}
      <div className='modal fade' tabIndex={-1} id='kt_modal_4'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Total Fee from Left players Break Down</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <KTSVG
                  path='/media/icons/duotune/arrows/arr061.svg'
                  className='svg-icon svg-icon-2x'
                />
              </div>
            </div>
            <div className='modal-body'>
              <table className='table table-row-dashed gs-0 gy-3'>
                {/* begin::Table body */}
                <tbody>
                  <tr>
                    <td>Total Number of left players with fee :</td>
                    <td className='text-gray-700'>{itemDetails?.pricing?.total_fees_from_left_player?.total_left_late_players} </td>
                  </tr>
                  <tr>
                    <td>Fee Price per player :</td>
                    <td className='text-gray-700'>{itemDetails?.pricing?.total_payment_from_joined_player?.price_per_user} SAR</td>
                  </tr>
                  <tr>
                    <td>Base Price :</td>
                    <td className='text-gray-700'>{} SAR</td>
                  </tr>
                  <tr>
                    <td>Discount :</td>
                    <td className='text-gray-700'>0.00 SAR</td>
                  </tr>
                  <tr>
                    <td>Public Event Price :</td>
                    <td className='text-gray-700'>95.24 SAR</td>
                  </tr>
                  <tr>
                    <td>Tax (5%) :</td>
                    <td className='text-gray-700'>4.76 SAR</td>
                  </tr>
                  <tr>
                    <td>Total:</td>
                    <td className='text-gray-700 fw-bolder'>100.00 SAR</td>
                  </tr>
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* modal 5 */}
      <div className='modal fade' tabIndex={-1} id='kt_modal_5'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Total income from public event Break Down</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <KTSVG
                  path='/media/icons/duotune/arrows/arr061.svg'
                  className='svg-icon svg-icon-2x'
                />
              </div>
            </div>
            <div className='modal-body'>
              <table className='table table-row-dashed gs-0 gy-3'>
                {/* begin::Table body */}
                <tbody>
                  <tr>
                    <td>Total Number of Players :</td>
                    <td className='text-gray-700'>{itemDetails?.player_numbers}</td>
                  </tr>
                  <tr>
                    <td>Price per player :</td>
                    <td className='text-gray-700'>{itemDetails?.price_per_user} SAR</td>
                  </tr>
                  <tr>
                    <td>Total Number of left players with fee :</td>
                    <td className='text-gray-700'>{itemDetails?.late_left_players_count} SAR</td>
                  </tr>
                  {/* <tr>
                    <td>Fee Price per player :</td>
                    <td className='text-gray-700'>{itemDetails?.price_per_user} SAR</td>
                  </tr> */}
                  <tr>
                    <td>Base Price :</td>
                    <td className='text-gray-700'>{itemDetails?.eventPricingData?.base_price} SAR</td>
                  </tr>
                  <tr>
                    <td>Discount :</td>
                    <td className='text-gray-700'>{itemDetails?.eventPricingData?.discount} SAR</td>
                  </tr>
                  <tr>
                    <td>Public Event Price :</td>
                    <td className='text-gray-700'>{itemDetails?.eventPricingData?.total_price} SAR</td>
                  </tr>
                  <tr>
                    <td>Tax ({itemDetails?.eventPricingData?.discount_percent} %) :</td>
                    <td className='text-gray-700'>{itemDetails?.eventPricingData?.tax} SAR</td>
                  </tr>
                  <tr>
                    <td>Total:</td>
                    <td className='text-gray-700 fw-bolder'>{itemDetails?.eventPricingData?.total_price} SAR</td>
                  </tr>
                </tbody>
                {/* end::Table body */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentTable
