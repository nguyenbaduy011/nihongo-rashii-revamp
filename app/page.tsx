export default function Home() {
  return (
    <main>
      <section className="bg-primary-foreground pt-40 pb-28 px-20">
        <h1 className="font-medium text-8xl tracking-tighter w-2/3 mx-auto">
          ようこそ
          <br /> 日本語らしい！
        </h1>
      </section>
      <section className=" py-40 px-20">
        <p className="text-3xl/10 tracking-tight w-2/3 mx-auto text-gray-600">
          Freelance senior product designer with 10 years of experience. Based
          in Lisbon. Available for remote-friendly freelance work from July.
          <br />
          <br />
          Most recently at Lisbon’s newest unicorn, Cucumber. Previously, at
          Cool Cool — the fastest growing bank in the Portugal. Before that, the
          first design hire at Red Box.
        </p>
      </section>
      <section className="py-40 px-20 space-y-20">
        <div className="border-t-2 border-black">
          <h2 className="font-medium tracking-tight text-6xl/tight mt-7">
            Ngữ pháp
          </h2>
        </div>
        <div>
          <img className="w-full aspect-video rounded-xl border" />
          <div className="mt-6">
            <div className="font-medium text-2xl/7 tracking-tight">
              Grid title
            </div>
            <div className="text-2xl/ tracking-tight">Grid description</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <img className="w-full aspect-video rounded-xl border" />
            <div className="mt-6">
              <div className="font-medium text-2xl/7 tracking-tight">
                Grid title
              </div>
              <div className="text-2xl/ tracking-tight">Grid description</div>
            </div>
          </div>
          <div>
            <img className="w-full aspect-video rounded-xl border" />
            <div className="mt-6">
              <div className="font-medium text-2xl/7 tracking-tight">
                Grid title
              </div>
              <div className="text-2xl/ tracking-tight">Grid description</div>
            </div>
          </div>
          <div>
            <img className="w-full aspect-video rounded-xl border" />
            <div className="mt-6">
              <div className="font-medium text-2xl/7 tracking-tight">
                Grid title
              </div>
              <div className="text-2xl/ tracking-tight">Grid description</div>
            </div>
          </div>
          <div>
            <img className="w-full aspect-video rounded-xl border" />
            <div className="mt-6">
              <div className="font-medium text-2xl/7 tracking-tight">
                Grid title
              </div>
              <div className="text-2xl/ tracking-tight">Grid description</div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-40 px-20 flex gap-16">
        <div className="border-black border-t-2 w-2/3">
          <h2 className="font-medium tracking-tight text-6xl/tight mt-7">
            Blog
          </h2>
        </div>
        <div className="space-y-12 w-full">
          <div className="pb-12 border-b-2">
            <h3 className="tracking-tighter font-medium text-3xl/snug">
              blog 1
            </h3>
            <div className="space-x-2 mt-4">
              <span>8 april 2024</span>
              <span>·</span>
              <span>5 min read</span>
            </div>
          </div>
          <div className="pb-12 border-b-2">
            <h3 className="tracking-tighter font-medium text-3xl/snug">
              blog 1
            </h3>
            <div className="space-x-2 mt-4">
              <span>8 april 2024</span>
              <span>·</span>
              <span>5 min read</span>
            </div>
          </div>
          <div className="pb-12 border-b-2">
            <h3 className="tracking-tighter font-medium text-3xl/snug">
              blog 1
            </h3>
            <div className="space-x-2 mt-4">
              <span>8 april 2024</span>
              <span>·</span>
              <span>5 min read</span>
            </div>
          </div>
          <div className="pb-12 border-b-2">
            <h3 className="tracking-tighter font-medium text-3xl/snug">
              blog 1
            </h3>
            <div className="space-x-2 mt-4">
              <span>8 april 2024</span>
              <span>·</span>
              <span>5 min read</span>
            </div>
          </div>
          <div className="pb-12 border-b-2">
            <h3 className="tracking-tighter font-medium text-3xl/snug">
              blog 1
            </h3>
            <div className="space-x-2 mt-4">
              <span>8 april 2024</span>
              <span>·</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
