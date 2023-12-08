interface Props {
  children?: React.ReactNode;
  type: 'white' | 'orange' | 'slate' | 'loading';
}

export default function Card({ children, type }: Props) {
  const styles = {
    orange: 'bg-gradient-to-r from-orange-500 to-red-500 p-16',
    green: 'bg-gradient-to-r from-green-500 to-green-500 p-16',
    white: 'bg-white',
    slate: 'flex my-8 bg-slate-600 rounded-xl gap-8 p-8 flex-wrap',
    loading:
      'min-h-[500px] flex my-8 bg-slate-600 rounded-xl p-8 animate-pulse',
  };

  const style = styles[type];

  return (
    <div
      className={`${style} flex flex-1 items-center justify-center shadow-2xl rounded-xl`}
    >
      <div className="justify-center text-center space-y-8">{children}</div>
    </div>
  );
}
