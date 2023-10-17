import { useState } from 'react';

import Button from '~/components/ui/Button';

interface Props {
  priceId?: string;
}

export default function BuyNow({ priceId }: Props) {
  const [isLoading, setLoading] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });
      const { url } = await response.json();
      window.location.assign(url);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <Button onClick={handlePurchase}>
      {isLoading ? 'Loading...' : 'Buy now'}
    </Button>
  );
}
