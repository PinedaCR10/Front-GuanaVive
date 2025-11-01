import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLANS, useSubscriptions, type PlanType } from '../features/subscriptions';

export default function PlansPage() {
  const navigate = useNavigate();
  const { subscription, createSubscription, updateSubscription } = useSubscriptions();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSelectPlan = async (planName: PlanType) => {
    setIsLoading(true);
    setMessage(null);

    try {
      if (subscription) {
        // Actualizar plan existente
        await updateSubscription(subscription.id, { plan: planName });
        setMessage({ type: 'success', text: `Plan actualizado a ${planName} exitosamente` });
      } else {
        // Crear nueva suscripción
        await createSubscription({ plan: planName });
        setMessage({ type: 'success', text: `Plan ${planName} activado exitosamente` });
      }

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch {
      setMessage({ type: 'error', text: 'Error al procesar el plan. Intenta nuevamente.' });
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--gv-text)] mb-4">
            💎 Elige tu Plan
          </h1>
          <p className="text-lg text-[var(--gv-muted)] max-w-2xl mx-auto">
            Selecciona el plan que mejor se adapte a tus necesidades y comienza a publicar en GuanaVive
          </p>
        </div>

        {/* Mensaje de feedback */}
        {message && (
          <div
            className={`mb-8 max-w-2xl mx-auto rounded-md border px-4 py-3 text-sm ${
              message.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Plan actual */}
        {subscription && (
          <div className="mb-8 max-w-2xl mx-auto card p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Plan actual:</strong> {subscription.plan} -{' '}
              <span className={subscription.status === 'active' ? 'text-green-600' : 'text-gray-600'}>
                {subscription.status === 'active' ? 'Activo' : 'Inactivo'}
              </span>
            </p>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {Object.values(PLANS).map((plan) => {
            const isCurrentPlan = subscription?.plan === plan.name;
            const isRecommended = plan.name === 'Premium';

            return (
              <div
                key={plan.name}
                className={`card p-6 relative ${
                  isCurrentPlan
                    ? 'border-2 border-[var(--gv-primary)] bg-blue-50'
                    : 'border border-[var(--gv-border)]'
                } ${isRecommended ? 'ring-2 ring-yellow-400' : ''}`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ Recomendado
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-3 right-4 bg-[var(--gv-primary)] text-white px-3 py-1 rounded-full text-xs font-bold">
                    ✓ Plan Actual
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[var(--gv-text)] mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-[var(--gv-primary)]">
                      ₡{plan.price.toLocaleString()}
                    </span>
                    <span className="text-[var(--gv-muted)]">/mes</span>
                  </div>
                  <p className="text-sm text-[var(--gv-muted)]">{plan.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-sm text-[var(--gv-text)]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Publicaciones */}
                <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-[var(--gv-muted)] text-center">
                    {plan.maxPublications === 'unlimited'
                      ? '♾️ Publicaciones ilimitadas'
                      : `📝 Hasta ${plan.maxPublications} ${plan.maxPublications === 1 ? 'publicación' : 'publicaciones'}`}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedPlan(plan.name)}
                  disabled={isLoading || isCurrentPlan}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    isCurrentPlan
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[var(--gv-primary)] text-white hover:bg-[var(--gv-primary-dark)]'
                  }`}
                >
                  {isCurrentPlan ? 'Plan Actual' : subscription ? 'Cambiar a este plan' : 'Seleccionar Plan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal de confirmación */}
        {selectedPlan && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPlan(null)}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-[var(--gv-text)] mb-4">
                Confirmar {subscription ? 'Cambio' : 'Activación'} de Plan
              </h2>
              <p className="text-[var(--gv-muted)] mb-6">
                {subscription
                  ? `¿Estás seguro de que deseas cambiar tu plan de ${subscription.plan} a ${selectedPlan}?`
                  : `¿Estás seguro de que deseas activar el plan ${selectedPlan}?`}
              </p>

              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <p className="text-sm text-blue-900">
                  <strong>Plan seleccionado:</strong> {selectedPlan}
                </p>
                <p className="text-sm text-blue-900">
                  <strong>Precio:</strong> ₡
                  {PLANS[selectedPlan as keyof typeof PLANS].price.toLocaleString()}/mes
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedPlan(null)}
                  disabled={isLoading}
                  className="flex-1 btn btn-outline"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleSelectPlan(selectedPlan)}
                  disabled={isLoading}
                  className="flex-1 btn btn-primary"
                >
                  {isLoading ? 'Procesando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info adicional */}
        <div className="card p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-[var(--gv-text)] mb-4">
            📌 Información Importante
          </h3>
          <ul className="space-y-2 text-sm text-[var(--gv-muted)]">
            <li>• Puedes cambiar de plan en cualquier momento</li>
            <li>• Los cambios se aplican inmediatamente</li>
            <li>• Todas las publicaciones anteriores se mantienen</li>
            <li>• El plan Básico es completamente gratuito</li>
            <li>• Los pagos se procesan de forma segura</li>
          </ul>
        </div>

        {/* Back button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-[var(--gv-primary)] hover:underline"
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
