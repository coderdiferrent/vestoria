
import { useSearchParams } from "react-router-dom";
import RegisterForm from "@/components/RegisterForm";

const Register = () => {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm referralCode={referralCode} />
      </div>
    </div>
  );
};

export default Register;
