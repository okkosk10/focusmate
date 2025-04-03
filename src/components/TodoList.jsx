// src/components/TodoList.jsx
import { useState } from 'react'
import { useTodoStore } from '../store/useTodoStore'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'

export default function TodoList() {
  const { selectedDate, setDate, todos, addTodo, toggleTodo, filteredTodos } = useTodoStore()
  const [input, setInput] = useState('')

  const handleAdd = () => {
    const trimmed = input.trim()
    if (trimmed) {
      addTodo(trimmed)
      setInput('')
    }
  }

  const visibleTodos = filteredTodos()

  return (
    <div className="max-w-sm w-full mx-auto mt-6 p-4 bg-white rounded-xl shadow">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800">📋 할 일 목록</h2>

        {/* DatePicker */}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setDate(date)}
          dateFormat="yyyy-MM-dd"
          className="border rounded px-2 py-1 text-sm"
          renderDayContents={(day, date) => {
            const dateString = dayjs(date).format('YYYY-MM-DD')
            const count = todos.filter((todo) => todo.date === dateString && !todo.done).length
            const isSelected = dayjs(date).isSame(selectedDate, 'day') // 선택된 날짜인지 확인
            const isCompleted = todos.filter((todo) => todo.date === dateString && todo.done).length > 0

            let dayClass = 'text-black' // 기본 텍스트 색상

            // 선택된 날짜는 파란색 배경
            if (isSelected) {
              if (count > 0) {
                dayClass = 'bg-red-500 text-white' // 완료되지 않은 할 일이 있으면 빨간 배경
              } else {
                dayClass = 'bg-blue-500 text-white' // 할 일이 없으면 파란 배경
              }
            }

            // 완료된 날짜는 녹색 배경
            else if (isCompleted) {
              dayClass = 'bg-green-500 text-white' // 완료된 날짜는 녹색 배경
            }

            // 할 일이 있으면 빨간 배경
            else if (count > 0) {
              dayClass = 'bg-red-500 text-white'
            }

            return <div className={`relative ${dayClass}`}>{day}</div>
          }}
        />
      </div>

      <div className="flex gap-2 mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="할 일을 입력하세요"
          className="flex-1 border px-3 py-2 rounded"
        />
        <button onClick={handleAdd} className="px-3 bg-blue-500 text-white rounded">
          추가
        </button>
      </div>

      <ul className="space-y-2 max-h-52 overflow-y-auto">
        {visibleTodos.length === 0 && (
          <li className="text-sm text-gray-500">할 일이 없습니다.</li>
        )}
        {visibleTodos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={`cursor-pointer select-none px-3 py-2 rounded border ${
              todo.done
                ? 'bg-gray-50 text-gray-400 line-through'
                : 'bg-gray-50 text-black'
            }`}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
