import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md fade-in">
      <div className="space-y-2 mb-8">
        <div className="text-center">
          <div className="inline-block p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mb-4">
            <span className="text-white text-2xl font-bold">✨</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">
            Join us and start your shopping journey
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-6">
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>

      <div className="text-center text-sm">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            className="font-semibold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text hover:opacity-80 transition-opacity"
            to="/auth/login"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthRegister;
