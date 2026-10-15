import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Easing,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { DATA as D } from "./data";
import "./visual.css";
const C = D.colors;
const grad = (key: string) =>
  key === "white"
    ? C.white
    : `linear-gradient(110deg, ${C[key as "a" | "b" | "c"].join(",")})`;
const ease = (f: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(f, [a, b], [x, y], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 0.8, 0.3, 1),
  });
const enter = (f: number, delay = 0) =>
  spring({
    frame: f - delay,
    fps: 30,
    config: { damping: 24, stiffness: 110, mass: 1 },
  });
const Word: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ children, color = "white", size = 64, style }) => (
  <div
    style={{
      fontSize: size,
      fontWeight: 800,
      lineHeight: 1.2,
      background: grad(color),
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
      ...style,
    }}
  >
    {children}
  </div>
);
const Header: React.FC<{ n: number; label: string }> = ({ n, label }) => (
  <div className="header">
    <span className="tiny-brand">DRB / SPACE CHALLENGE 2026</span>
    <span>
      {String(n).padStart(2, "0")} <span className="dash" /> {label}
    </span>
  </div>
);
const Proposal: React.FC<{
  color?: string;
  style?: React.CSSProperties;
  plate?: boolean;
}> = ({ color = "#00C5CE", style, plate = false }) => (
  <div className={plate ? "plate" : "proposal"} style={style}>
    <div
      style={{
        height: 8,
        width: 42,
        borderRadius: 9,
        background: color,
        marginBottom: 18,
      }}
    />
    {plate ? (
      <svg viewBox="0 0 140 85" width="100%">
        <rect x="10" y="12" width="45" height="50" rx="12" fill={color} />
        <circle
          cx="99"
          cy="34"
          r="24"
          fill={C.base}
          stroke={color}
          strokeWidth="5"
        />
        <path
          d="M42 72H114"
          stroke={C.white}
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <>
        <div className="paper-line" />
        <div className="paper-line short" />
        <div
          style={{
            width: 35,
            height: 35,
            borderRadius: 12,
            border: `3px solid ${color}`,
            marginTop: 20,
          }}
        />
      </>
    )}
  </div>
);
const Icon: React.FC<{ type: number; color: string; f: number }> = ({
  type,
  color,
  f,
}) => {
  const w = Math.sin(f / 24);
  return (
    <svg viewBox="0 0 400 360" width="100%" height="100%" fill="none">
      <defs>
        <linearGradient id={"g" + type} x2="1" y2="1">
          <stop stopColor={color} />
          <stop
            offset="1"
            stopColor={
              type === 4
                ? "#FF3C99"
                : type === 2
                  ? "#FFBE25"
                  : type === 5
                    ? "#CB19EC"
                    : "#00E99A"
            }
          />
        </linearGradient>
      </defs>
      {type === 0 && (
        <>
          <circle
            cx="200"
            cy="180"
            r={100 + w * 4}
            fill={color}
            fillOpacity=".12"
            stroke={color}
            strokeWidth="5"
          />
          <circle
            cx={195 + w * 14}
            cy="176"
            r="40"
            fill={"url(#g" + type + ")"}
          />
          {Array.from({ length: 9 }, (_, i) => (
            <circle
              key={i}
              cx={200 + Math.cos(i * 2.4 + f / 150) * 130}
              cy={180 + Math.sin(i * 2.4 + f / 150) * 115}
              r={7 + (i % 3) * 4}
              fill={color}
            />
          ))}
        </>
      )}
      {type === 1 && (
        <>
          <path
            d="M128 50V254Q128 310 200 310Q272 310 272 254V50"
            stroke={C.base}
            strokeWidth="40"
            strokeLinecap="round"
          />
          <path
            d={`M128 ${170 + w * 25}V254Q128 310 200 310Q272 310 272 254V${100 - w * 25}`}
            stroke={"url(#g" + type + ")"}
            strokeWidth="23"
            strokeLinecap="round"
          />
          <path
            d="M106 45H150M250 45H294"
            stroke={C.white}
            strokeWidth="6"
            strokeLinecap="round"
          />
        </>
      )}
      {type === 2 &&
        Array.from({ length: 18 }, (_, i) => {
          let a = i * 2.4,
            r = 45 + i * 5 + (w + 1) * 12;
          return (
            <path
              key={i}
              d="M-14 -10L6 -19L21 3L5 18L-20 9Z"
              fill={i % 3 === 0 ? C.base : "url(#g2)"}
              transform={`translate(${200 + Math.cos(a) * r},${180 + Math.sin(a) * r}) rotate(${i * 31 + f * 0.2})`}
            />
          );
        })}
      {type === 3 && (
        <>
          <rect
            x="62"
            y="65"
            width="276"
            height="232"
            rx="42"
            stroke={C.base}
            strokeWidth="13"
          />
          <path
            d={`M72 183Q132 ${140 + w * 25} 200 182T328 ${180 - w * 24}V256Q328 287 297 287H103Q72 287 72 256Z`}
            fill="url(#g3)"
          />
          <path
            d={`M76 180Q132 ${137 + w * 25} 200 179T324 ${177 - w * 24}`}
            stroke="#F5F6FC"
            strokeOpacity=".6"
            strokeWidth="5"
          />
        </>
      )}
      {type === 4 && (
        <>
          <path
            d={`M202 32C${252 + w * 15} 122 167 130 249 185Q273 154 270 126C362 243 291 322 201 324C95 326 66 229 135 160Q132 224 163 218C136 142 216 122 202 32Z`}
            fill="url(#g4)"
          />
          <path
            d="M199 197C231 239 264 259 225 292C183 322 145 278 173 245Z"
            fill="#FFBE25"
          />
        </>
      )}
      {type === 5 && (
        <>
          {[130, 100, 70].map((r, i) => (
            <ellipse
              key={r}
              cx="200"
              cy="180"
              rx={r + 30}
              ry={r * 0.65}
              stroke={color}
              strokeOpacity={0.22 + i * 0.16}
              strokeWidth="3"
              transform={`rotate(-30 200 180)`}
            />
          ))}
          <path
            d="M150 116V215Q150 259 200 259Q250 259 250 215V116"
            stroke={C.base}
            strokeWidth="43"
          />
          <path
            d="M150 116V165M250 116V165"
            stroke="url(#g5)"
            strokeWidth="43"
          />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={200 + Math.cos(f / 40 + i * 2) * 143}
              cy={180 + Math.sin(f / 40 + i * 2) * 90}
              r="7"
              fill={color}
            />
          ))}
        </>
      )}
    </svg>
  );
};
const GroupIcon: React.FC<{ i: number }> = ({ i }) => (
  <svg
    viewBox="0 0 100 100"
    width="82"
    height="82"
    fill="none"
    stroke="currentColor"
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {i === 0 ? (
      <>
        <path d="M10 35L50 15L90 35L50 55Z M25 46V68Q50 86 75 68V46M90 35V66" />
      </>
    ) : i === 1 ? (
      <>
        <path d="M18 85V30H82V85M10 85H90M35 30V15H65V30M42 15V7" />
        <path d="M34 46H40M60 46H66M34 62H40M60 62H66M46 85V72H56V85" />
      </>
    ) : i === 2 ? (
      <>
        <path d="M12 22Q32 12 50 26Q68 12 88 22V80Q68 70 50 84Q30 70 12 80ZM50 26V84" />
      </>
    ) : (
      <>
        <circle cx="50" cy="30" r="15" />
        <circle cx="20" cy="48" r="10" />
        <circle cx="80" cy="48" r="10" />
        <path d="M27 85V72Q27 51 50 51Q73 51 73 72V85M8 85V72Q8 61 20 61M92 85V72Q92 61 80 61" />
      </>
    )}
  </svg>
);
function Scene1({ f }: { f: number }) {
  return (
    <>
      <div
        className="intro-orbit"
        style={{
          transform: `translate(-50%,-50%) rotate(${f * 0.14}deg) scale(${0.8 + enter(f) * 0.2})`,
        }}
      />
      <div
        className="intro"
        style={{ transform: `translateY(${ease(f, 22, 48, 65, 0)}px)` }}
      >
        <Word color="c" size={220} style={{ letterSpacing: -10 }}>
          2026
        </Word>
        <div
          style={{
            fontSize: 64,
            letterSpacing: 9,
            marginTop: 8,
            opacity: ease(f, 20, 42),
          }}
        >
          {D.brand}
        </div>
        <Word
          size={72}
          style={{
            marginTop: 72,
            opacity: ease(f, 42, 61),
            transform: `translateY(${ease(f, 42, 61, 24, 0)}px)`,
          }}
        >
          {D.headline}
        </Word>
        <div
          className="sub"
          style={{ marginTop: 24, opacity: ease(f, 54, 70) }}
        >
          {D.subtitle}
        </div>
      </div>
      <div
        className="bridge"
        style={{ width: ease(f, 94, 119, 100, 1680), background: grad("c") }}
      />
    </>
  );
}
function Scene2({ f }: { f: number }) {
  const split = ease(f, 45, 70);
  return (
    <>
      <Header n={2} label={D.scenes[1].title} />
      <div
        className="bridge"
        style={{
          width: 1680,
          background: grad("c"),
          opacity: 1 - ease(f, 0, 22),
          transform: `translateX(-50%) translateY(${ease(f, 0, 22, 0, -160)}px)`,
        }}
      />
      {Array.from({ length: 12 }, (_, i) => {
        const a = i * 2.4;
        return (
          <Proposal
            key={i}
            color={i % 2 ? "#FFBE25" : "#00C5CE"}
            style={{
              position: "absolute",
              left: 960 + Math.cos(a) * ease(f, i * 2, 48 + i * 2, 1120, 730),
              top: 510 + Math.sin(a) * ease(f, i * 2, 48 + i * 2, 720, 310),
              opacity: 0.12 * enter(f, i * 2),
              transform: `translate(-50%,-50%) rotate(${i % 2 ? 12 : -12}deg) scale(${0.6 + 0.15 * enter(f, i * 2)})`,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 350,
          display: "flex",
          justifyContent: "center",
          gap: 140,
        }}
      >
        <div
          style={{
            textAlign: "center",
            width: 650,
            transform: `translateX(${(1 - split) * 395}px)`,
          }}
        >
          <Word color="a" size={234}>
            {Math.round(ease(f, 9, 36, 0, D.teams))}
            <span style={{ fontSize: 90, marginLeft: 16 }}>팀</span>
          </Word>
          <div className="sub">지원 팀</div>
        </div>
        <div
          style={{
            textAlign: "center",
            width: 650,
            opacity: split,
            transform: `translateX(${(1 - split) * 150}px)`,
          }}
        >
          <Word color="c" size={234}>
            {Math.round(ease(f, 48, 73, 0, D.people))}
            <span style={{ fontSize: 90, marginLeft: 16 }}>명</span>
          </Word>
          <div className="sub">참가자</div>
        </div>
      </div>
      <div className="bottom-note">
        전국에서 모인 연구 질문이 도전의 시작이 되었습니다
      </div>
    </>
  );
}
const ParticipantContent: React.FC<{
  group: (typeof D.groups)[number];
  index: number;
}> = ({ group: g, index: i }) => (
  <>
    {" "}
    <div
      className="group-symbol"
      style={{ background: grad(g.color), color: C.bg }}
    >
      <GroupIcon i={i} />
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        gap: 16,
      }}
    >
      <div style={{ fontSize: 64, whiteSpace: "nowrap" }}>{g.label}</div>
      <Word color={g.color} size={180} style={{ whiteSpace: "nowrap" }}>
        {g.value}
        <span style={{ fontSize: 44, marginLeft: 10 }}>팀</span>
      </Word>
    </div>
  </>
);
function Scene3({ f }: { f: number }) {
  return (
    <>
      <Header n={3} label={D.scenes[2].title} />
      {f < 38 && (
        <Word
          color="a"
          size={ease(f, 0, 28, 234, 64)}
          style={{
            position: "absolute",
            left: ease(f, 0, 28, 378, 1510),
            top: ease(f, 0, 28, 350, 185),
            opacity: 1 - ease(f, 28, 38),
            zIndex: 5,
            whiteSpace: "nowrap",
          }}
        >
          {D.teams}
          <span style={{ fontSize: ease(f, 0, 28, 90, 40), marginLeft: 16 }}>
            팀
          </span>
        </Word>
      )}
      {f < 14 && (
        <Word
          color="c"
          size={234}
          style={{
            position: "absolute",
            left: 1099,
            top: 350,
            opacity: 1 - ease(f, 0, 14),
            zIndex: 5,
          }}
        >
          {D.people}
          <span style={{ fontSize: 90, marginLeft: 16 }}>명</span>
        </Word>
      )}
      <Word size={74} style={{ position: "absolute", left: 120, top: 178 }}>
        서로 다른 배경, 하나의 도전
      </Word>
      <div className="group-grid">
        {D.groups.map((g, i) => (
          <div
            className="group-card"
            key={g.label}
            style={{
              transform: `translate(${ease(f, 146, 179, 0, i % 2 ? 180 : -180)}px,${(1 - enter(f, i * 8)) * 150}px)`,
              opacity: ease(f, i * 8, i * 8 + 15),
            }}
          >
            <ParticipantContent group={g} index={i} />
          </div>
        ))}
      </div>
      <div className="bottom-note">참가자 구성 · 모든 수치는 팀 수 기준</div>
    </>
  );
}
function Scene4({ f }: { f: number }) {
  return (
    <>
      <Header n={4} label={D.scenes[3].title} />
      {f < 25 &&
        D.groups.map((g, i) => (
          <div
            className="group-card"
            key={g.label}
            style={{
              position: "absolute",
              width: 774,
              left: ease(f, 0, 24, i % 2 ? 1156 : -10, i % 2 ? 1920 : -774),
              top: 320 + Math.floor(i / 2) * 268,
            }}
          >
            <ParticipantContent group={g} index={i} />
          </div>
        ))}
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", opacity: ease(f, 15, 35) * 0.45 }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M500 530 Q${700 + i * 70} ${200 + i * 100} ${i < 3 ? 1500 : 380} ${250 + (i % 3) * 250}`}
            stroke={D.fields[i].color}
            strokeWidth="4"
            fill="none"
            strokeDasharray="1600"
            strokeDashoffset={ease(f, 15, 44, 1600, 0)}
          />
        ))}
      </svg>
      <Word
        color="b"
        size={420}
        style={{
          position: "absolute",
          left: 300,
          top: 215,
          transform: `scale(${enter(f)})`,
        }}
      >
        ?
      </Word>
      <div
        style={{
          position: "absolute",
          left: 730,
          top: 360,
          background: C.bg,
          padding: 30,
          borderRadius: 32,
        }}
      >
        <Word size={72}>{D.oneEnvironment}</Word>
        <Word
          color="c"
          size={78}
          style={{ marginTop: 25, opacity: ease(f, 20, 34) }}
        >
          {D.questions}
        </Word>
      </div>
      {D.fields.map((g, i) => (
        <div
          key={g.type}
          style={{
            position: "absolute",
            width: 140,
            height: 140,
            left: [150, 780, 1580, 220, 1440, 1600][i],
            top: [200, 180, 210, 730, 750, 520][i],
            opacity: ease(f, 20 + i * 2, 36 + i * 2),
            transform: `scale(${ease(f, 96, 119, 1, 1.8)})`,
          }}
        >
          <Icon type={g.type} color={g.color} f={f} />
        </div>
      ))}
    </>
  );
}
function Scene5({ f }: { f: number }) {
  let part = f < 120 ? 0 : 1;
  let t = f % 120;
  return (
    <>
      <Header n={5} label={D.scenes[4].title} />
      <div style={{ position: "absolute", left: 120, top: 172 }}>
        <Word size={68}>{D.questions}</Word>
      </div>
      <div className="fields">
        {D.fields.slice(part * 3, part * 3 + 3).map((g, i) => (
          <div
            className="field"
            key={i}
            style={{ transform: `translateY(${(1 - enter(t, i * 3)) * 65}px)` }}
          >
            <div
              className="field-graphic"
              style={{
                position: "relative",
                transform: `scale(${ease(t, 0, 20, 0.88, 1)})`,
              }}
            >
              {part === 1 && t < 22 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 1 - ease(t, 0, 22),
                    transform: `translateY(${-ease(t, 0, 22, 0, 70)}px) scale(${ease(t, 0, 22, 1, 0.7)})`,
                  }}
                >
                  <Icon
                    type={D.fields[i].type}
                    color={D.fields[i].color}
                    f={f}
                  />
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: part === 1 ? ease(t, 0, 22) : 1,
                  transform: `rotate(${part === 1 ? ease(t, 0, 22, -12, 0) : 0}deg)`,
                }}
              >
                <Icon type={g.type} color={g.color} f={f} />
              </div>
            </div>
            <div
              style={{
                fontSize: 64,
                lineHeight: 1.35,
                position: "relative",
                zIndex: 2,
                marginTop: 24,
              }}
            >
              {g.label.split("·")[0]}·<br />
              {g.label.split("·").slice(1).join("·")}
            </div>
            <div
              style={{
                width: 80,
                height: 8,
                borderRadius: 10,
                background: g.color,
                margin: "30px auto",
              }}
            />
          </div>
        ))}
      </div>
      <div className="bottom-note">
        {part === 1
          ? "기타 분야에는 전자기·자성 등이 포함됩니다"
          : "다양한 분야의 연구 질문이 모였습니다"}
      </div>
    </>
  );
}
function Scene6({ f }: { f: number }) {
  const pan = ease(f, 75, 103, 0, 1920);
  return (
    <>
      <Header n={6} label={D.scenes[5].title} />
      {f < 30 &&
        D.fields.slice(3).map((g, i) => (
          <div
            key={g.type}
            style={{
              position: "absolute",
              left: ease(f, 0, 28, 222.5 + i * 560, 240 + i * 187),
              top: ease(f, 0, 28, 290, 600),
              width: ease(f, 0, 28, 355, 132),
              height: ease(f, 0, 28, 355, 174),
              opacity: 1 - ease(f, 8, 28),
            }}
          >
            <Icon type={g.type} color={g.color} f={240 + f} />
          </div>
        ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${-pan}px)`,
        }}
      >
        <div className="stage-label">{D.finalLabel}</div>
        <Word
          color="b"
          size={230}
          style={{
            position: "absolute",
            top: 275,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          {D.finalists}
          <span style={{ fontSize: 90, marginLeft: 16 }}>팀</span>
        </Word>
        <div className="eight-cards">
          {Array.from({ length: D.finalists }, (_, i) => (
            <Proposal
              key={i}
              color={D.fields[(i + 3) % 6].color}
              style={{
                transform: `translateY(${(1 - enter(f, i * 3)) * 180}px) rotate(${(1 - enter(f, i * 3)) * (i - 4) * 8}deg)`,
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(${1920 - pan}px)`,
        }}
      >
        <div className="stage-label">{D.experimentLabel}</div>
        <Word
          color="c"
          size={230}
          style={{
            position: "absolute",
            top: 275,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          {D.experiments}
          <span style={{ fontSize: 90, marginLeft: 16 }}>팀</span>
        </Word>
        <div className="four-plates">
          {Array.from({ length: D.experiments }, (_, i) => (
            <Proposal
              plate={f > 120}
              key={i}
              color={D.fields[i].color}
              style={{
                width: 220,
                height: 180,
                transform: `translateY(${(1 - enter(f, 98 + i * 5)) * 90}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
function Scene7({ f }: { f: number }) {
  const focus = ease(f, 22, 44);
  const drop = ease(f, 63, 88, 0, 50);
  return (
    <>
      <Header n={7} label={D.scenes[6].title} />
      {Array.from({ length: D.experiments }, (_, i) => (
        <Proposal
          key={i}
          plate
          color={D.fields[i].color}
          style={{
            position: "absolute",
            width: 220,
            height: 180,
            left: interpolate(
              f,
              [0, 22, 44],
              [414 + i * 290, 414 + i * 290, i === 0 ? 439 : 414 + i * 290],
              { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
            ),
            top: ease(f, 22, 44, 610, 400) + drop,
            opacity: i === 0 ? 1 : 1 - focus,
            transform: `scale(${i === 0 ? 1 + focus * 0.2 : 1 - focus * 0.2})`,
            zIndex: 3,
            boxShadow:
              f < 24 && Math.floor(f / 6) === i ? "0 0 0 4px #F5F6FC" : "none",
          }}
        />
      ))}
      <div
        className="capsule"
        style={{ opacity: focus, transform: `translateY(${drop}px)` }}
      >
        <div className="capsule-lid" />
        <div className="capsule-window" />
        <div className="capsule-foot" />
      </div>
      <div
        style={{
          position: "absolute",
          left: 945,
          top: 335,
          opacity: ease(f, 32, 51),
        }}
      >
        <Word color="a" size={208}>
          {D.dropTime}
          <span style={{ fontSize: 85, marginLeft: 16 }}>초</span>
        </Word>
        <div className="sub" style={{ marginTop: 14 }}>
          {D.timeLabel}
        </div>
      </div>
      <Word
        size={80}
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 825,
          textAlign: "center",
          opacity: ease(f, 74, 91),
          transform: `translateY(${ease(f, 74, 91, 24, 0)}px)`,
        }}
      >
        {D.ending}
      </Word>
    </>
  );
}
export const Film: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = D.scenes.findIndex((s) => frame >= s.start && frame < s.end);
  const f = frame - D.scenes[idx].start;
  const scenes = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7];
  const Scene = scenes[idx];
  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        color: C.white,
        fontFamily: "SpaceNoto, sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`@font-face{font-family:SpaceNoto;src:url('${staticFile("fonts/NotoSansCJK-Bold.ttc")}') format('collection');font-weight:100 900;font-display:block;}`}</style>
      <div className="ambient" />
      <Scene f={f} />
      <div className="footer-mark">2026 DRB SPACE CHALLENGE</div>
    </AbsoluteFill>
  );
};
