'use client'
import React from 'react'

interface PillarCardProps {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }

const PillarCard = ({title, description, icon : Icon}: PillarCardProps) => {
  return (
    <div className='relative overflow-hidden rounded-xl bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 p-6 shadow-lg transition-all duration-300 hover:bg-opacity-20 group'>
      <div className='absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-10'></div>
      <Icon className = "h-12 w-12 text-blue-500 mb-4"/>
      <h3 className='text-xl font-semibold text-gray-800 mb-2'>{title}</h3>
      <p className='text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>{description}</p>
    </div>
  )
}

export default PillarCard
