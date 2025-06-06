import { useTheme } from "@/app/theme-provider";
import { useApp } from "@/app/app-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeftIcon, ArrowRight, XCircle } from "lucide-react";
import { logoText, logoTextWhite } from "@/assets/logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { useInstructorRegister } from "@/api/hooks/auth/useInstructorRegister";
import CustomContactField from "@/components/form/CustomContactField";
import CustomFormField from "@/components/form/CustomFormField";
import Loader from "@/components/Loader";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { formatNumber, instructorFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/payments/CheckoutModal";
import { FaNairaSign } from "react-icons/fa6";
import { useRemoveFromCart } from "@/api/hooks/cart/useRemoveFromCart";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CartItem = ({
  item,
  setTotalPrice,
}: {
  item: { id: string; title: string; price: number; instructorName: string };
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const mutation = useRemoveFromCart();
  const [isAccepted, setIsAccepted] = useState<CheckedState>(false);

  const handleRemoveCartItem = async (cartItem) => {
    try {
      const { data } = await mutation.mutateAsync(cartItem);
      console.log(data);
      toast.success(`${cartItem.title} has been removed from your cart`);
    } catch (error) {
      mutationErrorHandler(error);
    }
  };

  useEffect(() => {
    if (isAccepted) setTotalPrice((prev: number) => prev + item.price);
    else setTotalPrice((prev: number) => (prev !== 0 ? prev - item.price : 0));
  }, [isAccepted, setTotalPrice, item.price]);

  return (
    <div
      key={item.id}
      className="flex gap-3 items-start border rounded-xl p-6 relative"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute top-3 right-3 w-[15px] h-[15px]">
            {mutation.isPending ? (
              <Loader type="loader" />
            ) : (
              <XCircle
                className="cursor-pointer text-gray-500 w-[15px] h-[15px]"
                onClick={() => handleRemoveCartItem(item)}
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Remove {item.title} <br /> by {item.instructorName} from cart
        </TooltipContent>
      </Tooltip>
      <Checkbox
        id={item.id}
        checked={isAccepted}
        onCheckedChange={(checked) => setIsAccepted(checked)}
      />
      <div className="flex flex-col gap-2 w-full font-bold">
        <div className="flex justify-between text-sm">
          <p className="text-xs sm:text-base">{item.title}</p>
          <p className="text-red text-xs sm:text-sm flex items-center">
            <FaNairaSign /> {item.price.toLocaleString()}
          </p>
        </div>
        <div className="flex justify-between text-xs font-thin text-gray-400">
          <Badge className="bg-gray-200 text-gray-400 px-4py-1 text-xs">
            {item.instructorName}
          </Badge>
          {/* <p>(N10,000)</p> */}
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const { user, setUser } = useApp();
  const { state } = useLocation();
  const currentStep = "Checkouts";
  // const { countries } = useCountries();
  const instructorRegisterMutation = useInstructorRegister();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vat, setVat] = useState(totalPrice);
  const [country, setCountry] = useState<Country>({
    name: "Nigeria",
    dialCode: "+234",
    code: "NG",
    flag: "🇳🇬",
  });
  const [, setDialCode] = useState(country?.dialCode || "+234");

  const closeModal = (open: boolean) => {
    setShowModal(open);
  };

  const formSchema = instructorFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: { name: "Nigeria", dialCode: "+234", code: "NG", flag: "🇳🇬" },
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await instructorRegisterMutation.mutateAsync({
        ...values,
      });
      toast.success("Request received", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
      });

      setUser(data.user);
      console.log(data);
      navigate(
        state && state.returnUrl ? state.returnUrl : "/auth/welcome/interest"
      );
    } catch (error) {
      mutationErrorHandler(error);
    }
  };

  useEffect(() => {
    form.setValue("country", country);
  }, [country, form]);

  useEffect(() => {
    setVat((totalPrice * 7.5) / 100);
  }, [totalPrice]);

  return (
    <>
      <div className="flex flex-col gap-6 justify-center items-center w-full">
        <div className="flex flex-col items-center justify-center "></div>
        <Card className="px-0 rounded-none bg-inherit border-0 w-full min-w-full lg:min-w-[70%] md:min-w-[90%] lg:w-[70%] md:w-[90%]">
          <CardContent className="px-[0.5px]">
            <CardHeader className="items-start flex">
              <div className="flex text-lg justify-between w-full gap-3">
                <h4 className={currentStep === "Checkouts" ? "font-bold" : ""}>
                  Cart{" "}
                </h4>
                <Button
                  variant={"secondary"}
                  className="border self-end border-red bg-low-red py-6 "
                  onClick={() => navigate("/home")}
                >
                  <ArrowLeftIcon size={20} /> Back
                </Button>
              </div>{" "}
              <div className="flex flex-col gap-1 lg:max-w-[794px]">
                <h2 className="font-semibold md:text-sm text-xs ">
                  In your carts
                </h2>
                <p className="text-xs sm:text-sm">
                  Kick start with <b>Netmifi!</b> Tell us your plan and we’ll
                  customize the setup. But no matter what you choose, you’ll get
                  full access to our features!.
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt- w-full flex flex-col gap-">
                <Form {...form}>
                  <div
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-full grid grid-cols-1 md:grid-cols- 2 justify-between gap-5 *:flex-grow *:min-w-[50%]"
                  >
                    <div className="flex flex-col gap-3 ">
                      {user.cart && user.cart.length > 0 ? (
                        user.cart.map(
                          (item: {
                            id: string;
                            title: string;
                            price: number;
                            instructorName: string;
                          }) => (
                            <CartItem
                              item={item}
                              setTotalPrice={setTotalPrice}
                            />
                          )
                        )
                      ) : (
                        <p>No item(s) to display on cart</p>
                      )}

                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between w-full">
                          <p className="text-xs">Subtotal </p>
                          <p className="text-sm">
                            {" "}
                            NGN {totalPrice.toLocaleString()}
                          </p>
                        </div>
                        {/* <div className="flex justify-between w-full">
                          <p className="text-xs">Vat </p>
                          <p className="text-sm"> NGN {vat.toLocaleString()}</p>
                        </div> */}
                        <hr />
                        <div className="flex justify-between font-bold w-full">
                          <p className="text-xs">Total</p>
                          <p className="text-base">
                            {" "}
                            NGN {(totalPrice + vat).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex w-full">
                          <Modal
                            isOpen={showModal}
                            onClose={closeModal}
                            total={totalPrice}
                            itemsPaidFor={user.cart}
                            trigger={
                              <Button
                                disabled={
                                  totalPrice < 1 ||
                                  instructorRegisterMutation.isPending
                                }
                                className="sm:ml-auto basis-full "
                                type="submit"
                                onClick={() => setShowModal(true)}
                              >
                                {instructorRegisterMutation.isPending ? (
                                  <Loader type="all" />
                                ) : (
                                  "Checkout"
                                )}
                              </Button>
                            }
                            header="How do you like to pay?"
                          />
                        </div>
                        <div className="items-center flex flex-col">
                          <Label
                            htmlFor="accept"
                            className="md:text-xs text-sm"
                          >
                            By clicking the Checkout button, you agree to
                            Netmifi’s
                          </Label>
                          <Link
                            to="/t&c"
                            className="md:text-xs text-sm text-red "
                          >
                            Terms and conditions?
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </CardContent>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

// export default SignInstructor;

export default Cart;
