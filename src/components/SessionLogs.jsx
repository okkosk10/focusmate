import { useTimerStore } from '../store/useTimerStore'

export default function SessionLogs() {
  const sessionLogs = useTimerStore((state) => state.sessionLogs)

  if (sessionLogs.length === 0) {
    return <p className="text-gray-500 text-sm mt-4">저장된 세션 로그가 없습니다.</p>
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">📈 세션 로그</h2>
      <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
        {sessionLogs
          .slice()
          .reverse()
          .map((log) => (
            <li key={log.id} className="border-b pb-1">
              <strong>{log.date}</strong> - {log.sessionName} ({log.focusMinutes}분)
            </li>
          ))}
      </ul>
    </div>
  )
}
