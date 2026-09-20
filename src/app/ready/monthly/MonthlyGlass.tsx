// Декоративная векторная графика: прозрачный фон, фирменные цвета NeXora.
export function MonthlyGlass({ id }: { id: string }) {
  const ref = (name: string) => `url(#${id}-${name})`;
  return <svg viewBox="0 0 760 610" fill="none" aria-hidden="true" focusable="false" style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}>
    <defs>
      <linearGradient id={`${id}-edge`} x1="90" y1="100" x2="660" y2="490" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" /><stop offset=".16" stopColor="#83DFC8" stopOpacity=".82" /><stop offset=".35" stopColor="white" /><stop offset=".57" stopColor="#596EE9" stopOpacity=".53" /><stop offset=".73" stopColor="white" /><stop offset=".9" stopColor="#83DFC8" stopOpacity=".9" /><stop offset="1" stopColor="white" />
      </linearGradient>
      <linearGradient id={`${id}-pane`} x1="230" y1="110" x2="520" y2="440" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" stopOpacity=".83" /><stop offset=".38" stopColor="#83DFC8" stopOpacity=".19" /><stop offset=".72" stopColor="white" stopOpacity=".5" /><stop offset="1" stopColor="#596EE9" stopOpacity=".14" />
      </linearGradient>
      <linearGradient id={`${id}-shine`} x1="240" y1="140" x2="500" y2="430" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset=".55" stopColor="white" stopOpacity=".1" /><stop offset="1" stopColor="white" stopOpacity=".72" /></linearGradient>
      <radialGradient id={`${id}-sphere`} cx=".3" cy=".23" r=".79"><stop stopColor="white" /><stop offset=".15" stopColor="#DFF8F1" /><stop offset=".35" stopColor="#83DFC8" stopOpacity=".7" /><stop offset=".7" stopColor="#0F715E" stopOpacity=".85" /><stop offset=".87" stopColor="#83DFC8" /><stop offset="1" stopColor="#13372F" stopOpacity=".55" /></radialGradient>
      <radialGradient id={`${id}-clear`} cx=".28" cy=".2" r=".84"><stop stopColor="white" /><stop offset=".25" stopColor="white" stopOpacity=".7" /><stop offset=".68" stopColor="#83DFC8" stopOpacity=".12" /><stop offset=".85" stopColor="#596EE9" stopOpacity=".35" /><stop offset="1" stopColor="white" stopOpacity=".92" /></radialGradient>
      <radialGradient id={`${id}-shadow`}><stop stopColor="#13372F" stopOpacity=".12" /><stop offset="1" stopColor="#13372F" stopOpacity="0" /></radialGradient>
      <filter id={`${id}-depth`} x="-35%" y="-35%" width="180%" height="190%"><feDropShadow dx="0" dy="20" stdDeviation="16" floodColor="#13372F" floodOpacity=".1" /></filter>
      <filter id={`${id}-smallDepth`} x="-60%" y="-60%" width="240%" height="260%"><feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#13372F" floodOpacity=".12" /></filter>
    </defs>
    <ellipse cx="392" cy="534" rx="265" ry="43" fill={ref("shadow")} />
    <g transform="rotate(-27 380 315)">
      <ellipse cx="380" cy="315" rx="293" ry="155" stroke={ref("edge")} strokeWidth="21" strokeOpacity=".28" />
      <ellipse cx="380" cy="315" rx="293" ry="155" stroke={ref("edge")} strokeWidth="9" />
      <ellipse cx="380" cy="313" rx="289" ry="151" stroke="white" strokeWidth="2" strokeOpacity=".92" />
      <ellipse cx="380" cy="315" rx="303" ry="165" stroke="#83DFC8" strokeWidth="1" strokeOpacity=".45" />
    </g>
    <g transform="rotate(10 485 270)" filter={ref("depth")}>
      <rect x="365" y="117" width="224" height="287" rx="30" fill={ref("pane")} stroke={ref("edge")} strokeWidth="3" />
      <rect x="373" y="125" width="208" height="271" rx="24" stroke="white" strokeOpacity=".65" />
      <path d="M397 167H538M397 185H489M397 350H523" stroke="white" strokeWidth="5" strokeLinecap="round" strokeOpacity=".67" />
    </g>
    <g transform="rotate(-12 336 297)" filter={ref("depth")}>
      <rect x="165" y="160" width="341" height="267" rx="29" fill={ref("pane")} stroke={ref("edge")} strokeWidth="4" />
      <rect x="173" y="168" width="325" height="251" rx="23" stroke="white" strokeWidth="1.5" strokeOpacity=".83" />
      <path d="M177 207H494" stroke="white" strokeOpacity=".7" />
      <circle cx="191" cy="188" r="4" fill="#83DFC8" /><circle cx="208" cy="188" r="4" fill="white" fillOpacity=".9" /><circle cx="225" cy="188" r="4" fill="#596EE9" fillOpacity=".35" />
      <rect x="201" y="234" width="115" height="120" rx="17" fill={ref("clear")} stroke="white" strokeOpacity=".88" />
      <path d="M335 244H463M335 260H437M335 291H457M335 307H425" stroke="#0F715E" strokeOpacity=".2" strokeWidth="5" strokeLinecap="round" />
      <rect x="335" y="330" width="95" height="25" rx="12.5" fill="#0F715E" fillOpacity=".38" stroke="white" strokeOpacity=".65" />
      <path d="M205 382H456" stroke="white" strokeWidth="5" strokeLinecap="round" strokeOpacity=".8" />
      <path d="M177 178C241 167 364 207 492 301" stroke={ref("shine")} strokeWidth="15" strokeOpacity=".3" />
    </g>
    <g transform="rotate(17 592 407)" filter={ref("smallDepth")}>
      <rect x="540" y="342" width="100" height="132" rx="22" fill={ref("pane")} stroke={ref("edge")} strokeWidth="3" />
      <rect x="547" y="349" width="86" height="118" rx="17" stroke="white" strokeOpacity=".7" />
      <circle cx="590" cy="390" r="21" fill={ref("clear")} stroke="white" />
      <path d="M568 428H612M576 441H604" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </g>
    <path d="M130 424C241 527 520 446 645 247" stroke={ref("edge")} strokeWidth="12" strokeLinecap="round" />
    <path d="M130 422C243 522 518 441 643 247" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity=".85" />
    <g filter={ref("smallDepth")}><circle cx="156" cy="416" r="49" fill={ref("sphere")} stroke="white" strokeOpacity=".8" /><ellipse cx="140" cy="395" rx="18" ry="9" fill="white" fillOpacity=".68" transform="rotate(-30 140 395)" /></g>
    <circle cx="599" cy="171" r="25" fill={ref("clear")} stroke="white" strokeWidth="1.5" />
    <circle cx="358" cy="91" r="15" fill={ref("sphere")} stroke="white" />
    <circle cx="652" cy="299" r="8" fill="#FF735F" fillOpacity=".6" stroke="white" />
    <circle cx="284" cy="486" r="12" fill={ref("clear")} stroke="white" />
    <circle cx="115" cy="259" r="9" fill={ref("clear")} stroke="white" />
  </svg>;
}

export function GlassGlyph({ index }: { index: number }) {
  const paths = [
    <g key="site"><rect x="7" y="8" width="26" height="24" rx="5" /><path d="M7 15H33M12 12H13M17 12H18M12 21H27M12 26H22" /></g>,
    <g key="brand"><path d="M20 5L24 15L35 20L24 24L20 35L16 24L5 20L16 16Z" /></g>,
    <g key="contact"><path d="M31 25C35 18 31 8 21 7C11 6 5 14 8 22L6 33L16 30C22 33 28 30 31 25Z" /><path d="M14 17H26M14 22H22" /></g>,
    <g key="mobile"><rect x="11" y="4" width="18" height="32" rx="5" /><path d="M17 9H23M18 31H22" /></g>,
    <g key="search"><circle cx="18" cy="17" r="10" /><path d="M26 25L34 33M12 21L17 15L21 18L25 11" /></g>,
    <g key="launch"><path d="M8 27H31C39 22 33 14 28 16C27 3 11 5 11 16C3 15 2 24 8 27Z" /><path d="M20 19V35M15 30L20 35L25 30" /></g>,
  ];
  return <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[index % paths.length]}</svg>;
}
