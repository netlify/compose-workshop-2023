export default function Footer() {
  const date = new Date();
  return (
    <footer className="text-gray-500 text-center my-8">
      HalloweenTown © {date.getFullYear()}
    </footer>
  );
}
