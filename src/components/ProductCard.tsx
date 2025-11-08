import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export const ProductCard = ({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  stock,
}: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (stock === 0) {
      toast({
        title: "Producto agotado",
        description: "Este producto no está disponible actualmente",
        variant: "destructive",
      });
      return;
    }

    addItem({
      id,
      name,
      price,
      imageUrl,
      stock,
    });

    toast({
      title: "Producto agregado",
      description: `${name} se agregó al carrito`,
    });
  };
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-hover)] border-border bg-gradient-to-br from-card to-muted/20">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
          {category}
        </Badge>
        {stock < 6 && stock > 0 && (
          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
            ¡Últimas unidades!
          </Badge>
        )}
        {stock === 0 && (
          <Badge className="absolute top-3 left-3 bg-muted text-muted-foreground">
            Agotado
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex-col gap-3">
        <div className="flex items-center justify-between w-full">
          <span className="text-2xl font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">
            Stock: {stock}
          </span>
        </div>
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};
