import { ShieldCheck, UserRound, Tag, Headset, type LucideIcon } from "lucide-react";

export interface TrustItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const trustItems: TrustItem[] = [
  { icon: ShieldCheck, title: "Safe & Secure", description: "Your safety is our priority" },
  { icon: UserRound, title: "Professional Drivers", description: "Trained, verified & experienced" },
  { icon: Tag, title: "Best Price Guarantee", description: "No hidden charges, best fares" },
  { icon: Headset, title: "24/7 Support", description: "We're always here for you" },
];