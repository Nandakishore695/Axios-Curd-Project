import React from 'react';

const Add = ({ handleInputChange, handleSubmit, isValue, handleEditSubmit }) => {
    return (
        <div>
            <form className='border-success rounded'>
                <input type='text' className='m-1 p-2 rounded border-0' placeholder='Title' name="title" onChange={handleInputChange} value={isValue?.title} />
                <input type='text' className='m-1 p-2 rounded border-0' placeholder='Description' name="description" onChange={handleInputChange} value={isValue?.description} />
                <button type='button' className='m-1 p-2 rounded border-0' onClick={handleSubmit}>Add</button>
                <input type='button' value="Edit" className='m-1 p-2 rounded border-0' onClick={handleEditSubmit} />
            </form>
        </div>
    )
}
export default Add;