import Lottie from "react-lottie";
import ContainerMax from "../../components/container/ContainerMax";
import chatting from "../../../public/chat.json"
import { TryFreeButton } from "../../components/buttons/Buttons";
import video from '../../assets/customer_service.mp4'
import { Link } from 'react-scroll';
import Video from "../../components/Video/Video";
import BasicAccordion from "../../components/Accordtion/Accordtion";
import { HelpTitle } from "../../components/titles/FeatureTitle";
const Need_Help = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: chatting,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };


    return (
        <div className="py-28">
<ContainerMax>
    <div className="px-12 flex justify-center items-center gap-10">
    <div className="flex-1">
        <div className="flex-column space-y-4 px-20">
        <h1 className="text-5xl font-bold font-sans text-heading ">A better way to talk with our customers</h1>
        <p className="text-normal text-heading">Manage all your customer conversations in one platform that feels just like your inbox</p>
    <div className="flex space-between gap-4">
            <TryFreeButton title="Try for free"/>
          
     <button className="bg-white border border-1 border-primary w-full px-3 py-2" >
    <span className="font-sans text-primary">  <Link to="customer_service"smooth={true} spy={true} >Get a demo</Link></span>
     </button>  
        </div>
        </div>
    </div>
    <div className="flex-1">
   <Lottie options={defaultOptions}/>
    </div>
    </div>
   

   <Video id="customer_service"video={video}/>
  


{/* Question Section */}
<div className="lg:flex md:flex flex-column gap-10 justify-between py-28"id="#free">
<div>
<HelpTitle title="Account and Order Information"/>
<div className="flex-column space-y-4 flex-1">

<BasicAccordion Question={"How to register a new account in drop-shop?"} Answer={"If you already have a Facebook page, group or YouTube channel or have a physical shop and have a basic idea about marketing, just pay 3000 rupees in drop-shop and some information like- your name, mobile number, email id, address, shop or Facebook Your reseller account will be activated within 72 hours of submitting the page link etc information. Accounts will not be approved without a deposit and this is done to differentiate you from ordinary customers."}/>
<BasicAccordion Question={"How to add new customers?"} Answer={"Once your shop is setup, you will get a section called My Customers from the Reseller Panel from where a new customer will be added by clicking the “Add” button and submitting the required customer information. Once added, you can place orders as many times as you like with this information. No need to provide information again and again."}/>
<BasicAccordion Question={"How to submit a new order?"}Answer={"After adding your customers information, search with the mobile number of the customer for whom you want to place an order from the customer section or click the Shop as Customer button directly from the list and set the amount of profit you want to sell on the product page of the product you want to order. Add to cart and checkout."}/>
<BasicAccordion Question={"How much advance payment is required to submit the order?"}Answer={"In case of submission of each order, it is mentioned how much money should be taken in advance for each product in Dhaka or outside of Dhaka. No order will be confirmed without payment. So you will confirm the order with either partial or full payment from your customer, this will reduce the order cancellation rate and increase your profit margin."}/>
<BasicAccordion Question={"Want to know about the registration fee!"} Answer={"Every new account registration on the Dropshop platform requires a deposit of Rs.3000 and in return every drop-shipper will get unlimited packaging and logistics support for 12 months (our services include Printing cartridge, Paper, Delivery Box, Bag, Scotch tape, Bubble Wrapping, Includes Courier COD Charge, Product Damage risk, manpower etc). There is no condition of fulfilling any target of monthly sales or annual sales."}/>
</div>
</div>
<div>
    <HelpTitle title={"Delivery information"}/>
    <div className="flex-column space-y-4 flex-1">
        <BasicAccordion Question={"Will the invoice of the ordered product be in the name of my shop?"} Answer={"Drop-shipping means that everything will be in your name, ie the invoice will be in the name of your store, and your mobile number will be there. So that the customer can contact you when needed. You don't need any investment for your product, you don't have to worry about courier or delivery, we will support all these, you just do marketing and submit the order from online or offline to our panel, we will do the rest for you."}/>
        <BasicAccordion Question={"Ordered products will be delivered through which courier?"}Answer={"Drop-shop ordered products are now home delivered only through Pathao Courier across Bangladesh including Dhaka (except some remote areas of St. Martin, Teknaf and those villages where roads are too impassable).For delivery information you can also call Pathao Courier's helpline number- 09610003030 for your parcel status or complaints."}/>
        <BasicAccordion Question={"How much is the courier charge in Dhaka and outside Dhaka?"} Answer={"Inside Dhaka City Corporation (Tk 60)Savar, Gazipur, Keraniganj (Tk 100)All Bangladesh (Tk 120)"}/>
        <BasicAccordion Question={"Can I track courier parcels online?"} Answer={"Yes you can! You can track all parcels of Pathao Courier online and know where your parcel is now or whether it has been delivered. Before delivery, the delivery information is informed through SMS to the customer's number."}/>
        <BasicAccordion Question={"How many days of order booking will be delivered?"} Answer={"Generally, orders are delivered within 24-48 hours of booking in Dhaka and 48-96 hours outside Dhaka. However, in some cases, such as natural disasters, floods, political rallies or elections, it may take more time than this."}/>
    </div>

</div>

<div>
    <HelpTitle title={"Profit and Payment "}/>
    <div className="flex-column space-y-4 flex-1">

        <BasicAccordion Question={"Can I sell the product at the price I want?"} Answer={"Yes you can! You can sell any product in our list by setting the price as you like. However, our suggested price will be given for all products. But the product cannot be sold much less than the market price. The main purpose of marketing is to earn profit, not to destroy the market by selling at low prices."}/>
        <BasicAccordion Question={"How to see how much profit in an order?"} Answer={"You can see the profit amount of each order from the order list section of your panel and also the current and last 30 days profit amount on the dashboard."}/>
        <BasicAccordion Question={"Want to know about order cancellation charges."} Answer={"Return Charges + Packaging + Printing + Man Power + Other Charges Rs.50 + Extra Courier Fee (if applicable) + A portion in case of product damage for each parcel will be deducted from the drop-shipper's account from Rs.110 to Rs.200 per parcel. . However, if the product is wrong or faulty, there will be no return charge and we will bear the cost ourselves."}/>
        <BasicAccordion Question={"How do I get or withdraw the profit money?"} Answer={"After product delivery your account will be ready for withdrawal of profit and 2 payments per month i.e. one payment on 1/2 and another payment on 15/16 will be transferred to your pre-set bkash or bank account. Minimum payout amount is 500 taka."}/>
        <BasicAccordion Question={"After how many days profit money will be paid?"} Answer={"2 payments per month i.e. one payment on 1/2 and another payment on 15/16 will be made through your pre-set bikash transfer. But excluding public holidays and weekends."}/>
    </div>
</div>

<div>
    <HelpTitle title={"Return and Warranty "}/>
    <div className="flex-column space-y-4 flex-1">

        <BasicAccordion Question={"What to do if the customer does not receive the product delivery?"} Answer={"To avoid fake orders we encourage our resellers to take at least Tk 100 or full payment in advance against each order. If advance payment is made, the customer will take delivery of the order quickly, the order will not be canceled and it will be easy to earn your profit."}/>
        <BasicAccordion Question={"Can the customer return the product if they don't like it?"} Answer={"No! If you don't like it, there are no returns. Because the products that we sell are all brand products and the specifications and features of all the products are the same, so please order with detailed information before ordering so that your customer can know the details about the product before delivery. However, if the wrong product or wrong color product is delivered from our side, the exchange will be done immediately or later."}/>
        <BasicAccordion Question={"If the product does not work, how to get technical support?"} Answer={"You should study yourself as a drop-shipper or reseller with every technical or tech or gadget product so that you can provide instant support to the customer yourself for any issue. Study the description and reviews of the product by yourself - the more product knowledge you have, the easier and faster it is to support customers."}/>
        <BasicAccordion Question={"What is the warranty policy for Drop-Shop products?"} Answer={"Warranty information will be provided with each product on our website. The minimum can be from 7 days to 3 years and will vary from product to product. To get after sales support for any product, you can directly bring the product to our shop or display center or send it by courier to Dhaka address. In case of courier, the courier up-down fee has to be paid by the customer. But small issues like how to run"}/>
        <BasicAccordion Question={"If there is a problem with the product, the customer will send the product to which address?"} Answer={"DropShop, 2nd Floor, Lift-2, House# 307, Elephant Road (Pubali Bank Building), Dhaka-1205 Contact person: Mr. SajalMobile Number: 01329-669775 (Of course give this mobile number but don't forget to give help line number)"} />
    </div>
</div>
</div>
</ContainerMax>
        </div>
    );
};

export default Need_Help;
