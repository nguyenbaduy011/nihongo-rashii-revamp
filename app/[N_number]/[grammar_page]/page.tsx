import { db } from "@/drizzle/db";
import { grammarExamples, grammars } from "@/drizzle/schema/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";

export default async function GrammarPage({
  params,
}: {
  params: { grammar_page: string };
}) {
  const grammar_page = await db.query.grammars.findFirst({
    where: eq(grammars.id, params.grammar_page),
  });

  if (!grammar_page) {
    redirect("/");
  }

  const examples = await db
    .select()
    .from(grammarExamples)
    .where(eq(grammarExamples.grammarID, grammar_page.id));

  // const synonymousGrammar = ()

  // const homophoneGrammar = ()

const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element && domNode.attribs) {
      const { name, children } = domNode;

      if (name === "ul") {
        return (
          <ul className="list-disc ml-5">
            {domToReact(children as DOMNode[], options)}
          </ul>
        );
      }

      if (name === "ol") {
        return (
          <ol className="list-decimal ml-5">
            {domToReact(children as DOMNode[], options)}
          </ol>
        );
      }

      if (name === "p") {
        return (
          <p className="mb-4">{domToReact(children as DOMNode[], options)}</p>
        );
      }
      if (name === "br") {
        return <br className="mb-4" />;
      }
    }
  },
};

  return (
    <div className="">
      <div className="m-10 mx-auto max-w-[1000px] space-y-16">
        {/* <div className="flex space-x-3">
        <MoveLeft />
        <div>Back</div>
      </div> */}
        <div className="border-b-2 pb-3">
          <div className="flex h-10 items-center justify-center bg-[#2B2B2B] text-xl text-white">
            Ngữ pháp {grammar_page.level}
          </div>
          <div className="flex h-20 items-center justify-center bg-[#Ffaaaa] text-3xl text-[#2B2B2B]">
            {grammar_page.japaneseRead} ({grammar_page.romajiRead})
          </div>
        </div>
        <div className="space-y-16">
          <div>
            <h1 className="text-2xl font-medium text-[#2B2B2B]">
              Ý NGHĨA（意味）
            </h1>
            <p
              className="text-xl"
              dangerouslySetInnerHTML={{ __html: grammar_page.explain }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-[#2B2B2B]">
              CÁCH DÙNG（使い方）
            </h1>
            <p className="text-xl">{parse(grammar_page.usingWay, options)}</p>
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-medium text-[#2B2B2B]">VÍ DỤ（例文）</h1>
          <div className="space-y-10 text-[#2B2B2B]">
            {examples.map((example, index) => (
              <div key={index} className="space-y-3 p-3 text-xl">
                <p>{parse(example.japaneseRead, options)}</p>
                <p>{parse(example.romajiRead, options)}</p>
                <p>{parse(example.vietnameseRead, options)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="fixed right-0 top-1/2 flex w-1/4 -translate-y-1/2 transform flex-col">
        <div>
          Các ngữ pháp đồng nghĩa
          <div>
            <a href="">Ngữ pháp の (N5)</a>
          </div>
        </div>
        <div>
          Các ngữ pháp đồng âm
          <div></div>
        </div>
      </div> */}
    </div>
  );
}
