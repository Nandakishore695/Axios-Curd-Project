import React from 'react'

const Add = () => {

    return (
        <div>
            <form className='border-success rounded '>
                <input type='text' className='m-1' placeholder='Add Title' name="title" />
                <input type='text' className='m-1' placeholder='Add Description' name="body" />
                <input type='button' value="Add" className='m-1' />
                <input type='button' value="Edit" className='m-1' />
            </form>
        </div>
    )
}
export default Add;