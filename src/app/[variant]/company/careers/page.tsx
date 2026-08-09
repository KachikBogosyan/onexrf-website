import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/primitives";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = {
  title: "Careers",
  description: "Working at ONEX RF.",
};

export default function Page() {
  return (
    <Section>
      <Container size="narrow">
        <p className="eyebrow">Company</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Careers</h1>
        <p className="prose-measure mt-5 text-lg text-text-muted">
          ONEX RF is a small team of engineers in Duarte, California, building
          RF systems for medical device manufacturers.
        </p>
        <Placeholder title="Careers content" className="mt-10">
          Both competitors run careers pages, and the scoping note frames this
          rebrand as building a company that lasts across generations —
          recruiting is part of that. Needed: whether ONEX is hiring, the roles
          it hires for, what it is like to work there, and who to contact.
        </Placeholder>
      </Container>
    </Section>
  );
}
