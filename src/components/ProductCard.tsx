import Image from "next/image";
import Link from "next/link";
import { candlePrice, formatPrice, type Candle } from "@/data/candles";

export function ProductCard({ candle, large = false }: { candle: Candle; large?: boolean }) {
  return (
    <Link href={`/shop/${candle.slug}`} className={large ? "card card-large" : "card"}>
      <div className="card-media">
        <Image
          src={candle.image}
          alt={`${candle.name} candle`}
          fill
          sizes={large ? "(max-width: 800px) 100vw, 58vw" : "(max-width: 700px) 100vw, 33vw"}
        />
      </div>
      <div className="card-copy">
        <p className="card-kicker">{candle.kind === "design" ? "Design" : "In stock"}</p>
        <h3>{candle.name}</h3>
        <p>{candle.kind === "design" && !candle.lockedScent ? "Choose a flavour" : candle.scent}</p>
        <p className="card-price">{formatPrice(candlePrice(candle.kind))}</p>
        <span className="card-more">
          View jar
          <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M3 9h12M11 5l4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
