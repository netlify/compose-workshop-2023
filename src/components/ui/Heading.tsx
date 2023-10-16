interface Props {
  children: React.ReactNode;
  id: string;
}

export default function Heading({ children, id }: Props) {
  return (
    <h2 className="mt-16 font-semibold text-4xl text-white text-center">
      <a id={id} />
      {children}
    </h2>
  );
}
