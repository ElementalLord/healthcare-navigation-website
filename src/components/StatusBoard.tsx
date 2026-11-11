import { CircleCheck, CircleDashed, Hourglass, Ban } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { statusBoard, whatWeDontDo } from '@/data/content'
import { Stagger, StaggerItem } from './motion'

const columns = [
  { key: 'now', icon: CircleCheck, tone: 'text-[#166534]', bar: 'bg-[#16a34a]' },
  { key: 'developing', icon: Hourglass, tone: 'text-[#8a5a00]', bar: 'bg-[#d97706]' },
  { key: 'future', icon: CircleDashed, tone: 'text-[#1e40af]', bar: 'bg-[#3b82f6]' },
] as const

export function StatusBoard() {
  return (
    <Stagger className="grid gap-5 md:grid-cols-3">
      {columns.map(({ key, icon: Icon, tone, bar }) => {
        const col = statusBoard[key]
        return (
          <StaggerItem key={key}>
            <Card className="h-full overflow-hidden">
              <div aria-hidden="true" className={`h-1.5 ${bar}`} />
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${tone}`}>
                  <Icon aria-hidden="true" className="size-6" /> {col.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-current text-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </StaggerItem>
        )
      })}
    </Stagger>
  )
}

export function WhatWeDontDo() {
  return (
    <Card className="border-2 border-[#f2c9c4] bg-[#fff8f7]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#7a1d14]">
          <Ban aria-hidden="true" className="size-6" /> What CarePath does not do
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2">
          {whatWeDontDo.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-[#b42318]">
                ✕
              </span>
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
