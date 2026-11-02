type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lede: string;
};

export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <header className="page-head wrap">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
    </header>
  );
}
