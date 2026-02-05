'use client'

import { useState } from 'react'
import {
  RotateCcw,
  Zap,
  Boxes,
  GitBranch,
  List,
  TextCursorInput,
  Shapes,
  MousePointer2,
  Timer,
  ListTodo,
  Activity
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { HydroxideDemo } from '@/components/sandpack-demo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { counterDemo } from './demos/counter'
import { componentsPropsDemo } from './demos/components-props'
import { fizzBuzzDemo } from './demos/fizz-buzz'
import { listRenderingDemo } from './demos/list-rendering'
import { inputBindingDemo } from './demos/input-binding'
import { svgDemo } from './demos/svg'
import { domReferenceDemo } from './demos/dom-reference'
import { lifecycleDemo } from './demos/lifecycle'
import { todoAppDemo } from './demos/todo-app'
import { effectDemo } from './demos/effect'

const examples: Array<{
  name: string
  icon: LucideIcon
  code: string
  css: string
}> = [
  {
    name: 'Reactive State',
    icon: Zap,
    code: counterDemo.jsx,
    css: counterDemo.css
  },
  {
    name: 'Effects',
    icon: Activity,
    code: effectDemo.jsx,
    css: effectDemo.css
  },
  {
    name: 'Components and Props',
    icon: Boxes,
    code: componentsPropsDemo.jsx,
    css: componentsPropsDemo.css
  },
  {
    name: 'Conditional Rendering',
    icon: GitBranch,
    code: fizzBuzzDemo.jsx,
    css: fizzBuzzDemo.css
  },
  {
    name: 'List Rendering',
    icon: List,
    code: listRenderingDemo.jsx,
    css: listRenderingDemo.css
  },
  {
    name: 'Input Binding',
    icon: TextCursorInput,
    code: inputBindingDemo.jsx,
    css: inputBindingDemo.css
  },
  {
    name: 'SVG',
    icon: Shapes,
    code: svgDemo.jsx,
    css: svgDemo.css
  },
  {
    name: 'DOM Reference',
    icon: MousePointer2,
    code: domReferenceDemo.jsx,
    css: domReferenceDemo.css
  },
  {
    name: 'Lifecycle Hooks',
    icon: Timer,
    code: lifecycleDemo.jsx,
    css: lifecycleDemo.css
  },
  {
    name: 'Todo App',
    icon: ListTodo,
    code: todoAppDemo.jsx,
    css: todoAppDemo.css
  }
]

export function CompilerPlayground() {
  const [selectedExample, setSelectedExample] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const example = examples[selectedExample]

  return (
    <div className="bg-sandpack-background flex flex-col grow overflow-hidden border border-fd-border rounded-xl">
      {/* Top bar with dropdown */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-fd-border">
        <div className="flex items-center gap-0">
          <div className="flex items-center gap-2">
            <p className="text-sm text-fd-muted-foreground font-sans font-medium">
              Examples
            </p>
            <p className="text-fd-muted-foreground font-mono opacity-50"> / </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 h-auto py-1 focus-visible:ring-0 px-2! rounded-full"
              >
                <example.icon className="size-3.5 text-fd-muted-foreground" />
                {example.name}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="min-w-[250px] rounded-xl"
              sideOffset={8}
            >
              {examples.map((ex, index) => {
                const Icon = ex.icon
                return (
                  <DropdownMenuItem
                    key={ex.name}
                    onClick={() => setSelectedExample(index)}
                    className={
                      selectedExample === index
                        ? 'bg-fd-accent text-fd-accent-foreground'
                        : ''
                    }
                  >
                    <Icon className="size-4 text-fd-muted-foreground" />
                    {ex.name}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setResetKey(k => k + 1)}
          className="gap-1.5 text-fd-muted-foreground hover:text-fd-foreground"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </Button>
      </div>

      {/* Demo */}
      <HydroxideDemo
        height={undefined}
        code={example.code}
        css={example.css}
        defaultTab="preview"
        className="grow border-0 rounded-none"
        resetKey={resetKey}
      />
    </div>
  )
}
