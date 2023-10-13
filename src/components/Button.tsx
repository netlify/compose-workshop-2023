interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({ children, onClick }: Props) {
  return (
    <button
      className="px-6 py-3 bg-white font-semibold rounded-full shadow-md hover:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
