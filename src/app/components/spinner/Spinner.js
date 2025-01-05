function Spinner(params) {
  const {contentText} = params
  return (
    <div className=''>
      <span className='spinner-border spinner-border-sm align-middle me-2'></span>
      <span className=''>{contentText}</span>
    </div>
  )
}
export default Spinner
