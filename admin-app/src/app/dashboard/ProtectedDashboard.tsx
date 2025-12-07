'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardPage from './page'

export default function ProtectedDashboard() {
    const router = useRouter()
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        if (!isLoggedIn) {
            router.replace('/auth/login')
        } else {
            setIsReady(true)
        }
    }, [])

    if (!isReady) return null

    return <DashboardPage />
}
