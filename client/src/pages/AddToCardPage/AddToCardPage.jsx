import ContainerMax from '../../components/container/ContainerMax'
import AddToCardCarosoul from '../../components/carosouls/AddToCardCarosoul'
import AddToCardDetails from '../../components/detailsSections/AddToCardDetails'
import AddToCartProductDescription from '../../components/detailsSections/AddToCartDescription/AddToCartProductDescription'
import AddToCartFooterSlider from '../../components/detailsSections/AddToCartFooterSlider/AddToCartFooterSlider'

const AddToCardPage = () => {
  return (
    <>
      <ContainerMax>
        <div className='px-12 my-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 justify-between gap-14 mr-7'>
            <AddToCardCarosoul />
            <AddToCardDetails />
          </div>
          <div className='my-20'>
            <AddToCartProductDescription />
          </div>
          <div>
            Top footer
          </div>
        </div>
      </ContainerMax>
      <div>
        {/* <AddToCartFooterSlider /> */}
      </div>
    </>
  )
}

export default AddToCardPage
