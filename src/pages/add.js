import React from 'react'

const Add = ({handleInputChange, handleAdd, }) => {

    return (
        <div>
            <form className='border-success rounded '>
                <input type='text' className='m-1 p-2 rounded' placeholder='Add Title' name="addTitle" onChange={handleInputChange}/>
                <input type='text' className='m-1 p-2 rounded' placeholder='Add Description' name="addDescription" onChange={handleInputChange}/>
                <input type='button' value="Add" className='m-1 p-2 rounded' onClick={handleAdd}/>
                <input type='button' value="Edit" className='m-1 p-2 rounded' />
            </form>
        </div>
    )
}
export default Add;