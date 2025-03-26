import { useGoogleAuth } from "@/api/hooks/auth/useGoogleAuth";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import { GoogleIconSvg } from "@/assets/svg";
import { useState } from "react";
import Loader from "@/components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";

const GoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  // google authentication mutation
  const mutate = useGoogleAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  // The useGoogleLogin hook returns an access token, not a credential
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send the access_token to your backend
        const { data } = await mutate.mutateAsync({
          access_token: tokenResponse.access_token,
        });

        navigate(
          data.isNewUser
            ? "/auth/welcome"
            : state && state.returnUrl
            ? state.returnUrl
            : "/"
        );
        console.log("Google auth success:", data);
        toast.success(
          data.isNewUser
            ? `Your account is being created with the user name ${data.user.username}`
            : "You have been signed in, thanks for coming back"
        );
      } catch (error) {
        console.error("Google auth error:", error);
        mutationErrorHandler(error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google login error:", errorResponse);
      mutationErrorHandler(errorResponse);
      setIsLoading(false);
    },
    // This callback is triggered when the popup is closed without selection
    onNonOAuthError: (nonOAuthError) => {
      console.error("Non-OAuth error:", nonOAuthError);
      setIsLoading(false);
    },
    // Request specific scopes if needed
    // scope: "email profile",
    // Use the flow that returns an access token, not an ID token
    flow: "implicit",
  });

  // Handle the Google login click
  const handleGoogleLogin = () => {
    setIsLoading(true); // Set loading state before opening popup
    login(); // Open the Google login popup
  };

  return (
    <Button
      variant="secondary"
      className="w-full px-20 py-6 flex gap-3 items-center justify-center"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader type="all" />
      ) : (
        <>
          <img src={GoogleIconSvg} alt="google" className="w-6 h-6" />
          <span className="font-semibold">
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </span>
        </>
      )}
    </Button>
  );
};

export default GoogleAuth;
