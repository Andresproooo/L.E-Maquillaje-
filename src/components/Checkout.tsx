import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CheckoutProps {
  onBack: () => void;
}

export const Checkout = ({ onBack }: CheckoutProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Crear mensaje de WhatsApp
    const productDetails = items
      .map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");

    const message = `*Nueva Orden de Compra*\n\n*Cliente:*\n${formData.firstName} ${formData.lastName}\n\n*Dirección:*\n${formData.address}\n\n*Productos:*\n${productDetails}\n\n*Total: $${totalPrice.toFixed(2)}*`;

    // Número de WhatsApp (el usuario deberá configurarlo)
    const phoneNumber = "543884656451"; // Cambiar por el número real
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank");

    // Limpiar carrito
    clearCart();

    toast({
      title: "Orden enviada",
      description: "Tu orden ha sido enviada por WhatsApp",
    });

    onBack();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Dirección </Label>
          <Textarea
            id="address"
            required
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono (opcional)</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>

        <div className="border-t border-border pt-3 sm:pt-4 space-y-2 mt-2">
          <h3 className="font-semibold text-base sm:text-lg">Resumen de Compra</h3>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                <span className="truncate mr-2">
                  {item.name} x{item.quantity}
                </span>
                <span className="whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-base sm:text-lg pt-2 border-t border-border">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

      <Button type="submit" className="w-full" size="lg">
        Enviar Orden por WhatsApp
      </Button>
    </form>
  );
};
