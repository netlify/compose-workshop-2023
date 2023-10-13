interface Props {
  bg: 'white' | 'gradient';
  children: React.ReactNode;
}

export default function Button({ bg, children }: Props) {
  const backgroundStyles =
    bg === 'gradient'
      ? 'bg-gradient-to-r from-blue-500 to-teal-500'
      : 'bg-white';
  return (
    <div
      className={`${backgroundStyles} flex flex-1 items-center justify-center shadow-2xl rounded-xl p-16`}
    >
      <div className="justify-center text-center space-y-8">{children}</div>
    </div>
  );
}
