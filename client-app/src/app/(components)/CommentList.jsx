import React from 'react'

function CommentList({comments}) {

  return (
    <div className='mt-6'>
         {comments.map((item) => (
            <div className='bg-gray-100  px-6 py-4 mb-4 rounded-md'>
                <p className='font-semibold text-sm mb-2'>{item.user.name}
                </p>
                <p className='text-sm mb-3'> {item.comment} </p>
                <p className='text-sm'> {new Date(item.created_at).toLocaleString()} </p>
            </div>
          ))}

    </div>
  )
}

export default CommentList