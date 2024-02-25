export default function Footer() {
  return (
    <footer className="container flex flex-wrap items-center max-w-screen-lg px-6 pt-4 mx-auto lg:px-0">
      <div className="flex w-full">
        <div className="flex flex-col justify-between w-full md:items-end md:px-0 md:flex-row">
          <div className="flex flex-col pt-4">
            This site is built using{" "}
            <div>
              <a
                className="font-medium underline"
                href="https://reactrouter.com/"
              >
                React Router 6
              </a>{" "}
              with{" "}
              <a
                className="font-medium underline"
                href="https://reactrouter.com/en/main/hooks/use-view-transition-state"
              >
                experimental
              </a>{" "}
              <a
                className="font-medium underline"
                href="https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API"
              >
                View Transition API
              </a>
            </div>
            <div>
              <a
                className="font-medium underline"
                href="https://tanstack.com/query/latest"
              >
                TanStack Query v5
              </a>{" "}
              with{" "}
              <a className="font-medium underline" href="https://zod.dev/">
                Zod
              </a>{" "}
              for Validated Type-Safe API
            </div>
            <a className="font-medium underline" href="https://ui.shadcn.com/">
              shadcn/ui
            </a>
            <a
              className="font-medium underline"
              href="https://fakestoreapi.com/"
            >
              Fake Store API
            </a>
          </div>

          <p className="pt-4">
            Made by{" "}
            <a
              href="https://tanjingren.me"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Tan Jing Ren
            </a>{" "}
            (
            <a
              href="https://github.com/tanjunior/ecom-viewtransition"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Github Repo
            </a>
            )
          </p>
        </div>
      </div>
    </footer>
  );
}
