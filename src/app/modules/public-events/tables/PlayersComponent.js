import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";

function PlayersComponent(props) {
  const { itemDetails } = props
  const imageErrorHandler = (e) => {
    e.target.src = toAbsoluteUrl('/media/avatars/blank.png')
  }
  return (
    <>

      {/* begin::Table */}
      <div className='row pt-3 pb-5'>
        {
          itemDetails.map((item, index) => {
            return (
              <div className='col-lg-3' key={index}>
                <Link to={`/users/profile/${item.id}/details`} className='d-flex border p-3'>
                  <div className='symbol symbol-45px me-5'>
                    <img
                      src={item.photo || toAbsoluteUrl('/media/avatars/blank.png')}
                      alt={item.name}
                      onError={imageErrorHandler}
                    />
                  </div>
                  <div className='d-flex justify-content-start flex-column'>
                    <span className='text-dark fw-bold fs-6'>{item.name}</span>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>@{item.vie_id}</span>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                      {item.created_at}
                    </span>
                  </div>
                </Link>
              </div>
            )
          })
        }

      </div>
      {/* end::Table */}
    </>
  )
}

export default PlayersComponent
