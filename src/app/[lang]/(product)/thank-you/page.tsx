import ThankYouPage from '@/components/PageClient/ThankyouPage'
import React from 'react'

const page = ({params,searchParams}: {params: {lang: string},searchParams:{id:string}}) => {

  return (
    <ThankYouPage lang={params.lang} orderId={searchParams.id}/>
  )
}

export default page