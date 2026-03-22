import Image from "next/image";
import { skills } from "@/lib/data";

export default function SkillsMarquee() {
  const doubled = [...skills, ...skills];

  return (
    <div className="border-y border-border py-5 overflow-hidden bg-muted/20">
      <div className="flex gap-10 animate-marquee w-max">
        {doubled.map((skill, i) => (
          <div key={i} className="flex items-center gap-2.5 shrink-0">
            <Image src={skill.icon} alt={skill.name} width={18} height={18} unoptimized />
            <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
