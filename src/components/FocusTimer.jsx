// src/components/FocusTimer.jsx
import { useEffect } from 'react'
import { useTimerStore } from '../store/useTimerStore'

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return `${m}:${s}`
}

export default function FocusTimer() {
  const {
    sessionName,
    focusMinutes,
    breakMinutes,
    timeLeft,
    isRunning,
    mode,
    setSessionName,
    setFocusMinutes,
    setBreakMinutes,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimerStore()

  useEffect(() => {
    return () => {
      pauseTimer() // 언마운트 시 타이머 정리
    }
  }, [])

  // 🟦 모드별 스타일 분기
  const isFocus = mode === 'focus'
  const modeLabel = isFocus ? '⏳ 집중 중' : '☕ 휴식 중'
  const modeColor = isFocus ? 'bg-blue-100' : 'bg-green-100'
  const textColor = isFocus ? 'text-blue-700' : 'text-green-700'

  return (
    <div
      className={`max-w-sm w-full mx-auto mt-10 p-5 rounded-2xl shadow-xl ${modeColor} transition-all duration-300 space-y-4`}
    >
      <h1 className="text-2xl font-extrabold text-center text-gray-800">FocusMate</h1>

      {/* ✅ 현재 모드 시각화 */}
      <div className={`text-center font-bold text-lg ${textColor}`}>
        {modeLabel}
      </div>

      {/* 🧩 세션 설정 */}
      <div className="space-y-2">
        <input
          type="text"
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          placeholder="세션 이름 (예: 리액트 공부)"
          className="w-full border rounded px-3 py-2"
        />
        <div className="flex gap-2">
          <input
            type="number"
            value={focusMinutes}
            onChange={(e) => setFocusMinutes(Number(e.target.value))}
            className="w-1/2 border rounded px-3 py-2"
            min={1}
          />
          <span className="self-center">분 집중</span>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(Number(e.target.value))}
            className="w-1/2 border rounded px-3 py-2"
            min={1}
          />
          <span className="self-center">분 휴식</span>
        </div>
      </div>

      {/* 🕓 타이머 */}
      <div className="text-6xl font-mono text-center text-gray-900">
        {formatTime(timeLeft)}
      </div>

      {/* ▶️ 컨트롤 버튼 */}
      <div className="flex justify-center gap-3">
        {!isRunning ? (
          <button
            onClick={startTimer}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold"
          >
            ▶ 시작
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="px-4 py-2 bg-yellow-500 text-white rounded-xl font-semibold"
          >
            ⏸ 정지
          </button>
        )}
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-gray-600 text-white rounded-xl font-semibold"
        >
          🔁 리셋
        </button>
      </div>
    </div>
  )
}
