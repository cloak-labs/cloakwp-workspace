export const getQueryParamsString = (queryParams, url = '') => {
  let queryParamsString = ''
  
  if(
    typeof queryParams === 'object' &&
    !Array.isArray(queryParams) &&
    queryParams !== null
  ) {

    // queryParams is an object
    Object.entries(queryParams)?.forEach((param, i) => {
      const firstParam = i == 0 && !url.includes('?')
      queryParamsString += `${firstParam ? '?' : (i == 0 && url.endsWith('?') ? '' : '&')}${param[0]}=${param[1]}`
    })

  } else if(queryParams && typeof queryParams === 'string') {

    queryParamsString = queryParams
    if(!url.includes('?')) {
     if(!queryParams.startsWith('?')) queryParamsString = '?'+queryParams
    } else {
      if(!queryParams.startsWith('&') && !url.endsWith('?')) queryParamsString = '&'+queryParams
    }

  }

  return queryParamsString
}