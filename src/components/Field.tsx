import React from 'react'

export default function Field({ label, value, onChange }: { label: string, value: string | null, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <div>
        <p className='font-semibold pl-0.5 pb-1'>{label}</p>
        <input 
          className={`${value != null ? "text-while" : "text-gray-500"} bg-transparent w-full border-2 border-teal-500 rounded-lg px-4 py-2`} 
          type='text' value={value != null ? value : "None"} onChange={onChange}
        />
    </div>
  )
}
