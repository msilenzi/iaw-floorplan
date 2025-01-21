import { useEffect, useRef, useState } from 'react'

export function useCountdownTimer(max: number) {
  if (max <= 0) throw new Error('Timer max value must be greater than 0')

  const [counter, setCounter] = useState(max)
  const intervalRef = useRef<number | undefined>(undefined)

  function start() {
    if (counter === 0) return

    // Limpiar intervalo existente antes de crear uno nuevo
    if (intervalRef.current != null) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setCounter((prev) => {
        if (--prev === 0) clearInterval(intervalRef.current)
        return prev
      })
    }, 1_000)
  }

  function stop() {
    clearInterval(intervalRef.current)
    intervalRef.current = undefined
  }

  function reset() {
    stop()
    setCounter(max)
  }

  const isRunning = intervalRef.current !== undefined

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  return { counter, isRunning, start, stop, reset }
}
