
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { supabase } from "@/integrations/supabase/client";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    birthDate: "",
    gender: "",
    verificationCode: "",
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    hasNumber: false,
    hasUpperCase: false
  });

  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update password requirements validation
    if (name === "password") {
      setPasswordRequirements({
        length: value.length >= 6,
        hasNumber: /\d/.test(value),
        hasUpperCase: /[A-Z]/.test(value)
      });
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validateCPF = (cpf: string): boolean => {
    // Remove non-numeric characters
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.length === 11;
  };

  const validatePhone = (phone: string): boolean => {
    // Brazilian phone format with country code should be 12-13 digits
    // +55 (area code) (phone number)
    return phone.length >= 12 && phone.length <= 13;
  };

  const validatePassword = (password: string): boolean => {
    // At least 6 characters, 1 number, 1 uppercase letter
    return password.length >= 6 && 
           /\d/.test(password) && 
           /[A-Z]/.test(password);
  };

  const validateAge = (birthDate: string): boolean => {
    const today = new Date();
    const birth = new Date(birthDate);
    
    // Calculate age
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age >= 12;
  };

  const formatCPF = (cpf: string): string => {
    // Remove non-numeric characters
    const cleanCPF = cpf.replace(/\D/g, '');
    
    // Format as xxx.xxx.xxx-xx
    if (cleanCPF.length <= 3) {
      return cleanCPF;
    } else if (cleanCPF.length <= 6) {
      return `${cleanCPF.slice(0, 3)}.${cleanCPF.slice(3)}`;
    } else if (cleanCPF.length <= 9) {
      return `${cleanCPF.slice(0, 3)}.${cleanCPF.slice(3, 6)}.${cleanCPF.slice(6)}`;
    } else {
      return `${cleanCPF.slice(0, 3)}.${cleanCPF.slice(3, 6)}.${cleanCPF.slice(6, 9)}-${cleanCPF.slice(9, 11)}`;
    }
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = formatCPF(e.target.value);
    setFormData(prev => ({
      ...prev,
      cpf: formattedCPF
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Validate all fields before moving to the next step
      if (!formData.firstName || !formData.lastName) {
        toast({
          title: "Erro",
          description: "Por favor, preencha seu nome e sobrenome",
          variant: "destructive",
        });
        return;
      }

      // Validate phone
      if (!validatePhone(formData.phone)) {
        toast({
          title: "Erro",
          description: "Por favor, insira um número de telefone válido no formato brasileiro",
          variant: "destructive",
        });
        return;
      }

      // Validate email
      if (!validateEmail(formData.email)) {
        toast({
          title: "Erro",
          description: "Por favor, insira um email válido",
          variant: "destructive",
        });
        return;
      }

      // Validate password
      if (!validatePassword(formData.password)) {
        toast({
          title: "Erro",
          description: "A senha deve ter pelo menos 6 caracteres, incluir uma letra maiúscula e um número",
          variant: "destructive",
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Erro",
          description: "As senhas não coincidem",
          variant: "destructive",
        });
        return;
      }

      // Validate CPF
      if (!validateCPF(formData.cpf)) {
        toast({
          title: "Erro",
          description: "Por favor, insira um CPF válido com 11 dígitos",
          variant: "destructive",
        });
        return;
      }

      // Validate birth date
      if (!formData.birthDate) {
        toast({
          title: "Erro",
          description: "Por favor, insira sua data de nascimento",
          variant: "destructive",
        });
        return;
      }

      if (!validateAge(formData.birthDate)) {
        toast({
          title: "Erro",
          description: "Você precisa ter pelo menos 12 anos para criar uma conta",
          variant: "destructive",
        });
        return;
      }

      // Validate gender
      if (!formData.gender) {
        toast({
          title: "Erro",
          description: "Por favor, selecione seu sexo",
          variant: "destructive",
        });
        return;
      }

      setStep(2);
      toast({
        title: "Código enviado",
        description: "Um código de verificação foi enviado para seu email",
      });
    } else {
      // Verify code and create account
      if (formData.verificationCode.length !== 6) {
        toast({
          title: "Erro",
          description: "O código de verificação deve ter 6 dígitos",
          variant: "destructive",
        });
        return;
      }

      try {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
              phone: formData.phone,
              cpf: formData.cpf.replace(/\D/g, ''), // Remove formatting before saving
              birth_date: formData.birthDate,
              gender: formData.gender,
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Conta criada",
          description: "Sua conta foi criada com sucesso!",
        });
        navigate("/");
      } catch (error: any) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Criar Conta</h2>
        <p className="mt-2 text-sm text-gray-600">
          {step === 1 ? "Preencha seus dados" : "Verifique seu email"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {step === 1 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Sobrenome
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <PhoneInput
                country="br"
                value={formData.phone}
                onChange={handlePhoneChange}
                inputClass="!w-full !px-3 !py-2 !bg-white !border !border-gray-300 !rounded-md !shadow-sm focus:!outline-none focus:!ring-primary focus:!border-primary"
                containerClass="!w-full"
                buttonClass="!border !border-gray-300 !rounded-l-md"
                specialLabel=""
              />
              <p className="text-xs text-gray-500 mt-1">Formato: +55 (DDD) XXXXX-XXXX</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              <div className="mt-1 text-xs text-gray-500">
                <p>A senha deve conter:</p>
                <ul className="list-disc pl-5">
                  <li className={passwordRequirements.length ? "text-green-500" : ""}>
                    Pelo menos 6 caracteres
                  </li>
                  <li className={passwordRequirements.hasNumber ? "text-green-500" : ""}>
                    Pelo menos 1 número
                  </li>
                  <li className={passwordRequirements.hasUpperCase ? "text-green-500" : ""}>
                    Pelo menos 1 letra maiúscula
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                CPF
              </label>
              <input
                id="cpf"
                name="cpf"
                type="text"
                required
                value={formData.cpf}
                onChange={handleCPFChange}
                maxLength={14}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="000.000.000-00"
              />
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                Data de Nascimento
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                required
                value={formData.birthDate}
                onChange={handleChange}
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 12)).toISOString().split('T')[0]}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              <p className="text-xs text-gray-500 mt-1">Você precisa ter pelo menos 12 anos</p>
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Sexo
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="">Selecione</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
                <option value="prefer_not_to_say">Prefiro não informar</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                Código de Verificação
              </label>
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                required
                maxLength={6}
                value={formData.verificationCode}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Digite o código de 6 dígitos"
              />
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {step === 1 ? "Próximo" : "Criar Conta"}
          </button>
        </div>
      </form>

      <div className="text-center">
        <button
          onClick={() => navigate("/login")}
          className="text-sm text-primary hover:text-secondary"
        >
          Já tem uma conta? Faça login
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
