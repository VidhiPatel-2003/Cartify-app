import React from 'react'
import Mainphoto from '../Components/Mainphoto'
import LatestCollection from '../Components/LatestCollection'
import Bestcollection from '../Components/Bestcollection'
import Policy from '../Components/Policy'

const Home: React.FC = () => {
  return (
    <>
      <Mainphoto />
      <LatestCollection />
      <Bestcollection />
      <Policy />
    </>
  )
}

export default Home