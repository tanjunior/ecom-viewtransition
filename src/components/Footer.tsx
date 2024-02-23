export default function Footer() {
  return (
    <footer className="container flex flex-wrap items-center max-w-screen-lg px-6 pt-4 mx-auto lg:px-0">
      <div className="container flex px-3 py-8">
        <div className="flex flex-wrap w-full mx-auto">
          <div className="flex w-full">
            <div className="flex flex-col justify-between w-full px-3 md:px-0 md:flex-row">
              {/* <h3 className="font-bold text-gray-900">About</h3> */}
              <p className="flex flex-col pt-4">
                This site is built using{" "}
                <a className="font-medium underline" href="https://reactrouter.com/en/main/hooks/use-view-transition-state">React Router 6 (experimental View Transition API)</a>
                <a className="font-medium underline" href="https://tanstack.com/query/latest">TanStack Query v5</a>
                <a className="font-medium underline" href="https://ui.shadcn.com/">shadcn/ui</a>
              </p>

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
        </div>
      </div>
    </footer>
  );
}
