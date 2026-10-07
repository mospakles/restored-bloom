import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

/**
 * Renders editor-supplied Markdown. Raw HTML is not rendered (react-markdown's
 * default), and only http(s), mailto, tel and site-relative links are allowed.
 */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("prose-bloom", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        urlTransform={(url) => (/^(https?:|mailto:|tel:|\/|#)/i.test(url) ? url : "")}
        components={{
          a: ({ href, children, ...props }) => {
            const external = href && /^https?:/i.test(href)
            return (
              <a href={href} {...props} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {children}
              </a>
            )
          },
          img: () => null,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
