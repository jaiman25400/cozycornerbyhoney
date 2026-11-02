import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CustomBuilder } from "@/components/CustomBuilder";

export const metadata: Metadata = {
  title: "Custom candle",
  description:
    "Mix up to three candle flavours. A custom candle from Cozy Corner by Honey is $22 CAD, reserved on Instagram.",
  alternates: { canonical: "/custom/" },
};

export default function CustomPage() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Custom"
        title="Your mix."
        lede="Pick up to three flavours and how much of each goes into the wax. A custom candle is $22 CAD."
      />
      <div className="wrap" style={{ paddingBottom: "4.5rem" }}>
        <CustomBuilder />
      </div>
    </div>
  );
}
