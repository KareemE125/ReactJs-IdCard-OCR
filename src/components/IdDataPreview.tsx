import React from 'react'
import Field from './Field'
import { useIdDataContext } from '../context/IdData';
import { convertFiledNameToLable } from '../utils/stringFormatters';

export default function IdDataPreview() {

    const { idData, updateIdData } = useIdDataContext();


  return (
    <section className='relative '>
        <h2 className='text-2xl mb-4 rounded-lg bg-teal-600 w-fit px-8 py-2 font-semibold absolute -top-6 left-5'>Your Data</h2>
        <div className='w-full bg-black bg-opacity-50 rounded-lg border-2 border-teal-500 px-12 pb-8 pt-12  grid md:grid-cols-2 md:gap-x-12 gap-y-6'>
            {
                Object.entries(idData).slice(2).map(([fieldName, fieldValue], index) => (
                    <div key={fieldName+"#"+index} className='col-span-1'>
                        <Field 
                            label={convertFiledNameToLable(fieldName)} 
                            value= {fieldValue} 
                            onChange={(e) => { 
                                updateIdData({...idData, [fieldName]: e.target.value})
                            }}
                        />
                    </div>
                ))
            }

        </div>
    </section>
  )
}
