// src/store/useTodoStore.js
import { create } from 'zustand'
import dayjs from 'dayjs'

const getStoredTodos = () =>
  JSON.parse(localStorage.getItem('todos') || '[]')

export const useTodoStore = create((set) => ({
  selectedDate: new Date(), // Date 객체로 관리

  setDate: (date) => set({ selectedDate: date }),

  todos: getStoredTodos(),

  getTodoCountByDate: (dateStr) => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]')
    return todos.filter((t) => t.date === dateStr).length
  },

  filteredTodos: () => {
    const target = dayjs(useTodoStore.getState().selectedDate).format('YYYY-MM-DD')
    return getStoredTodos().filter((t) => t.date === target)
  },

  addTodo: (text) =>
    set((state) => {
      const targetDate = dayjs(state.selectedDate).format('YYYY-MM-DD')
      const newTodo = {
        id: crypto.randomUUID(),
        text,
        done: false,
        date: targetDate,
      }
      const updated = [...state.todos, newTodo]
      localStorage.setItem('todos', JSON.stringify(updated))
      return { todos: updated }
    }),

  toggleTodo: (id) =>
    set((state) => {
      const updated = state.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
      localStorage.setItem('todos', JSON.stringify(updated))
      return { todos: updated }
    }),
}))
