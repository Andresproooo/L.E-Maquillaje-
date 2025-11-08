import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/components/CartItem";
import { useState } from "react";
import { Checkout } from "@/components/Checkout";
import { Badge } from "@/components/ui/badge";

export const Cart = () => {
  const { items, totalItems, totalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
          <SheetHeader className="px-4 sm:px-6 pt-6 pb-4 flex flex-row items-center justify-between border-b">
            <SheetTitle className="text-lg sm:text-xl">Carrito de Compras</SheetTitle>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setSheetOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetHeader>
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto py-4 px-4 sm:px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <ShoppingCart className="h-16 w-16 mb-4 opacity-50" />
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                <div>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-border pt-4 px-4 sm:px-6 pb-6 space-y-4">
                <div className="flex justify-between text-base sm:text-lg font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    setSheetOpen(false);
                    setShowCheckout(true);
                  }}
                >
                  Finalizar Compra
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b">
            <DialogTitle className="text-xl sm:text-2xl font-bold">Finalizar Compra</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
            <Checkout onBack={() => setShowCheckout(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
