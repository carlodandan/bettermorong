import { cn } from '../../lib/utils';
export default function Section({
  children,
  className,
  containerClassName,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  return (
    <section className={cn('py-12 bg-white', className)} id={id}>
      <div className={cn('container mx-auto px-4', containerClassName)}>
        {children}
      </div>
    </section>
  );
}
