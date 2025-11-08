import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, CartItem as CartItemType } from "@/contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-2 sm:gap-4 py-3 sm:py-4 border-b border-border">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">{item.name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
        <div className="flex items-center gap-1 sm:gap-2 mt-2">
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7 sm:h-8 sm:w-8"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <span className="w-6 sm:w-8 text-center text-xs sm:text-sm text-foreground">{item.quantity}</span>
          <Button
            size="icon"
            variant="outline"
            className="h-7 w-7 sm:h-8 sm:w-8"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= item.stock}
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 sm:h-8 sm:w-8 ml-auto"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-sm sm:text-base text-foreground whitespace-nowrap">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};
