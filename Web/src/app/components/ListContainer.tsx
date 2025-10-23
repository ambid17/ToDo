import React from "react"

type BoardProps = {
  children: React.ReactNode
}

export default function ListContainer({ children }: BoardProps) {
  return (
    <main
      className={
        "flex items-start gap-3 flex-1 overflow-x-auto mt-4 mb-1 px-4  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thumb-rounded-full"
      }
    >
      {children}
    </main>
  )
}