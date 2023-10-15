interface Props {
  children: React.ReactNode;
}

export default function Heading({ children }: Props) {
  return (
    <h2 className="mt-16 font-semibold text-4xl text-white text-center">
      {children}
    </h2>
  );
}
