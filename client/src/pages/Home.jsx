import React from 'react'
import Mainbanner from '../components/Mainbanner'
import Topusers from './Topusers'

const Home = () => {
  return (
    <div className='mt-10'>
      <Mainbanner/>
      <Topusers/>
    </div>
  )
}

export default Home
