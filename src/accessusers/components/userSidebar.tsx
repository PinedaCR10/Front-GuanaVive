import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";

// ✅ Props tipadas para que funcione correctamente con UserHeader
export interface UserSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function UserSidebar({ open, onClose }: UserSidebarProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<"menu" | "plans" | "form" | "edit">("menu");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // 🔹 Simula si el usuario está suscrito o no
  const isSubscribed = !!selectedPlan;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
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
                  Agregar
                </button>

                <button
                  onClick={() => setStep("edit")}
                  className="w-full text-left px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
                >
                  Editar perfil
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
                  <div
                    className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 ${
                      selectedPlan === "Básico" ? "border-blue-500" : ""
                    }`}
                    onClick={() => setSelectedPlan("Básico")}
                  >
                    <h3 className="font-semibold">Plan Básico</h3>
                    <p className="text-sm text-gray-600">
                      Publica un solo evento o perfil.
                    </p>
                    <p className="text-sm font-medium mt-1">₡0 / mes</p>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 ${
                      selectedPlan === "Premium" ? "border-blue-500" : ""
                    }`}
                    onClick={() => setSelectedPlan("Premium")}
                  >
                    <h3 className="font-semibold">Plan Premium</h3>
                    <p className="text-sm text-gray-600">
                      Publica hasta 5 eventos o perfiles. Mayor visibilidad.
                    </p>
                    <p className="text-sm font-medium mt-1">₡3.000 / mes</p>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 ${
                      selectedPlan === "Plus" ? "border-blue-500" : ""
                    }`}
                    onClick={() => setSelectedPlan("Plus")}
                  >
                    <h3 className="font-semibold">Plan Plus</h3>
                    <p className="text-sm text-gray-600">
                      Publicaciones ilimitadas, soporte prioritario y
                      estadísticas.
                    </p>
                    <p className="text-sm font-medium mt-1">₡6.000 / mes</p>
                  </div>
                </div>

                {selectedPlan && (
                  <button
                    onClick={() => setStep("form")}
                    className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Continuar con {selectedPlan}
                  </button>
                )}
              </div>
            )}

            {/* 🔹 Formulario para agregar publicación */}
            {step === "form" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Publicación enviada con éxito ✅");
                  setStep("menu");
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de publicación
                  </label>
                  <select className="w-full border rounded-md px-3 py-2 text-sm">
                    <option>Evento</option>
                    <option>Perfil</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="Nombre del evento o perfil"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    required
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    rows={3}
                    placeholder="Descripción breve..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imagen
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep("menu")}
                    className="px-3 py-2 border rounded-md text-sm hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    Publicar
                  </button>
                </div>
              </form>
            )}

            {/* 🔹 Sección editar perfil */}
            {step === "edit" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Perfil actualizado ✅");
                  setStep("menu");
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="ejemplo@correo.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-md px-3 py-2 text-sm"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep("menu")}
                    className="px-3 py-2 border rounded-md text-sm hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
