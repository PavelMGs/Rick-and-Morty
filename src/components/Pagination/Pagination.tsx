import React from 'react'

interface IPagination {
  quantity: number;
}

const Pagination: React.FC<IPagination> = ({ quantity }) => {
  return (
    <div>Pagination</div>
  )
}

export default Pagination