import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProduct";
import Name from "@/components/modules/cart/Name";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import Specification from "@/components/modules/cart/Specification";

const CartPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8 my-5">
        <div className="lg:w-2/3">
          <CartProducts />
        </div>

        <div className="lg:w-1/3 w-full">
          <Name />
          <Specification />
          <Address />
          <PaymentDetails />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
