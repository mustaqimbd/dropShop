import React from 'react'
import ContainerMax from '../../components/container/ContainerMax'
import AddToCardCarosoul from '../../components/carosouls/AddToCardCarosoul'
import AddToCardDetails from '../../components/detailsSections/AddToCardDetails'

const AddToCardPage = () => {
  return (
    <>
    <ContainerMax>
        <div className='px-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 justify-between'>
                <AddToCardCarosoul/>
                <AddToCardDetails/>
            </div>
        </div>
    </ContainerMax>
    </>
  )
}

export default AddToCardPage
