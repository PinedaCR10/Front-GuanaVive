import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, CheckCircle2, Infinity as InfinityIcon, FileText, Star, ArrowLeft, Info } from 'lucide-react';
import { PLANS, useSubscriptions, type PlanType } from '../features/subscriptions';

export default function PlansPage() {
  const navigate = useNavigate();
  const { subscription } = useSubscriptions();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const handleSelectPlan = (planName: PlanType) => {
    // Obtener los detalles del plan seleccionado
    const planDetails = PLANS[planName];
    
    if (!planDetails) return;

    // Navegar al checkout con los datos del plan
    navigate('/checkout', {
      state: {
        planName: planDetails.name,
        planPrice: planDetails.price,
        planDescription: planDetails.description,
        planFeatures: planDetails.features,
        isUpgrade: !!subscription,
        currentPlan: subscription?.plan
      }
    });
  };

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-[var(--gv-primary-100)] rounded-full mb-4">
            <Crown className="w-8 h-8 text-[var(--gv-primary)]" />
          </div>
          <h1 className="text-4xl font-bold text-[var(--gv-text)] mb-4">
            Elige tu Plan
          </h1>
          <p className="text-lg text-[var(--gv-muted)] max-w-2xl mx-auto">
            Selecciona el plan que mejor se adapte a tus necesidades y comienza a publicar en GuanaVive
          </p>
        </div>

        {/* Plan actual */}
        {subscription && (
          <div className="mb-8 max-w-2xl mx-auto card p-4 bg-[var(--gv-primary-100)] border-[var(--gv-primary)]">
            <p className="text-sm text-[var(--gv-primary-600)]">
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
                    ? 'border-2 border-[var(--gv-primary)] bg-[var(--gv-primary-100)]'
                    : 'border border-[var(--gv-border)]'
                } ${isRecommended ? 'ring-2 ring-yellow-400' : ''}`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Recomendado
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute -top-3 right-4 bg-[var(--gv-primary)] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Plan Actual
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
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[var(--gv-text)]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Publicaciones */}
                <div className="mb-6 p-3 bg-[var(--gv-primary-100)] rounded-lg border border-[var(--gv-primary)]/20">
                  <p className="text-xs text-[var(--gv-primary-600)] text-center flex items-center justify-center gap-2">
                    {plan.maxPublications === 'unlimited' ? (
                      <>
                        <InfinityIcon className="w-4 h-4" />
                        Publicaciones ilimitadas
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        Hasta {plan.maxPublications} {plan.maxPublications === 1 ? 'publicación' : 'publicaciones'}
                      </>
                    )}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedPlan(plan.name)}
                  disabled={isCurrentPlan}
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
                {subscription ? 'Cambiar' : 'Activar'} Plan {selectedPlan}
              </h2>
              <p className="text-[var(--gv-muted)] mb-6">
                {subscription
                  ? `Vas a cambiar tu plan de ${subscription.plan} a ${selectedPlan}`
                  : `Vas a activar el plan ${selectedPlan}`}
              </p>

              <div className="p-4 bg-[var(--gv-primary-100)] rounded-lg mb-6">
                <p className="text-sm text-[var(--gv-primary-600)]">
                  <strong>Plan seleccionado:</strong> {selectedPlan}
                </p>
                <p className="text-sm text-[var(--gv-primary-600)]">
                  <strong>Precio:</strong> ₡
                  {PLANS[selectedPlan as keyof typeof PLANS].price.toLocaleString()}/mes
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="flex-1 btn btn-outline"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleSelectPlan(selectedPlan)}
                  className="flex-1 btn btn-primary"
                >
                  Proceder al Pago →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info adicional */}
        <div className="card p-6 max-w-3xl mx-auto bg-[var(--gv-primary-100)]/30">
          <h3 className="text-lg font-bold text-[var(--gv-text)] mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-[var(--gv-primary)]" />
            Información Importante
          </h3>
          <ul className="space-y-2 text-sm text-[var(--gv-muted)]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--gv-primary)] mt-0.5 flex-shrink-0" />
              <span>Puedes cambiar de plan en cualquier momento</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--gv-primary)] mt-0.5 flex-shrink-0" />
              <span>Los cambios se aplican inmediatamente</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--gv-primary)] mt-0.5 flex-shrink-0" />
              <span>Todas las publicaciones anteriores se mantienen</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--gv-primary)] mt-0.5 flex-shrink-0" />
              <span>El plan Básico es completamente gratuito</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--gv-primary)] mt-0.5 flex-shrink-0" />
              <span>Los pagos se procesan de forma segura</span>
            </li>
          </ul>
        </div>

        {/* Back button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-[var(--gv-primary)] hover:underline inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
