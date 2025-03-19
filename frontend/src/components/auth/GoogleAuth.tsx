import { useGoogleAuth } from "@/api/hooks/auth/useGoogleAuth";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";
import { Button } from "../ui/button";
import { GoogleIconSvg } from "@/assets/svg";

const GoogleAuth = () => {
  // google authentication button
  const mutate = useGoogleAuth();
  const googleLogin = useGoogleLogin({
    onSuccess(credentialResponse) {
      async () => {
        console.log(credentialResponse);
        const { data } = await mutate.mutateAsync({
          token: credentialResponse.credential,
        });
        console.log(data);
      };
    },
    onError(errorResponse) {
      console.log("Callback error: " + errorResponse);
    },
  });

  return (
    <>
      <Button
        variant={'secondary'}
        className="
                w-full
                px-20 py-6
                !important
                flex
                gap-3
                items-center
                justify-center
              "
        onClick={() => googleLogin()}
      >
        <img
          src={GoogleIconSvg}
          alt="google"
          className="w-6 h-6" // Explicit icon sizing
        />
        <span className="font-semibold">Sign in with Google</span>
      </Button>
    </>
  );
};

export default GoogleAuth;
