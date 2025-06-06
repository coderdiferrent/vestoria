
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeInput, sanitizeEmail, sanitizeCPF, sanitizePhone, RateLimiter } from "@/utils/security";

interface RegisterFormProps {
  referralCode?: string | null;
}

const registerLimiter = new RateLimiter(3, 30 * 60 * 1000); // 3 attempts per 30 minutes

const RegisterForm = ({ referralCode }: RegisterFormProps) => {
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
    referredBy: referralCode || "",
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    hasNumber: false,
    hasUpperCase: false,
    hasSpecialChar: false
  });

  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Sanitize input based on field type
    let sanitizedValue = value;
    switch (name) {
      case 'firstName':
      case 'lastName':
        sanitizedValue = sanitizeInput(value).replace(/[0-9]/g, ''); // Remove numbers from names
        break;
      case 'email':
        sanitizedValue = value.toLowerCase().trim();
        break;
      case 'password':
      case 'confirmPassword':
        sanitizedValue = value; // Don't sanitize passwords to preserve special characters
        break;
      default:
        sanitizedValue = sanitizeInput(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));

    // Update password requirements validation
    if (name === "password") {
      setPasswordRequirements({
        length: value.length >= 8,
        hasNumber: /\d/.test(value),
        hasUpperCase: /[A-Z]/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      });
    }
  };

  const handlePhoneChange = (value: string) => {
    const sanitizedPhone = sanitizePhone(value);
    setFormData(prev => ({
      ...prev,
      phone: sanitizedPhone
    }));
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.length === 11;
  };

  const validatePhone = (phone: string): boolean => {
    return phone.length >= 12 && phone.length <= 15;
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && 
           /\d/.test(password) && 
           /[A-Z]/.test(password) &&
           /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const validateAge = (birthDate: string): boolean => {
    const today = new Date();
    const birth = new Date(birthDate);
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age >= 18; // Increased minimum age for security
  };

  const formatCPF = (cpf: string): string => {
    const cleanCPF = cpf.replace(/\D/g, '');
    
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
    const sanitized = sanitizeCPF(e.target.value);
    const formattedCPF = formatCPF(sanitized);
    setFormData(prev => ({
      ...prev,
      cpf: formattedCPF
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Enhanced validation for step 1
      const sanitizedData = {
        firstName: sanitizeInput(formData.firstName),
        lastName: sanitizeInput(formData.lastName),
        email: sanitizeEmail(formData.email),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        cpf: sanitizeCPF(formData.cpf),
        phone: sanitizePhone(formData.phone),
        birthDate: formData.birthDate,
        gender: formData.gender
      };

      // Rate limiting check
      if (!registerLimiter.isAllowed(sanitizedData.email)) {
        toast({
          title: "Muitas tentativas",
          description: "Aguarde 30 minutos antes de tentar novamente",
          variant: "destructive",
        });
        return;
      }

      // Validate all fields
      if (!sanitizedData.firstName || !sanitizedData.lastName) {
        toast({
          title: "Erro",
          description: "Por favor, preencha seu nome e sobrenome",
          variant: "destructive",
        });
        return;
      }

      if (!validatePhone(sanitizedData.phone)) {
        toast({
          title: "Erro",
          description: "Por favor, insira um número de telefone válido",
          variant: "destructive",
        });
        return;
      }

      if (!validateEmail(sanitizedData.email)) {
        toast({
          title: "Erro",
          description: "Por favor, insira um email válido",
          variant: "destructive",
        });
        return;
      }

      if (!validatePassword(sanitizedData.password)) {
        toast({
          title: "Erro",
          description: "A senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial",
          variant: "destructive",
        });
        return;
      }

      if (sanitizedData.password !== sanitizedData.confirmPassword) {
        toast({
          title: "Erro",
          description: "As senhas não coincidem",
          variant: "destructive",
        });
        return;
      }

      if (!validateCPF(sanitizedData.cpf)) {
        toast({
          title: "Erro",
          description: "Por favor, insira um CPF válido com 11 dígitos",
          variant: "destructive",
        });
        return;
      }

      if (!sanitizedData.birthDate) {
        toast({
          title: "Erro",
          description: "Por favor, insira sua data de nascimento",
          variant: "destructive",
        });
        return;
      }

      if (!validateAge(sanitizedData.birthDate)) {
        toast({
          title: "Erro",
          description: "Você precisa ter pelo menos 18 anos para criar uma conta",
          variant: "destructive",
        });
        return;
      }

      if (!sanitizedData.gender) {
        toast({
          title: "Erro",
          description: "Por favor, selecione seu sexo",
          variant: "destructive",
        });
        return;
      }

      // Update form data with sanitized values
      setFormData(prev => ({
        ...prev,
        firstName: sanitizedData.firstName,
        lastName: sanitizedData.lastName,
        email: sanitizedData.email,
        cpf: sanitizedData.cpf,
        phone: sanitizedData.phone
      }));

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
              cpf: formData.cpf.replace(/\D/g, ''),
              birth_date: formData.birthDate,
              gender: formData.gender,
              referred_by: sanitizeInput(formData.referredBy),
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
        console.error('Registration error:', error);
        toast({
          title: "Erro",
          description: "Erro ao criar conta. Tente novamente.",
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
        {referralCode && (
          <div className="mt-2 p-2 bg-green-50 text-green-700 rounded-md text-sm">
            Você foi convidado com o código: <strong>{referralCode}</strong>
          </div>
        )}
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
                  maxLength={50}
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
                  maxLength={50}
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
                maxLength={254}
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
                maxLength={128}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
              <div className="mt-1 text-xs text-gray-500">
                <p>A senha deve conter:</p>
                <ul className="list-disc pl-5">
                  <li className={passwordRequirements.length ? "text-green-500" : ""}>
                    Pelo menos 8 caracteres
                  </li>
                  <li className={passwordRequirements.hasNumber ? "text-green-500" : ""}>
                    Pelo menos 1 número
                  </li>
                  <li className={passwordRequirements.hasUpperCase ? "text-green-500" : ""}>
                    Pelo menos 1 letra maiúscula
                  </li>
                  <li className={passwordRequirements.hasSpecialChar ? "text-green-500" : ""}>
                    Pelo menos 1 caractere especial
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

            {/* Show referral code field if not coming from a referral link */}
            {!referralCode && (
              <div>
                <label htmlFor="referredBy" className="block text-sm font-medium text-gray-700">
                  Código de Indicação (opcional)
                </label>
                <input
                  id="referredBy"
                  name="referredBy"
                  type="text"
                  value={formData.referredBy}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Insira o código de indicação"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Se alguém te indicou, coloque o código aqui
                </p>
              </div>
            )}
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
