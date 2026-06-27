"use client";

interface ParcourItem {
  type: "formation" | "experience";
  icon: string;
  title: string;
  org: string;
  period: string;
  desc: string;
  tags: string[];
}

const items: ParcourItem[] = [
  {
    type: "formation",
    icon: "🎓",
    title: "Formation We.code",
    org: "Epitech Abidjan (wecode)",
    period: "Janvier 2026 — En cours",
    desc: "Programme intensif de formation en développement web et mobile. Apprentissage des technologies modernes : React.js, Vue.js, Next.js, NestJS, Laravel, MySQL et MongoDB.",
    tags: ["React.js", "Laravel", "NestJS", "React Native"],
  },
  {
    type: "formation",
    icon: "🎓",
    title: "Licence Développement d'Applications et E-services",
    org: "Université Virtuelle de Côte d'Ivoire (UVCI)",
    period: "Septembre 2024 — En cours",
    desc: "Formation en développement d'applications web et mobile. Apprentissage des fondamentaux du développement fullstack et des E-services.",
    tags: ["Fullstack", "Web", "Mobile", "E-services"],
  },


  {
    type: "formation",
    icon: "🎓",
    title: "Baccalauréat Série D",
    org: "Lycée Classique d'Abidjan",
    period: "Septembre 2021 — Juin 2024",
    desc: "Baccalaureat scientifique serie D, Sciences de la Vie et de la Terre.",
    tags: ["Bac", "Série D", "Sciences"],
  },
];

export default function Parcourt() {
  return (
    <section id="parcours" className="py-20 relative z-10">
      <style>{`
        .pc-line {
          background: linear-gradient(to bottom, transparent, #00ffff 15%, #0080ff 50%, #00ffff 85%, transparent);
        }
        .pc-dot-f {
          background: #00ffff;
          box-shadow: 0 0 0 3px rgba(0,255,255,0.2), 0 0 12px rgba(0,255,255,0.6);
        }
        .pc-dot-e {
          background: #a855f7;
          box-shadow: 0 0 0 3px rgba(168,85,247,0.2), 0 0 12px rgba(168,85,247,0.6);
        }
        .pc-box {
          background: rgba(0, 20, 30, 0.85);
          border: 1px solid rgba(0,255,255,0.15);
          backdrop-filter: blur(4px);
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .pc-box:hover {
          border-color: rgba(0,255,255,0.4);
          box-shadow: 0 0 20px rgba(0,255,255,0.08);
        }
        .pc-box-e { border-color: rgba(168,85,247,0.15) !important; }
        .pc-box-e:hover {
          border-color: rgba(168,85,247,0.4) !important;
          box-shadow: 0 0 20px rgba(168,85,247,0.08) !important;
        }
        .pc-icon-f { background: rgba(0,255,255,0.08); border: 1px solid rgba(0,255,255,0.25); }
        .pc-icon-e { background: rgba(168,85,247,0.08); border: 1px solid rgba(168,85,247,0.25); }
        .pc-tag-f { background: rgba(0,255,255,0.06); border: 1px solid rgba(0,255,255,0.3); color: #00ffff; }
        .pc-tag-e { background: rgba(168,85,247,0.06); border: 1px solid rgba(168,85,247,0.3); color: #a855f7; }
        .pc-title-f { color: #00ffff; }
        .pc-title-e { color: #a855f7; }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="orbitron text-3xl sm:text-5xl font-bold neon-text mb-4">PARCOURS</h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "linear-gradient(90deg, #00ffff, #0080ff)" }} />
          <p className="mt-4 text-xs tracking-widest uppercase font-mono" style={{ color: "rgba(0,255,255,0.5)" }}>
            Formation &amp; expériences professionnelles
          </p>
        </div>

        <div className="relative">
          <div className="pc-line hidden md:block absolute top-0 bottom-0 w-px" style={{ left: "50%", transform: "translateX(-50%)" }} />
          <div className="pc-line md:hidden absolute top-0 bottom-0 w-px" style={{ left: "20px" }} />

          <div className="space-y-10 md:space-y-14">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;
              const isExp = item.type === "experience";
              return (
                <div key={i} style={{ opacity: 1, transform: "none" }} className="relative">

                  {/* MOBILE */}
                  <div className="md:hidden flex">
                    <div className="relative shrink-0" style={{ width: 41 }}>
                      <div className={`${isExp ? "pc-dot-e" : "pc-dot-f"} absolute w-3 h-3 rounded-full`} style={{ top: 18, left: 14 }} />
                    </div>
                    <div className={`pc-box ${isExp ? "pc-box-e" : ""} rounded-xl p-5 flex-1 min-w-0`}>
                      <CardContent item={item} />
                    </div>
                  </div>

                  {/* DESKTOP */}
                  <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr 40px 1fr", alignItems: "start" }}>
                    <div className="pr-8 flex justify-end">
                      {isLeft
                        ? <div className={`pc-box ${isExp ? "pc-box-e" : ""} rounded-xl p-6 w-full max-w-lg`}><CardContent item={item} /></div>
                        : <div />}
                    </div>
                    <div className="flex justify-center" style={{ paddingTop: 18 }}>
                      <div className={`${isExp ? "pc-dot-e" : "pc-dot-f"} w-4 h-4 rounded-full shrink-0 z-10`} />
                    </div>
                    <div className="pl-8 flex justify-start">
                      {!isLeft
                        ? <div className={`pc-box ${isExp ? "pc-box-e" : ""} rounded-xl p-6 w-full max-w-lg`}><CardContent item={item} /></div>
                        : <div />}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CardContent({ item }: { item: ParcourItem }) {
  const isExp = item.type === "experience";
  return (
    <>
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${isExp ? "pc-icon-e" : "pc-icon-f"}`}>
          {item.icon}
        </div>
        <div className="min-w-0">
          <div className={`font-bold text-sm sm:text-base orbitron leading-snug ${isExp ? "pc-title-e" : "pc-title-f"}`}>
            {item.title}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {item.org}{" — "}
            <span style={{ color: "rgba(0,255,255,0.6)" }}>{item.period}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed mb-4">{item.desc}</p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className={`text-xs px-2.5 py-1 rounded-full font-mono ${isExp ? "pc-tag-e" : "pc-tag-f"}`}>
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}