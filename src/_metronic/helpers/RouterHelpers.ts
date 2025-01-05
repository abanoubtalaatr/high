export function getCurrentUrl(pathname: string) {
  return pathname.split(/[?#]/)[0]
}

export function checkIsActive(pathname: string, url: string) {
  const current = getCurrentUrl(pathname)
  
  if (!current || !url) {
    return false
  }

  if (current === url) {
    return true
  }

  if (current.indexOf(url) > -1) {
//     console.log((url));
// console.log((pathname));
// console.log((current.split('/') ));
    return true
  }


  return false
}
