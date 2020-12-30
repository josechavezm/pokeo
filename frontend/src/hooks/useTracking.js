import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export const useTracking = () => {
  console.log(useHistory)
  const location = useLocation()

  useEffect(() => {
    if (!window.gtag) return
    const trackingId = 'G-ZDTKJKPY76'
    window.gtag('config', trackingId, { page_path: location.pathname })
  }, [location])
}
