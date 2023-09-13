import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contextapi';
import { useNavigate } from 'react-router-dom';

function AddVehicle() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const {auth, setauth} = useContext(AuthContext) 
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      // Create a FormData object to send both text and file data
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('model', data.model);
      formData.append('manufacturer', data.manufacturer);
      formData.append('price', data.price);
      
      // Append each image file to the FormData
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
      
      console.log(formData)
      // Make the POST request with the FormData
      await axios.post('http://localhost:4000/admin/add-vehicle', formData, {
        headers: { Authorization: 'Bearer ' + auth.token },
      }).then((result)=>{
        console.log(result.data)
        navigate('/admin/home')    
      })      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className='w-full md:w-2/3 lg:w-1/2 xl:w-1/3 m-4 p-6 bg-white rounded-lg shadow-lg'>
        <h1 className='text-center text-3xl font-semibold mb-6'>Add Vehicle</h1>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            <label htmlFor='name' className='text-gray-600'>
              Name
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type='text'
              id='name'
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <span className='text-red-500 text-sm'>{errors.name.message}</span>
            )}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='model' className='text-gray-600'>
              Model
            </label>
            <select
              {...register('model', { required: 'Model is required' })}
              id='model'
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                errors.model ? 'border-red-500' : ''
              }`}
            >
              <option value=''>Select Model</option>
              <option value='2010'>2010</option>
              {/* ... other options */}
            </select>
            {errors.model && (
              <span className='text-red-500 text-sm'>{errors.model.message}</span>
            )}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='manufacturer' className='text-gray-600'>
              Manufacturer
            </label>
            <select
              {...register('manufacturer', { required: 'Manufacturer is required' })}
              id='manufacturer'
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                errors.manufacturer ? 'border-red-500' : ''
              }`}
            >
              <option value=''>Select Manufacturer</option>
              <option value='Maruti Suzuki'>Maruti Suzuki</option>
              {/* ... other options */}
            </select>
            {errors.manufacturer && (
              <span className='text-red-500 text-sm'>{errors.manufacturer.message}</span>
            )}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='price' className='text-gray-600'>
              Price
            </label>
            <input
              {...register('price', { required: 'Price is required' })}
              type='text'
              id='price'
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                errors.price ? 'border-red-500' : ''
              }`}
            />
            {errors.price && (
              <span className='text-red-500 text-sm'>{errors.price.message}</span>
            )}
          </div>
          <div className='flex flex-col'>
            <label htmlFor='images' className='text-gray-600'>
              Images
            </label>
            <input
              {...register('images', { required: 'Images are required' })}
              type='file'
              id='images'
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${
                errors.images ? 'border-red-500' : ''
              }`}
              multiple // Allow multiple file selection
            />
            {errors.images && (
              <span className='text-red-500 text-sm'>{errors.images.message}</span>
            )}
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddVehicle;
