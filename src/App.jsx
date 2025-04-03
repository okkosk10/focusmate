import FocusTimer from './components/FocusTimer'
import SessionLogs from './components/SessionLogs'
import TodoList from './components/TodoList'
import 'react-datepicker/dist/react-datepicker.css'

if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission()
}

function App() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <FocusTimer />
      <TodoList />
      <SessionLogs />
    </main>
  )
}

export default App