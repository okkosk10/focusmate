// src/store/useTimerStore.js
import { create } from 'zustand'
import { sendNotification, vibrate } from '../utils/notify' // 알림/진동 유틸

export const useTimerStore = create((set, get) => ({
  // 📌 상태 정의
  sessionName: '',
  focusMinutes: 25,
  breakMinutes: 5,
  timeLeft: 25 * 60,
  isRunning: false,
  intervalId: null,
  mode: 'focus', // 'focus' or 'break'

  // ✅ 세션 로그
  sessionLogs: JSON.parse(localStorage.getItem('sessionLogs') || '[]'),

  // 🧠 상태 설정 함수
  setSessionName: (name) => set({ sessionName: name }),

  setFocusMinutes: (min) =>
    set({ focusMinutes: min, timeLeft: min * 60 }),

  setBreakMinutes: (min) =>
    set({ breakMinutes: min }),

  addSessionLog: (log) =>
    set((state) => {
      const updated = [...state.sessionLogs, log]
      localStorage.setItem('sessionLogs', JSON.stringify(updated))
      return { sessionLogs: updated }
    }),

  // ▶ 타이머 시작
  startTimer: () => {
    if (get().intervalId) return

    const interval = setInterval(() => {
      const current = get().timeLeft

      if (current <= 1) {
        clearInterval(get().intervalId)

        const currentMode = get().mode

        // ⏱ 집중 끝 → 휴식 시작
        if (currentMode === 'focus') {
          sendNotification('휴식 시간이에요!', {
            body: `${get().breakMinutes}분간 휴식을 취하세요 ☕`,
          })
          vibrate(500)

          set({
            mode: 'break',
            timeLeft: get().breakMinutes * 60,
            intervalId: null,
            isRunning: false,
          })
          get().startTimer()
        }

        // ☕ 휴식 끝 → 세션 종료
        else if (currentMode === 'break') {
          sendNotification('세션 완료 🎉', {
            body: `집중 세션 "${get().sessionName}"을 마쳤어요!`,
          })
          vibrate([300, 100, 300])

          const now = new Date()
          const formattedDate = now.toISOString().split('T')[0]

          const log = {
            id: crypto.randomUUID(),
            date: formattedDate,
            sessionName: get().sessionName || '(이름 없음)',
            focusMinutes: get().focusMinutes,
          }

          get().addSessionLog(log)

          // 상태 초기화
          set({
            isRunning: false,
            intervalId: null,
            mode: 'focus',
            timeLeft: get().focusMinutes * 60,
          })
        }
      } else {
        set({ timeLeft: current - 1 })
      }
    }, 1000)

    set({ isRunning: true, intervalId: interval })
  },

  // ⏸ 일시 정지
  pauseTimer: () => {
    clearInterval(get().intervalId)
    set({ isRunning: false, intervalId: null })
  },

  // 🔁 리셋
  resetTimer: () => {
    clearInterval(get().intervalId)
    set((state) => ({
      isRunning: false,
      intervalId: null,
      mode: 'focus',
      timeLeft: state.focusMinutes * 60,
    }))
  },
}))
