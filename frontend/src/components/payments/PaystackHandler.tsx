import { useApp } from "@/app/app-provider";
import { Button } from "../ui/button";
import { PaystackIcon } from "@/assets/svg";
import Paystack from "@paystack/inline-js";
import { PaystackButton } from "react-paystack";
import { toast } from "sonner";
import { usePurchase } from "@/api/hooks/payment/usePurchase";

const PaystackHandler = ({ amount, courses = [] }) => {
  const { user } = useApp();
  const mutation = usePurchase();
  
  const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  const handleSuccess = async (transaction: unknown) => {
    
   
    // Here you can handle the successful transaction
  };
  return (
    <PaystackButton
      className="flex gap-3"
      email={user.email}
      amount={10000} // Amount in kobo (10000 kobo = 100 Naira)
      publicKey={paystackKey}
      metadata={{
        custom_fields: [
          {
            value: user.id,
            display_name: "User ID",
            variable_name: "userId",
          },
          {
            value: courses.map((course) => course.id).join(", "),
            display_name: "Courses Paid For",
            variable_name: "courses",
          },
        ],
      }}
      onSuccess={handleSuccess}
      currency="NGN"
      onClose={() => {
        toast.message("We hope you haven't changed your mind ☺");
      }}
      // onBankTransferConfirmationPending={() => {
      //   toast.message("Your bank transfer is being confirmed, please wait.");
      // }}
      // onPreload={handlePreload}
    >
      <Button variant="outline" className="flex gap-3">
        <img src={PaystackIcon} className="size-6" alt="paystack" />
        Pay with Paystack
      </Button>
    </PaystackButton>
  );
};

export default PaystackHandler;
