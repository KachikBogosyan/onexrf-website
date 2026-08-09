import { ArrowRight, Clock, ShieldCheck, Wrench } from "lucide-react";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { ProofStat } from "@/components/evidence/ProofStat";
import { Placeholder, PlaceholderImage } from "@/components/Placeholder";
import { COMPANY, sitePath, type SiteConfig } from "@/lib/site-config";

/* The four jobs the nav is organised around. Machines are reached through
   these, not the other way round. */
const OUTCOMES = [
  {
    href: "/launch-a-device",
    title: "Launch a device",
    body: "Get from a drawing to a validated, repeatable tip before your design freeze.",
    points: ["Prototype samples", "Die & mandrel design", "Process development"],
  },
  {
    href: "/yield-and-scrap",
    title: "Fix yield & scrap",
    body: "Close the loop on temperature, depth, force and speed so the process stops drifting.",
    points: ["Closed-loop control", "Flash & burr elimination", "Die life"],
  },
  {
    href: "/scale-to-volume",
    title: "Scale to volume",
    body: "More parts per hour from the same floor space and the same operator.",
    points: ["Multi-up forming", "Rotary welding", "Automation & integration"],
  },
  {
    href: "/keep-lines-running",
    title: "Keep lines running",
    body: "Spares, service and answers from the people who designed the system.",
    points: ["Service & repair", "Operator training", "Remote assist"],
  },
];

const PAINS = [
  {
    icon: Clock,
    title: "Weeks for a quote",
    body: "A study or a quote disappears into a process that was built for a much larger company than the one you are calling.",
  },
  {
    icon: Wrench,
    title: "Months for a repair",
    body: "Long enough that buying a second machine starts to look like a reasonable way to protect production.",
  },
  {
    icon: ShieldCheck,
    title: "A salesperson, not an engineer",
    body: "Someone who understands neither the process nor the regulatory stakes sitting between you and the answer.",
  },
];

export function OutcomeHome({ config }: { config: SiteConfig }) {
  return (
    <>
      {/* --- Hero: open on the customer's problem, not the machine --------- */}
      <Section tone="inverse" className="pb-20 pt-16 lg:pb-28 lg:pt-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Eyebrow className="!text-accent">
                RF forming, welding &amp; automation
              </Eyebrow>
              <h1 className="mt-3 text-5xl font-bold tracking-tight text-surface">
                A line that runs, and makes perfect parts.
              </h1>
              <p className="prose-measure mt-6 text-lg text-text-on-inverse">
                You are not buying a machine. You are buying near-zero scrap for
                the next eight years, and someone who picks up the phone when
                something changes. {COMPANY.name} designs and builds every part
                of the RF system — generator, controls, mechanics, tooling — so
                the people who answer are the people who made it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={sitePath(config, "/contact")} variant="inverse" size="large">
                  Talk to an engineer
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
                <Button
                  href={sitePath(config, "/evidence/case-studies")}
                  variant="ghost"
                  size="large"
                  className="!text-surface hover:!bg-white/10"
                >
                  See what we have built
                </Button>
              </div>
            </div>

            <PlaceholderImage
              title="Hero photography"
              ratio="4/3"
              tone="inverse"
              blocking
            >
              A production line running, or an operator at a machine — not a
              product shot on white. The hero has to show the outcome (parts
              coming off a working line), which is the one thing a spec sheet
              cannot communicate.
            </PlaceholderImage>
          </div>
        </Container>
      </Section>

      {/* --- Empathy: name the pain before claiming anything --------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What changed"
            title="The market consolidated, and service went with it."
            lede="The pain in this industry is not price. It is time and risk. As the specialists were acquired, responsiveness and closeness were the first things to go — and the cost lands on your launch date."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PAINS.map(({ icon: Icon, title, body }) => (
              <Card key={title} tone="sunken">
                <Icon aria-hidden="true" className="size-6 text-accent" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-text-muted">{body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Conviction --------------------------------------------------- */}
      <Section tone="sunken">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Our answer"
                title="Responsive at every step, and expert across the table."
                lede="Study, quote, build, service — the same small team, from the first conversation to the machine's eighth year in production. We adapt to the problem instead of imposing a product."
              />
              <p className="prose-measure mt-6 text-text-muted">
                Being vertically integrated is what makes that possible. We
                design and manufacture our own RF generators, controls and
                mechanics, so a change to your process does not become a
                negotiation with someone else&rsquo;s supply chain.
              </p>
              <div className="mt-8">
                <Button href={sitePath(config, "/company")}>How ONEX RF is built</Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ProofStat
                value="2 weeks"
                label="Typical time to a quote"
                source="Customer account, Aug 2026"
                unverified
              />
              <ProofStat
                value="Days"
                label="Typical repair turnaround"
                source="Customer account, Aug 2026"
                unverified
              />
              <Placeholder
                title="Confirm the responsiveness figures"
                blocking
                className="sm:col-span-2"
              >
                These two numbers come from a customer&rsquo;s account of
                working with ONEX, not from an internal measurement. Before they
                can be published as a commitment, ONEX needs to confirm the
                figures it is willing to stand behind — and the customer needs
                to approve being cited. Until then they render as unverified and
                the competitor comparison stays unpublished.
              </Placeholder>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- The four jobs ------------------------------------------------ */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Where to start"
            title="What are you trying to solve?"
            lede="Every machine, die and service we offer sits underneath one of these four jobs."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {OUTCOMES.map((outcome) => (
              <Card key={outcome.href} href={sitePath(config, outcome.href)}>
                <h3 className="text-xl font-semibold text-text-heading">
                  {outcome.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">{outcome.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {outcome.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-md bg-surface-accent px-2 py-1 text-xs font-medium text-text-link"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-text-link">
                  Explore
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Proof -------------------------------------------------------- */}
      <Section tone="sunken">
        <Container>
          <SectionHeading
            eyebrow="Evidence"
            title="Things a buyer can forward to their boss."
            lede="Claims are easy. These are the parts we have formed, the customers who will say so, and the numbers behind them."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <blockquote>
                <p className="text-2xl font-semibold tracking-tight text-text-heading">
                  &ldquo;These guys really care.&rdquo;
                </p>
                <footer className="mt-4 text-sm text-text-muted">
                  Chris — tube-processing professional
                </footer>
              </blockquote>
              <Placeholder title="Attribute and approve this quote" className="mt-6">
                Needs full name, company, role and written permission to publish
                — plus a photograph if he is willing. An anonymous first name
                does not function as evidence.
              </Placeholder>
            </Card>

            <Card tone="sunken">
              <Eyebrow>Coming from your archive</Eyebrow>
              <h3 className="mt-2 text-lg font-semibold">Case studies</h3>
              <p className="mt-2 text-sm text-text-muted">
                Three detailed customer projects already sit on the current
                Servo Tipper page. They need extracting, structuring and
                clearing for publication.
              </p>
              <Button
                href={sitePath(config, "/evidence/case-studies")}
                variant="secondary"
                className="mt-5"
              >
                See the gallery
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      {/* --- Capture ------------------------------------------------------ */}
      <Section tone="inverse">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface">
            Tell us what you are trying to form.
          </h2>
          <p className="mt-4 text-lg text-text-on-inverse">
            Send a drawing and a material. You will get an engineer&rsquo;s
            answer — not a brochure.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={sitePath(config, "/contact")} variant="inverse" size="large">
              Talk to an engineer
            </Button>
            <Button
              href={sitePath(config, "/quote")}
              variant="ghost"
              size="large"
              className="!text-surface hover:!bg-white/10"
            >
              Request a quote
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
