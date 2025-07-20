import React from 'react'

function ActivityList({activiyLog}) {

  return (
    <ul className='mt-6 '>
         {activiyLog.map((item) => (
            <li className='mb-6 '>
                
                <p className='text-sm mb-2'> {item.log} </p>
                <p className='font-semibold text-xs mb-1'>{item.user.name}
                </p>
                <p className='text-xs'> {new Date(item.created_at).toLocaleString()} </p>
            </li>
          ))}

    </ul>
  )
}

export default ActivityList