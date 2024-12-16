import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types/product';

interface MerchandiseSelectionProps {
  selectedItems: Record<string, number>;
  onItemSelect: (productId: string, quantity: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function MerchandiseSelection({
  selectedItems,
  onItemSelect,
  onNext,
  onBack
}: MerchandiseSelectionProps) {
  const { products, loading, error } = useProducts();

  const total = Object.entries(selectedItems).reduce((sum, [id, quantity]) => {
    const product = products.find(p => p.id === id);
    return sum + (product?.price || 0) * quantity;
  }, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B56A3]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">Unable to load products at this time. Please try again later.</p>
        <button
          onClick={onBack}
          className="mt-4 rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No merchandise available at this time.</p>
        <button
          onClick={onNext}
          className="mt-4 rounded-md bg-[#0B56A3] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#094282]"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <h2 className="text-2xl font-bold text-gray-900">WBC Merchandise</h2>
        <p className="mt-2 text-sm text-gray-500">
          Select any additional merchandise you would like to purchase.
        </p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <ShoppingCart className="mr-2 h-4 w-4" />
          <span>
            {Object.values(selectedItems).reduce((a, b) => a + b, 0)} items selected
          </span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="relative flex flex-col overflow-hidden rounded-lg border bg-white"
          >
            {product.imageUrl && (
              <div className="aspect-h-4 aspect-w-3 bg-gray-200">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Product+Image';
                  }}
                />
              </div>
            )}
            <div className="flex flex-1 flex-col space-y-2 p-4">
              <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
              <div 
                className="text-sm text-gray-500" 
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <div className="flex-1"></div>
              <div className="flex items-center justify-between">
                <p className="text-base font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => onItemSelect(product.id, Math.max(0, (selectedItems[product.id] || 0) - 1))}
                    className="rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{selectedItems[product.id] || 0}</span>
                  <button
                    type="button"
                    onClick={() => onItemSelect(product.id, (selectedItems[product.id] || 0) + 1)}
                    className="rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {total > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center text-lg font-medium">
            <span>Merchandise Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-md bg-[#0B56A3] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#094282]"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}