import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useSubscriptions, type PlanType } from '../features/subscriptions';

interface CheckoutState {
  planName: PlanType;
  planPrice: number;
  planDescription: string;
  isUpgrade: boolean;
  currentPlan?: PlanType;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CheckoutState;
  const { subscription, createSubscription, updateSubscription } = useSubscriptions();

  const [step, setStep] = useState<'payment' | 'processing' | 'success'>('payment');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ');
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!cardName.trim()) {
      newErrors.cardName = 'El nombre es requerido';
    }

    const cleanedCardNumber = cardNumber.replace(/\s/g, '');
    if (!cleanedCardNumber || cleanedCardNumber.length !== 16) {
      newErrors.cardNumber = 'Número de tarjeta inválido';
    }

    if (!expiryDate || expiryDate.length !== 5) {
      newErrors.expiryDate = 'Fecha inválida (MM/AA)';
    }

    if (!cvv || cvv.length !== 3) {
      newErrors.cvv = 'CVV inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setPaymentError(null);
    setStep('processing');

    try {
      // Simular procesamiento de pago (2.5 segundos)
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Después del "pago exitoso", crear/actualizar la suscripción
      if (subscription) {
        // Si ya tiene suscripción, actualizarla
        await updateSubscription(subscription.id, { plan: state.planName });
      } else {
        // Si no tiene suscripción, crearla
        await createSubscription({ plan: state.planName });
      }

      setStep('success');
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setPaymentError('Ocurrió un error al activar tu plan. Por favor intenta nuevamente.');
      setStep('payment');
    }
  };

  const handleFinish = () => {
    navigate('/dashboard');
  };

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--gv-muted)] mb-4">No hay información de pago</p>
          <button onClick={() => navigate('/plans')} className="btn btn-primary">
            Ver Planes
          </button>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-[var(--gv-primary)] border-r-transparent mb-4"></div>
          <h2 className="text-2xl font-bold text-[var(--gv-text)] mb-2">
            Procesando pago...
          </h2>
          <p className="text-[var(--gv-muted)]">
            Por favor espera mientras procesamos tu pago de forma segura
          </p>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card max-w-md w-full mx-4 text-center p-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--gv-text)] mb-2">
            ¡Pago Exitoso!
          </h2>
          <p className="text-[var(--gv-muted)] mb-6">
            Tu suscripción al plan <strong>{state.planName}</strong> ha sido activada correctamente.
          </p>
          <div className="bg-[var(--gv-primary-100)] p-4 rounded-lg mb-6">
            <p className="text-sm text-[var(--gv-primary-600)]">
              Monto pagado: <strong>₡{state.planPrice.toLocaleString()}</strong>
            </p>
          </div>
          <button onClick={handleFinish} className="btn btn-primary w-full">
            Ir a mi Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold text-[var(--gv-text)] mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulario de pago */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-[var(--gv-primary)]" />
                <h2 className="text-xl font-bold text-[var(--gv-text)]">
                  Pago Seguro
                </h2>
              </div>

              {/* Mensaje de error */}
              {paymentError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {paymentError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre en la tarjeta */}
                <div>
                  <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
                    Nombre en la tarjeta
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="JUAN PÉREZ"
                    className={`input w-full ${errors.cardName ? 'border-red-500' : ''}`}
                  />
                  {errors.cardName && (
                    <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                  )}
                </div>

                {/* Número de tarjeta */}
                <div>
                  <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
                    Número de tarjeta
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value.replace(/\s/g, '').slice(0, 16));
                        setCardNumber(formatted);
                      }}
                      placeholder="1234 5678 9012 3456"
                      className={`input w-full pr-12 ${errors.cardNumber ? 'border-red-500' : ''}`}
                      maxLength={19}
                    />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Fecha de expiración */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
                      Fecha de expiración
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => {
                        const formatted = formatExpiryDate(e.target.value);
                        setExpiryDate(formatted);
                      }}
                      placeholder="MM/AA"
                      className={`input w-full ${errors.expiryDate ? 'border-red-500' : ''}`}
                      maxLength={5}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                    )}
                  </div>

                  {/* CVV */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--gv-text)] mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      placeholder="123"
                      className={`input w-full ${errors.cvv ? 'border-red-500' : ''}`}
                      maxLength={3}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Nota de pago ficticio */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">
                    <strong>Pago de Demostración:</strong> Este es un sistema de pago ficticio para fines de demostración. No se procesará ningún cargo real.
                  </p>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Pagar ₡{state.planPrice.toLocaleString()}
                </button>
              </form>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-4">
              <h3 className="font-bold text-[var(--gv-text)] mb-4">
                Resumen del pedido
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-[var(--gv-muted)]">Plan:</span>
                  <span className="font-semibold text-[var(--gv-text)]">
                    {state.planName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--gv-muted)]">Subtotal:</span>
                  <span className="text-[var(--gv-text)]">
                    ₡{state.planPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--gv-muted)]">IVA (13%):</span>
                  <span className="text-[var(--gv-text)]">
                    ₡{(state.planPrice * 0.13).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t pt-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[var(--gv-text)]">Total:</span>
                  <span className="text-2xl font-bold text-[var(--gv-primary)]">
                    ₡{(state.planPrice * 1.13).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-sm text-[var(--gv-muted)]">
                <p className="mb-2">{state.planDescription}</p>
                <p>Facturación mensual automática</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
