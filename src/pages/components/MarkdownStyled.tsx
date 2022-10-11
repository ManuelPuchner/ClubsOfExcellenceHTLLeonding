import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
export default function MarkdownStyled({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-2xl font-bold mb-3 dark:text-white" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold mb-3 dark:text-white" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-2xl font-bold mb-3 dark:text-white" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-2xl font-bold mb-3 dark:text-white" {...props} />
        ),
        h5: ({ node, ...props }) => (
          <h5 className="text-2xl font-bold mb-3 dark:text-white" {...props} />
        ),
        h6: ({ node, ...props }) => (
          <h6 className="text-2xl font-bold mb-3 dark:text-white" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-3 dark:text-white" {...props} />
        ),
        ul: ({ node, ...props }) => {
          return (
            <ul
              className="ml-5 mb-3 list-disc dark:text-white"
            >
              {props.children}
            </ul>
          );
        },
        ol: ({ node, ...props }) => {
          return (
            <ol className="list-decimal ml-5 mb-3 dark:text-white">
              {props.children}
            </ol>
          );
        },
        li: ({ node, ...props }) => {
          return <li className="mb-1 dark:text-white">{props.children}</li>;
        },
        a: ({ node, ...props }) => (
          <a
            className="text-primary-600 dark:text-primary-500"
            {...props}
            target="_blank"
            rel="noreferrer"
          />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-primary-600 dark:border-primary-500 pl-4 mb-3 dark:text-white"
            {...props}
          />
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          // return !inline && match ? (
          //   <SyntaxHighlighter
          //     language={match[1]}
          //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //     // @ts-ignore
          //     style={nord}
          //     PreTag="div"
          //     {...props}
          //   >
          //     {String(children).replace(/\n$/, "")}
          //   </SyntaxHighlighter>
          // ) : (
          //   <code
          //     className="text-sm font-mono text-gray-900 dark:text-white"
          //     {...props}
          //   >
          //     {children}
          //   </code>
          // );
          return (
            <code
              className="text-sm font-mono text-gray-900 dark:text-white"
              {...props}
            >
              {children}
            </code>
          );
        },
        table: ({ node, ...props }) => (
          <table className="table-auto mb-3 dark:text-white" {...props} />
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
        ),
        tbody: ({ node, ...props }) => (
          <tbody className="bg-white dark:bg-gray-900" {...props} />
        ),
        tr: ({ node, ...props }) => (
          <tr
            className="border-b border-gray-200 dark:border-gray-700"
            {...props}
          />
        ),
      }}
      className="w-full dark:text-slate-400"
    >
      {children}
    </ReactMarkdown>
  );
}
