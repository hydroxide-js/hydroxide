'use client'

import { useState, useEffect, useRef } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack
} from '@codesandbox/sandpack-react'
import { Maximize2, Minimize2 } from 'lucide-react'

// @ts-expect-error - Babel standalone doesn't have types
import * as Babel from '@babel/standalone'
import babelPluginHydroxide from 'babel-plugin-hydroxide'
import { cn } from '../lib/cn'
import { hydroxideBundle, hydroxideDomBundle } from '../lib/local-bundles'

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
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
    <style>
      /* Prevent white flash on reload */
      html, body { background: #151515; margin: 0; }
    </style>
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

function SandpackFileUpdater({
  code,
  css,
  resetKey
}: {
  code: string
  css: string
  resetKey?: number
}) {
  const { sandpack, dispatch } = useSandpack()
  const isFirstRender = useRef(true)
  const prevResetKey = useRef(resetKey)
  const prevCode = useRef(code)
  const prevCss = useRef(css)

  // Update files when code/css props change (example switching)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevCode.current = code
      prevCss.current = css
      return
    }

    // Only update if the props actually changed (not from user edits)
    if (prevCode.current !== code || prevCss.current !== css) {
      prevCode.current = code
      prevCss.current = css
      sandpack.updateFile('/src/app.jsx', code)
      sandpack.updateFile('/src/app.css', css)
      // Trigger a refresh to ensure preview updates
      dispatch({ type: 'refresh' })
    }
  }, [code, css, sandpack, dispatch])

  // Reset files when resetKey changes
  useEffect(() => {
    if (resetKey !== undefined && prevResetKey.current !== resetKey) {
      prevResetKey.current = resetKey
      sandpack.updateFile('/src/app.jsx', code)
      sandpack.updateFile('/src/app.css', css)
      dispatch({ type: 'refresh' })
    }
  }, [resetKey, code, css, sandpack, dispatch])

  return null
}

type CodeFile = 'jsx' | 'css'

function LeftPanel({
  isFullscreen,
  onToggleFullscreen
}: {
  isFullscreen: boolean
  onToggleFullscreen: () => void
}) {
  const [activeFile, setActiveFile] = useState<CodeFile>('jsx')
  const { sandpack } = useSandpack()

  const handleFileChange = (file: CodeFile) => {
    setActiveFile(file)
    sandpack.setActiveFile(file === 'jsx' ? '/src/app.jsx' : '/src/app.css')
  }

  return (
    <div className="border-b lg:border-b-0 border-r border-fd-border flex flex-col bg-sandpack-background h-(--height)">
      <div className="h-[57px] flex items-center justify-between px-3 border-b">
        <div className="flex gap-1">
          <TabButton
            active={activeFile === 'jsx'}
            onClick={() => handleFileChange('jsx')}
          >
            App.js
          </TabButton>
          <TabButton
            active={activeFile === 'css'}
            onClick={() => handleFileChange('css')}
          >
            styles.css
          </TabButton>
        </div>
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-md text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-muted/50 transition-colors"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="size-4" />
          ) : (
            <Maximize2 className="size-4" />
          )}
        </button>
      </div>
      <SandpackCodeEditor
        showTabs={false}
        showInlineErrors
        className="flex-1 overflow-auto"
      />
    </div>
  )
}

function RightPanel({ defaultTab = 'preview' }: { defaultTab?: RightPanelTab }) {
  const [activeTab, setActiveTab] = useState<RightPanelTab>(defaultTab)
  const { sandpack } = useSandpack()

  const sourceCode = sandpack.files['/src/app.jsx']?.code || ''

  return (
    <div className="flex flex-col grow h-[calc(var(--height)/1.7)] lg:h-(--height)">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-fd-border bg-sandpack-background px-3 h-[57px] items-center shrink-0">
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

      <div className="flex-1 overflow-auto flex flex-col">
        {/* Compiled - mounted/unmounted on demand */}
        {activeTab === 'compiled' && <CompiledCodeViewer sourceCode={sourceCode} />}

        {/* Preview */}
        <SandpackPreview
          showSandpackErrorOverlay={true}
          showOpenInCodeSandbox={false}
          showRefreshButton
          showNavigator={false}
          className={cn(
            'grow bg-sandpack-background ',
            activeTab === 'compiled' && 'hidden!'
          )}
        />
      </div>
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
  resetKey?: number
  height: number | undefined | string
}

export function HydroxideDemo({
  code,
  css,
  additionalFiles = {},
  visibleFiles = ['/src/app.jsx', '/src/app.css'],
  defaultTab = 'preview',
  className,
  stacked = false,
  resetKey,
  height
}: HydroxideDemoProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Handle escape key to exit fullscreen
  useEffect(() => {
    if (!isFullscreen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    // Prevent body scroll when fullscreen
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isFullscreen])

  return (
    <div
      className={cn(
        'rounded-xl border border-fd-border overflow-hidden flex flex-col not-prose demo-bleed',
        isFullscreen && 'fixed inset-0 z-50 rounded-none border-0 m-0 w-full max-w-none',
        className
      )}
      style={
        {
          '--height': isFullscreen
            ? '100vh'
            : height
              ? typeof height === 'number'
                ? `${height}px`
                : height
              : undefined
        } as React.CSSProperties
      }
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
          // Inject local hydroxide packages as virtual node_modules
          '/node_modules/hydroxide/index.js': hydroxideBundle,
          '/node_modules/hydroxide/package.json': JSON.stringify({
            name: 'hydroxide',
            main: 'index.js'
          }),
          '/node_modules/hydroxide-dom/index.js': hydroxideDomBundle,
          '/node_modules/hydroxide-dom/package.json': JSON.stringify({
            name: 'hydroxide-dom',
            main: 'index.js'
          }),
          ...additionalFiles
        }}
        customSetup={{
          dependencies: {
            'vite-plugin-hydroxide': 'latest'
          }
        }}
        options={{
          activeFile: '/src/app.jsx',
          visibleFiles,
          initMode: 'user-visible'
        }}
      >
        <SandpackFileUpdater code={code} css={css} resetKey={resetKey} />
        <SandpackLayout
          style={{
            flexGrow: 1
          }}
          className={cn(
            'grid! w-full grid-cols-1 bg-sandpack-background!',
            !stacked && 'lg:grid-cols-2'
          )}
        >
          <LeftPanel
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          />
          <RightPanel defaultTab={defaultTab} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
