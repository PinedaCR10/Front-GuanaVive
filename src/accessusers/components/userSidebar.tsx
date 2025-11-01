import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useSubscriptions } from "../../features/subscriptions";
import { PLANS, type PlanType } from "../../features/subscriptions";
import { useAuth } from "../../features/auth";

// ✅ Props tipadas para que funcione correctamente con UserHeader
export interface UserSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function UserSidebar({ open, onClose }: UserSidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { subscription, fetchMySubscription, createSubscription } = useSubscriptions();
  const [step, setStep] = useState<"menu" | "plans" | "form" | "edit">("menu");
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  // Cargar suscripción del usuario
  useEffect(() => {
    if (open) {
      fetchMySubscription();
    }
  }, [open, fetchMySubscription]);

  // 🔹 Verificar si el usuario tiene suscripción activa
  const isSubscribed = subscription && subscription.status === 'active';

  const handleSelectPlan = async () => {
    if (selectedPlan) {
      try {
        await createSubscription({ plan: selectedPlan });
        setStep("form");
      } catch (error) {
        console.error('Error al crear suscripción:', error);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-50 flex flex-col"
        >
          {/* 🔹 Encabezado */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              {step === "plans"
                ? "Selecciona un plan"
                : step === "form"
                ? "Agregar publicación"
                : step === "edit"
                ? "Editar perfil"
                : "Menú"}
            </h2>
            <button
              onClick={() => {
                if (step === "menu") onClose();
                else setStep("menu");
              }}
            >
              <X className="w-5 h-5 text-gray-600 hover:text-gray-800" />
            </button>
          </div>

          {/* 🔹 Contenido dinámico */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {step === "menu" && (
              <>
                <button
                  onClick={() => setStep(isSubscribed ? "form" : "plans")}
                  className="w-full text-left px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isSubscribed ? 'Agregar Publicación' : 'Obtener Plan'}
                </button>

                {subscription && (
                  <div className="p-3 bg-blue-50 rounded-md text-sm">
                    <p className="font-semibold text-blue-900">Plan Actual: {subscription.plan}</p>
                    <p className="text-blue-700 text-xs mt-1">Estado: {subscription.status === 'active' ? 'Activo' : 'Inactivo'}</p>
                  </div>
                )}

                <button
                  onClick={() => navigate('/profile')}
                  className="w-full text-left px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                >
                  Ver perfil
                </button>

                <button
                  onClick={() => navigate('/my-publications')}
                  className="w-full text-left px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                >
                  Mis publicaciones
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                >
                  Cerrar sesión
                </button>
              </>
            )}

            {/* 🔹 Planes disponibles */}
            {step === "plans" && (
              <div className="space-y-4">
                <p className="text-gray-600 text-sm mb-2">
                  Elige un plan para publicar en GuanaVive.
                </p>
                <div className="grid gap-3">
                  {Object.values(PLANS).map((plan) => (
                    <div
                      key={plan.name}
                      className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 ${
                        selectedPlan === plan.name ? "border-blue-500 bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedPlan(plan.name)}
                    >
                      <h3 className="font-semibold">{plan.name}</h3>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                      <p className="text-sm font-medium mt-1">
                        ₡{plan.price.toLocaleString()} / mes
                      </p>
                      <ul className="mt-2 space-y-1">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-600">
                            ✓ {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {selectedPlan && (
                  <button
                    onClick={handleSelectPlan}
                    className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Continuar con {selectedPlan}
                  </button>
                )}
              </div>
            )}

            {/* 🔹 Formulario para agregar publicación */}
            {step === "form" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Crea una nueva publicación desde el panel de publicaciones
                </p>
                <button
                  onClick={() => {
                    navigate('/my-publications/create');
                    onClose();
                  }}
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Ir a crear publicación
                </button>
                <button
                  onClick={() => setStep("menu")}
                  className="w-full py-2 border rounded-md hover:bg-gray-100"
                >
                  Volver al menú
                </button>
              </div>
            )}

            {/* 🔹 Sección editar perfil */}
            {step === "edit" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Edita tu perfil desde la página de perfil
                </p>
                <button
                  onClick={() => {
                    navigate('/profile');
                    onClose();
                  }}
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Ir a mi perfil
                </button>
                <button
                  onClick={() => setStep("menu")}
                  className="w-full py-2 border rounded-md hover:bg-gray-100"
                >
                  Volver al menú
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
