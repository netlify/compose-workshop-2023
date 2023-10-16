interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default function Button({ children, onClick, type = 'button' }: Props) {
  return (
    <button
      className="px-6 py-3 bg-white font-semibold rounded-full shadow-md hover:bg-gray-200"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
