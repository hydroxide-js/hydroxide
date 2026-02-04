'use client'

import { useState, useEffect, useRef } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack
} from '@codesandbox/sandpack-react'

// @ts-expect-error - Babel standalone doesn't have types
import * as Babel from '@babel/standalone'
import babelPluginHydroxide from 'babel-plugin-hydroxide'
import { cn } from '../lib/cn'

function compileSource(source: string): string {
  try {
    const result = Babel.transform(source, {
      plugins: [babelPluginHydroxide]
    })
    return result?.code ?? ''
  } catch (error) {
    if (error instanceof Error) {
      return `// Compilation Error:\n// ${error.message}`
    }
    return '// Unknown error occurred'
  }
}

const indexCode = `import { render } from 'hydroxide-dom';
import App from './app.jsx';
import './app.css';

render(App, document.getElementById('root'));
`

const viteConfig = `import { defineConfig } from 'vite';
import hydroxide from 'vite-plugin-hydroxide';

export default defineConfig({
  plugins: [hydroxide()],
});
`

const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hydroxide App</title>
  </head>
  <body class="dark">
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
  </body>
</html>
`

type RightPanelTab = 'preview' | 'compiled'

function TabButton({
  active,
  onClick,
  children
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'bg-fd-muted text-fd-foreground'
          : 'text-fd-muted-foreground hover:bg-fd-muted/50 hover:text-fd-foreground'
      }`}
    >
      {children}
    </button>
  )
}

function CompiledCodeViewer({ sourceCode }: { sourceCode: string }) {
  const [compiledCode, setCompiledCode] = useState(() => compileSource(sourceCode))
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip debounce on first render since we already computed initial state
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setCompiledCode(compileSource(sourceCode))
    }, 150)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [sourceCode])

  return (
    <SandpackProvider
      template="vite"
      theme="dark"
      files={{
        '/compiled.js': compiledCode
      }}
      options={{
        activeFile: '/compiled.js'
      }}
      style={{
        flexGrow: 1
      }}
    >
      <SandpackCodeEditor
        showTabs={false}
        readOnly
        style={{
          height: '100%'
        }}
      />
    </SandpackProvider>
  )
}

function RightPanel({ defaultTab = 'preview' }: { defaultTab?: RightPanelTab }) {
  const [activeTab, setActiveTab] = useState<RightPanelTab>(defaultTab)
  const { sandpack } = useSandpack()

  const sourceCode = sandpack.files['/src/app.jsx']?.code || ''

  return (
    <div className="flex flex-col grow">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-fd-border bg-[#151515] px-3 h-[57px] items-center">
        <TabButton
          active={activeTab === 'preview'}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </TabButton>
        <TabButton
          active={activeTab === 'compiled'}
          onClick={() => setActiveTab('compiled')}
        >
          Compiler Output
        </TabButton>
      </div>

      {/* Compiled - mounted/unmounted on demand */}
      {activeTab === 'compiled' && <CompiledCodeViewer sourceCode={sourceCode} />}

      {/* Preview */}
      <SandpackPreview
        showSandpackErrorOverlay={true}
        showOpenInCodeSandbox={false}
        showRefreshButton
        showNavigator={false}
        className={cn('grow min-h-[400px]', activeTab === 'compiled' && 'hidden!')}
      />
    </div>
  )
}

interface HydroxideDemoProps {
  code: string
  css: string
  additionalFiles?: Record<string, string>
  visibleFiles?: string[]
  defaultTab?: RightPanelTab
  className?: string
  stacked?: boolean
}

export function HydroxideDemo({
  code,
  css,
  additionalFiles = {},
  visibleFiles = ['/src/app.jsx', '/src/app.css'],
  defaultTab = 'preview',
  className,
  stacked = false
}: HydroxideDemoProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-fd-border overflow-hidden flex flex-col not-prose',
        className
      )}
    >
      <SandpackProvider
        template="vite"
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
        theme="dark"
        files={{
          '/src/app.jsx': code,
          '/src/app.css': css,
          '/src/index.jsx': indexCode,
          '/vite.config.js': viteConfig,
          '/index.html': indexHtml,
          ...additionalFiles
        }}
        customSetup={{
          dependencies: {
            hydroxide: 'latest',
            'hydroxide-dom': 'latest',
            'vite-plugin-hydroxide': 'latest'
          }
        }}
        options={{
          activeFile: '/src/app.jsx',
          visibleFiles
        }}
      >
        <SandpackLayout
          style={{
            flexGrow: 1
          }}
          className={cn(
            'grid! w-full grid-cols-1 overflow-auto',
            !stacked && 'lg:grid-cols-2'
          )}
        >
          <div className="border-b lg:border-b-0 flex flex-col bg-[#151515]">
            <div className="h-[57px] flex items-center px-5 border-b">
              <span className="text-sm font-medium text-fd-muted-foreground">Code</span>
            </div>
            <SandpackCodeEditor
              // showLineNumbers
              showTabs={false}
              className="grow"
            />
          </div>
          <RightPanel defaultTab={defaultTab} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
