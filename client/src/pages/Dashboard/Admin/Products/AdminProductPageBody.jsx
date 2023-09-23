import React from 'react'

const AdminProductPageBody = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Offer</th>
              <th>Purchased</th>
              <th>Stocked</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center ">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                </div>
              </td>
              <td> Zemlak, Daniel and Leannon</td>
              <td>Price</td>
              <td>Offer</td>
              <td>Purchased</td>
              <td>Stocked</td>
              <td>Status</td>
              <td>Date</td>
              <th>
                <button className="btn btn-info btn-xs">Edit</button>
                <button className='btn btn-warning btn-xs'>Delete</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminProductPageBody
