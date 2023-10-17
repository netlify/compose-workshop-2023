import Button from './ui/Button';

export default function BuyNow({ priceId }: { priceId: string }) {
  return (
    <Button
      type="button"
      onClick={() => {
        window
          .fetch('/api/purchase-session', {
            method: `POST`,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ priceId }),
          })
          .then(r => {
            return r.json();
          })
          .then(r => {
            window.location.assign(r.url);
          })
          .catch(e => {
            console.error(e);
          });
      }}
    >
      Buy now
    </Button>
  );
}
