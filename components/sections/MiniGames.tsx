"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const cyan = "#00ffff";
const btnBase = { borderColor: "rgba(0,255,255,0.2)", color: cyan, background: "rgba(0,255,255,0.05)" } as const;

/* ═══════════════════════════════════════════
   MEMORY GAME
═══════════════════════════════════════════ */
const EMOJIS = ["⚛️","🐳","🦀","🔥","⚡","🧠","🛠️","🎯"];
type Card = { id: number; emoji: string; flipped: boolean; matched: boolean };

function MemoryGame() {
  const make = () => [...EMOJIS,...EMOJIS].sort(()=>Math.random()-0.5).map((emoji,i)=>({id:i,emoji,flipped:false,matched:false}));
  const [cards,setCards]=useState<Card[]>(make);
  const [sel,setSel]=useState<number[]>([]);
  const [moves,setMoves]=useState(0);
  const [won,setWon]=useState(false);
  const [locked,setLocked]=useState(false);
  const reset=()=>{setCards(make());setSel([]);setMoves(0);setWon(false);setLocked(false);};
  const flip=(id:number)=>{
    if(locked)return;
    const c=cards[id];
    if(c.flipped||c.matched||sel.length===2)return;
    const nc=cards.map(x=>x.id===id?{...x,flipped:true}:x);
    const ns=[...sel,id];
    setCards(nc);setSel(ns);
    if(ns.length===2){
      setMoves(m=>m+1);setLocked(true);
      const[a,b]=ns;
      if(nc[a].emoji===nc[b].emoji){
        const m2=nc.map(x=>ns.includes(x.id)?{...x,matched:true}:x);
        setCards(m2);setSel([]);setLocked(false);
        if(m2.every(x=>x.matched))setWon(true);
      } else {
        setTimeout(()=>{setCards(p=>p.map(x=>ns.includes(x.id)?{...x,flipped:false}:x));setSel([]);setLocked(false);},900);
      }
    }
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-xs">
        <span className="text-xs font-mono" style={{color:`${cyan}80`}}>moves: {moves}</span>
        <button onClick={reset} className="p-1.5 rounded hover:bg-white/5" style={{color:`${cyan}60`}}><RotateCcw className="w-3.5 h-3.5"/></button>
      </div>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {cards.map(card=>(
          <motion.button key={card.id} onClick={()=>flip(card.id)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg text-lg sm:text-xl flex items-center justify-center border"
            style={{background:card.flipped||card.matched?"rgba(0,255,255,0.08)":"rgba(255,255,255,0.03)",borderColor:card.matched?`${cyan}60`:card.flipped?`${cyan}40`:"rgba(255,255,255,0.08)",boxShadow:card.matched?`0 0 10px ${cyan}33`:"none"}}
            animate={{rotateY:card.flipped||card.matched?0:180}} transition={{duration:0.3}}>
            {card.flipped||card.matched?card.emoji:""}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>{won&&<motion.div className="text-center font-mono" initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}}>
        <p className="text-sm" style={{color:cyan}}>🎉 Solved in {moves} moves!</p>
        <button onClick={reset} className="mt-2 text-xs px-3 py-1 rounded border" style={{borderColor:`${cyan}40`,color:cyan}}>Play Again</button>
      </motion.div>}</AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SNAKE GAME
═══════════════════════════════════════════ */
const COLS=18,ROWS=14,CELL=16;
type Pos={x:number;y:number};
type Dir="UP"|"DOWN"|"LEFT"|"RIGHT";
const randPos=():Pos=>({x:Math.floor(Math.random()*COLS),y:Math.floor(Math.random()*ROWS)});

function SnakeGame(){
  const[snake,setSnake]=useState<Pos[]>([{x:10,y:8}]);
  const[food,setFood]=useState<Pos>({x:5,y:5});
  const[running,setRunning]=useState(false);
  const[dead,setDead]=useState(false);
  const[score,setScore]=useState(0);
  const dirRef=useRef<Dir>("RIGHT");
  const reset=()=>{setSnake([{x:10,y:8}]);setFood({x:5,y:5});dirRef.current="RIGHT";setScore(0);setDead(false);setRunning(false);};
  const changeDir=useCallback((d:Dir)=>{
    const opp:Record<Dir,Dir>={UP:"DOWN",DOWN:"UP",LEFT:"RIGHT",RIGHT:"LEFT"};
    if(d!==opp[dirRef.current])dirRef.current=d;
  },[]);
  useEffect(()=>{
    const h=(e:KeyboardEvent)=>{
      const m:Record<string,Dir>={ArrowUp:"UP",ArrowDown:"DOWN",ArrowLeft:"LEFT",ArrowRight:"RIGHT",w:"UP",s:"DOWN",a:"LEFT",d:"RIGHT"};
      if(m[e.key]){e.preventDefault();changeDir(m[e.key]);}
    };
    window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);
  },[changeDir]);
  useEffect(()=>{
    if(!running||dead)return;
    const id=setInterval(()=>{
      setSnake(prev=>{
        const d=dirRef.current,h=prev[0];
        const nx={x:(h.x+(d==="RIGHT"?1:d==="LEFT"?-1:0)+COLS)%COLS,y:(h.y+(d==="DOWN"?1:d==="UP"?-1:0)+ROWS)%ROWS};
        if(prev.some(s=>s.x===nx.x&&s.y===nx.y)){setDead(true);setRunning(false);return prev;}
        if(nx.x===food.x&&nx.y===food.y){setScore(s=>s+1);setFood(randPos());return[nx,...prev];}
        return[nx,...prev.slice(0,-1)];
      });
    },120);
    return()=>clearInterval(id);
  },[running,dead,food]);
  return(
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-between w-full" style={{maxWidth:COLS*CELL}}>
        <span className="text-xs font-mono" style={{color:`${cyan}80`}}>score: {score}</span>
        <button onClick={reset} className="p-1.5 rounded hover:bg-white/5" style={{color:`${cyan}60`}}><RotateCcw className="w-3.5 h-3.5"/></button>
      </div>
      <div className="relative rounded-lg overflow-hidden border" style={{width:COLS*CELL,height:ROWS*CELL,maxWidth:"100%",borderColor:"rgba(0,255,255,0.15)",background:"rgba(0,0,0,0.6)"}}>
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:`radial-gradient(circle,${cyan} 1px,transparent 1px)`,backgroundSize:`${CELL}px ${CELL}px`}}/>
        {snake.map((s,i)=><div key={i} className="absolute rounded-sm" style={{left:s.x*CELL+1,top:s.y*CELL+1,width:CELL-2,height:CELL-2,background:i===0?cyan:`rgba(0,255,255,${0.7-i*0.02})`,boxShadow:i===0?`0 0 6px ${cyan}`:"none"}}/>)}
        <motion.div className="absolute flex items-center justify-center text-xs" style={{left:food.x*CELL,top:food.y*CELL,width:CELL,height:CELL}} animate={{scale:[1,1.3,1]}} transition={{repeat:Infinity,duration:0.8}}>🍎</motion.div>
        {(!running||dead)&&<div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{background:"rgba(0,0,0,0.75)"}}>
          {dead&&<p className="text-xs font-mono" style={{color:"#ff5555"}}>💀 Game Over — {score} pts</p>}
          <button onClick={()=>{if(dead)reset();setRunning(true);}} className="text-xs font-mono px-4 py-1.5 rounded border" style={{borderColor:cyan,color:cyan}}>{dead?"RESTART":"START"}</button>
          {!dead&&<p className="text-[10px] font-mono" style={{color:`${cyan}50`}}>arrow keys / WASD</p>}
        </div>}
      </div>
      <div className="grid grid-cols-3 gap-1 md:hidden">
        {[[null,{d:"UP"as Dir,icon:<ChevronUp className="w-4 h-4"/>},null],[{d:"LEFT"as Dir,icon:<ChevronLeft className="w-4 h-4"/>},null,{d:"RIGHT"as Dir,icon:<ChevronRight className="w-4 h-4"/>}],[null,{d:"DOWN"as Dir,icon:<ChevronDown className="w-4 h-4"/>},null]].map((row,ri)=>row.map((cell,ci)=>(
          <div key={`${ri}-${ci}`} className="w-10 h-10 flex items-center justify-center">
            {cell&&<button onPointerDown={()=>{changeDir(cell.d);if(!running&&!dead)setRunning(true);}} className="w-10 h-10 rounded-lg border flex items-center justify-center" style={btnBase}>{cell.icon}</button>}
          </div>
        )))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BUG FIX GAME
═══════════════════════════════════════════ */
const BUGS=[
  {code:`function add(a, b) {\n  return a - b;\n}`,bug:"- should be +",fix:"return a + b;",hint:"Wrong operator"},
  {code:`const arr = [1,2,3];\nconsole.log(arr.lenght);`,bug:"lenght → length",fix:"arr.length",hint:"Typo in property name"},
  {code:`for(let i=0; i<=arr.length; i++){\n  console.log(arr[i]);\n}`,bug:"<= causes off-by-one",fix:"i < arr.length",hint:"Off-by-one error"},
  {code:`async function getData() {\n  const res = fetch('/api');\n  return res.json();\n}`,bug:"Missing await",fix:"await fetch('/api')",hint:"Async/await missing"},
  {code:`const obj = {name: 'Dev'};\nconsole.log(obj.Name);`,bug:"Name → name",fix:"obj.name",hint:"Case sensitivity"},
  {code:`let x = '5' + 3;\nconsole.log(x === 8);`,bug:"'5'+3 = '53' not 8",fix:"Number('5') + 3",hint:"Type coercion"},
];

function BugFixGame(){
  const[idx,setIdx]=useState(0);
  const[input,setInput]=useState("");
  const[result,setResult]=useState<"idle"|"correct"|"wrong">("idle");
  const[score,setScore]=useState(0);
  const[done,setDone]=useState(false);
  const[showHint,setShowHint]=useState(false);
  const bug=BUGS[idx];
  const check=()=>{
    const correct=input.trim().toLowerCase().includes(bug.fix.toLowerCase().split(" ")[0]);
    if(correct){
      setResult("correct");setScore(s=>s+1);
      setTimeout(()=>{
        if(idx+1>=BUGS.length){setDone(true);}
        else{setIdx(i=>i+1);setInput("");setResult("idle");setShowHint(false);}
      },900);
    } else {setResult("wrong");setTimeout(()=>setResult("idle"),800);}
  };
  const reset=()=>{setIdx(0);setInput("");setResult("idle");setScore(0);setDone(false);setShowHint(false);};
  if(done)return(
    <div className="flex flex-col items-center gap-4 w-full max-w-sm text-center">
      <p className="text-2xl">🎉</p>
      <p className="font-mono text-sm" style={{color:cyan}}>All bugs squashed! Score: {score}/{BUGS.length}</p>
      <button onClick={reset} className="text-xs font-mono px-4 py-1.5 rounded border" style={{borderColor:cyan,color:cyan}}>Play Again</button>
    </div>
  );
  return(
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono" style={{color:`${cyan}80`}}>bug {idx+1}/{BUGS.length} · score: {score}</span>
        <button onClick={reset} className="p-1.5 rounded hover:bg-white/5" style={{color:`${cyan}60`}}><RotateCcw className="w-3.5 h-3.5"/></button>
      </div>
      <div className="rounded-lg p-3 sm:p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto" style={{background:"rgba(255,0,0,0.04)",border:"1px solid rgba(255,80,80,0.2)",color:"rgba(255,255,255,0.8)"}}>
        {bug.code}
      </div>
      <p className="text-xs font-mono" style={{color:"#ff5555"}}>🐛 Find & fix the bug:</p>
      <div className="flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()}
          placeholder="type the fix..."
          className="flex-1 px-3 py-2 rounded-lg text-xs font-mono bg-transparent border outline-none text-white placeholder:text-white/20"
          style={{borderColor:result==="correct"?"#00ff88":result==="wrong"?"#ff5555":"rgba(0,255,255,0.2)"}}/>
        <motion.button onClick={check} className="px-3 py-2 rounded-lg text-xs font-mono border"
          style={{borderColor:cyan,color:cyan}} whileTap={{scale:0.95}}>FIX</motion.button>
      </div>
      <div className="flex items-center justify-between">
        <button onClick={()=>setShowHint(h=>!h)} className="text-[10px] font-mono" style={{color:`${cyan}50`}}>
          {showHint?"hide hint":"💡 hint"}
        </button>
        {result==="correct"&&<span className="text-[10px] font-mono" style={{color:"#00ff88"}}>✓ Fixed!</span>}
        {result==="wrong"&&<span className="text-[10px] font-mono" style={{color:"#ff5555"}}>✗ Try again</span>}
      </div>
      {showHint&&<p className="text-[10px] font-mono px-3 py-2 rounded" style={{background:"rgba(0,255,255,0.05)",color:`${cyan}80`}}>💡 {bug.hint}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   TYPING SPEED GAME
═══════════════════════════════════════════ */
const SENTENCES=[
  "const dev = () => buildAmazingThings();",
  "git commit -m 'fix: squash all the bugs'",
  "npm install && npm run dev",
  "async function fetchData() { return await api.get(); }",
  "docker build -t myapp . && docker run myapp",
  "SELECT * FROM skills WHERE level = 'expert';",
];

function TypingGame(){
  const[sentence]=useState(()=>SENTENCES[Math.floor(Math.random()*SENTENCES.length)]);
  const[typed,setTyped]=useState("");
  const[started,setStarted]=useState(false);
  const[finished,setFinished]=useState(false);
  const[startTime,setStartTime]=useState(0);
  const[wpm,setWpm]=useState(0);
  const[accuracy,setAccuracy]=useState(100);
  const inputRef=useRef<HTMLInputElement>(null);
  const reset=()=>{setTyped("");setStarted(false);setFinished(false);setWpm(0);setAccuracy(100);setTimeout(()=>inputRef.current?.focus(),50);};
  const onChange=(v:string)=>{
    if(!started){setStarted(true);setStartTime(Date.now());}
    setTyped(v);
    const correct=v.split("").filter((c,i)=>c===sentence[i]).length;
    setAccuracy(v.length?Math.round((correct/v.length)*100):100);
    if(v===sentence){
      const mins=(Date.now()-startTime)/60000;
      setWpm(Math.round((sentence.split(" ").length)/mins));
      setFinished(true);
    }
  };
  return(
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono" style={{color:`${cyan}80`}}>
          {started&&!finished?`acc: ${accuracy}%`:"typing speed test"}
        </span>
        <button onClick={reset} className="p-1.5 rounded hover:bg-white/5" style={{color:`${cyan}60`}}><RotateCcw className="w-3.5 h-3.5"/></button>
      </div>
      {/* Target text with per-char coloring */}
      <div className="rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto" style={{background:"rgba(0,255,255,0.03)",border:"1px solid rgba(0,255,255,0.1)"}}>
        {sentence.split("").map((ch,i)=>{
          const color=i<typed.length?(typed[i]===ch?"#00ff88":"#ff5555"):"rgba(255,255,255,0.5)";
          return<span key={i} style={{color,background:i===typed.length?"rgba(0,255,255,0.2)":undefined}}>{ch}</span>;
        })}
      </div>
      <input ref={inputRef} value={typed} onChange={e=>onChange(e.target.value)} disabled={finished}
        placeholder="start typing..."
        className="w-full px-3 py-2 rounded-lg text-xs font-mono bg-transparent border outline-none text-white placeholder:text-white/20"
        style={{borderColor:finished?"#00ff88":"rgba(0,255,255,0.2)"}}
        autoComplete="off" spellCheck={false}/>
      {finished&&(
        <motion.div className="text-center font-mono space-y-1" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
          <p className="text-sm" style={{color:cyan}}>🏁 {wpm} WPM · {accuracy}% accuracy</p>
          <button onClick={reset} className="text-xs px-3 py-1 rounded border" style={{borderColor:`${cyan}40`,color:cyan}}>Try Again</button>
        </motion.div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PATTERN RECOGNITION GAME
═══════════════════════════════════════════ */
type PatternLevel = {
  sequence: (number|string)[];
  choices: (number|string)[];
  answer: number|string;
  label: string;
  difficulty: "Easy"|"Medium"|"Hard";
};

function makePatterns(): PatternLevel[] {
  return [
    // Easy — arithmetic
    {sequence:[2,4,6,8,"?"],choices:[9,10,11,12],answer:10,label:"Find the next number",difficulty:"Easy"},
    {sequence:[1,3,9,27,"?"],choices:[54,81,72,63],answer:81,label:"Find the next number",difficulty:"Easy"},
    {sequence:[100,90,80,70,"?"],choices:[55,60,65,50],answer:60,label:"Find the next number",difficulty:"Easy"},
    // Medium — mixed
    {sequence:[1,1,2,3,5,"?"],choices:[7,8,9,10],answer:8,label:"Fibonacci — next?",difficulty:"Medium"},
    {sequence:[2,6,12,20,30,"?"],choices:[40,42,44,46],answer:42,label:"Find the next number",difficulty:"Medium"},
    {sequence:["🔴","🔵","🔴","🔵","?"],choices:["🟢","🔴","🟡","🔵"],answer:"🔴",label:"Find the next shape",difficulty:"Medium"},
    // Hard — complex
    {sequence:[1,4,9,16,25,"?"],choices:[30,36,42,49],answer:36,label:"Perfect squares — next?",difficulty:"Hard"},
    {sequence:[3,6,11,18,27,"?"],choices:[36,38,40,42],answer:38,label:"Find the pattern",difficulty:"Hard"},
    {sequence:["🔴","🔴","🔵","🔴","🔴","🔵","?"],choices:["🔵","🔴","🟢","🟡"],answer:"🔴",label:"Find the next shape",difficulty:"Hard"},
  ].sort(()=>Math.random()-0.5);
}

function PatternGame(){
  const[levels]=useState<PatternLevel[]>(makePatterns);
  const[idx,setIdx]=useState(0);
  const[score,setScore]=useState(0);
  const[result,setResult]=useState<"idle"|"correct"|"wrong">("idle");
  const[done,setDone]=useState(false);
  const[selected,setSelected]=useState<number|string|null>(null);
  const[timeLeft,setTimeLeft]=useState(15);
  const timerRef=useRef<ReturnType<typeof setInterval>|null>(null);

  const level=levels[idx];

  const startTimer=useCallback(()=>{
    if(timerRef.current)clearInterval(timerRef.current);
    setTimeLeft(15);
    timerRef.current=setInterval(()=>{
      setTimeLeft(t=>{
        if(t<=1){
          clearInterval(timerRef.current!);
          setResult("wrong");
          setSelected(null);
          setTimeout(()=>{
            if(idx+1>=levels.length)setDone(true);
            else{setIdx(i=>i+1);setResult("idle");setSelected(null);startTimer();}
          },900);
          return 0;
        }
        return t-1;
      });
    },1000);
  },[idx,levels.length]);

  useEffect(()=>{startTimer();return()=>{if(timerRef.current)clearInterval(timerRef.current);};},[idx]);

  const pick=(choice:number|string)=>{
    if(result!=="idle")return;
    if(timerRef.current)clearInterval(timerRef.current);
    setSelected(choice);
    if(choice===level.answer){
      setResult("correct");setScore(s=>s+1);
    } else {
      setResult("wrong");
    }
    setTimeout(()=>{
      if(idx+1>=levels.length)setDone(true);
      else{setIdx(i=>i+1);setResult("idle");setSelected(null);}
    },900);
  };

  const reset=()=>{setIdx(0);setScore(0);setResult("idle");setSelected(null);setDone(false);};

  const diffColor=level.difficulty==="Easy"?"#00ff88":level.difficulty==="Medium"?cyan:"#ff9900";

  if(done)return(
    <div className="flex flex-col items-center gap-4 w-full max-w-sm text-center">
      <p className="text-3xl">🧠</p>
      <p className="font-mono text-sm" style={{color:cyan}}>Pattern Master! Score: {score}/{levels.length}</p>
      <p className="text-xs font-mono" style={{color:`${cyan}60`}}>{score>=7?"🔥 Genius level!":score>=4?"👍 Good job!":"💪 Keep practicing!"}</p>
      <button onClick={reset} className="text-xs font-mono px-4 py-1.5 rounded border" style={{borderColor:cyan,color:cyan}}>Play Again</button>
    </div>
  );

  return(
    <div className="flex flex-col gap-5 w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono" style={{color:`${cyan}80`}}>{idx+1}/{levels.length}</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border" style={{borderColor:diffColor,color:diffColor}}>{level.difficulty}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Timer bar */}
          <div className="flex items-center gap-1.5">
            <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.1)"}}>
              <motion.div className="h-full rounded-full" style={{background:timeLeft>8?cyan:timeLeft>4?"#ff9900":"#ff5555"}}
                animate={{width:`${(timeLeft/15)*100}%`}} transition={{duration:0.3}}/>
            </div>
            <span className="text-[10px] font-mono w-4" style={{color:timeLeft>8?`${cyan}80`:"#ff5555"}}>{timeLeft}</span>
          </div>
          <span className="text-xs font-mono" style={{color:`${cyan}80`}}>⭐{score}</span>
          <button onClick={reset} className="p-1.5 rounded hover:bg-white/5" style={{color:`${cyan}60`}}><RotateCcw className="w-3.5 h-3.5"/></button>
        </div>
      </div>

      {/* Label */}
      <p className="text-xs font-mono" style={{color:`${cyan}70`}}>🔍 {level.label}</p>

      {/* Sequence */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-3 sm:p-4 rounded-xl overflow-x-auto" style={{background:"rgba(0,255,255,0.03)",border:"1px solid rgba(0,255,255,0.1)"}}>
        {level.sequence.map((item,i)=>(
          <div key={i} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-mono font-bold border"
              style={{background:item==="?"?"rgba(0,255,255,0.1)":"rgba(255,255,255,0.04)",borderColor:item==="?"?cyan:"rgba(255,255,255,0.1)",color:item==="?"?cyan:"rgba(255,255,255,0.85)",boxShadow:item==="?"?`0 0 10px ${cyan}44`:"none"}}>
              {item}
            </div>
            {i<level.sequence.length-1&&<span style={{color:"rgba(255,255,255,0.2)"}}>→</span>}
          </div>
        ))}
      </div>

      {/* Choices */}
      <div className="grid grid-cols-2 gap-2">
        {level.choices.map((choice,i)=>{
          const isSelected=selected===choice;
          const isCorrect=result!=="idle"&&choice===level.answer;
          const isWrong=isSelected&&result==="wrong";
          return(
            <motion.button key={i} onClick={()=>pick(choice)}
              className="py-3 rounded-xl text-sm font-mono font-bold border transition-all"
              style={{
                background:isCorrect?"rgba(0,255,136,0.1)":isWrong?"rgba(255,85,85,0.1)":"rgba(255,255,255,0.03)",
                borderColor:isCorrect?"#00ff88":isWrong?"#ff5555":isSelected?cyan:"rgba(255,255,255,0.1)",
                color:isCorrect?"#00ff88":isWrong?"#ff5555":"rgba(255,255,255,0.85)",
                boxShadow:isCorrect?`0 0 12px #00ff8844`:isWrong?`0 0 12px #ff555544`:"none",
              }}
              whileHover={result==="idle"?{scale:1.03,borderColor:cyan}:{}}
              whileTap={result==="idle"?{scale:0.97}:{}}>
              {choice}
            </motion.button>
          );
        })}
      </div>

      {result!=="idle"&&(
        <motion.p className="text-center text-xs font-mono" initial={{opacity:0}} animate={{opacity:1}}
          style={{color:result==="correct"?"#00ff88":"#ff5555"}}>
          {result==="correct"?"✓ Correct! +1":"✗ Wrong — the answer was "+level.answer}
        </motion.p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════ */
type Game="memory"|"snake"|"bugfix"|"typing"|"pattern";
const GAMES:{id:Game;label:string}[]=[
  {id:"memory",label:"🧠 Memory"},
  {id:"snake",label:"🐍 Snake"},
  {id:"bugfix",label:"🐛 Bug Fix"},
  {id:"typing",label:"⌨️ Typing"},
  {id:"pattern",label:"🔍 Pattern"},
];

export default function MiniGames(){
  const[active,setActive]=useState<Game>("memory");
  return(
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div className="text-center mb-10" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
        <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{color:`${cyan}60`}}>before you leave</p>
        <h2 className="text-2xl sm:text-3xl font-black" style={{color:cyan,textShadow:`0 0 20px ${cyan}44`}}>LET&apos;S PLAY SOME GAMES 🎮</h2>
        <p className="text-xs font-mono mt-2" style={{color:`${cyan}40`}}>take a break · you deserve it</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {GAMES.map(g=>(
          <button key={g.id} onClick={()=>setActive(g.id)}
            className="px-4 py-1.5 text-xs font-mono rounded-full border transition-all duration-200"
            style={{borderColor:active===g.id?cyan:"rgba(0,255,255,0.2)",color:active===g.id?"#000":`${cyan}80`,background:active===g.id?cyan:"transparent",boxShadow:active===g.id?`0 0 14px ${cyan}55`:"none"}}>
            {g.label}
          </button>
        ))}
      </div>

      {/* Game area */}
      <div className="flex justify-center">
        <div className="rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-lg overflow-x-hidden" style={{background:"#0a0a0a",border:"1px solid rgba(0,255,255,0.15)",boxShadow:"0 0 40px rgba(0,255,255,0.05)"}}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.2}} className="flex justify-center">
              {active==="memory"&&<MemoryGame/>}
              {active==="snake"&&<SnakeGame/>}
              {active==="bugfix"&&<BugFixGame/>}
              {active==="typing"&&<TypingGame/>}
              {active==="pattern"&&<PatternGame/>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
