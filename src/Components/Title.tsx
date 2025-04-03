import React from 'react'
interface PropsType {
  text1: string;
  text2: string;
  
}

const Title: React.FC<PropsType> = ({ text1, text2 }) => {
  return (
    <>
      <div className='flex items-center gap-2 justify-center mt-8'>
        <p className='w-3  border-none sm:w-[150px] bg-black h-[1px] items-center'></p>
        <p className='text-gray-600 font-normal text-4xl'>{text1}<span className='font-medium text-gray-600 pl-[10px]'>{text2}</span></p>
        <p className='w-3  border-none sm:w-[150px] bg-black h-[1px] items-center'></p>
      </div>
     
    </>
  )
}

export default Title