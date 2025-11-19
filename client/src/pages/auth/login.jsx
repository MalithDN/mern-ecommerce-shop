import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="w-full max-w-md mx-auto fade-in">
      <div className="mb-8 space-y-2">
        <div className="text-center">
          <div className="inline-block p-3 mb-4 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
            <span className="text-2xl font-bold text-white">🛍️</span>
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your account to continue shopping
          </p>
        </div>
      </div>

      <div className="p-8 mb-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>

      <div className="text-sm text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            className="font-semibold text-transparent transition-opacity bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text hover:opacity-80"
            to="/auth/register"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;
