import { ContactForm } from '@/components/ContactForm'
import { Reveal } from '@/components/motion'
import { Container, PageHero } from '@/components/section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { hasContactEmail, site } from '@/config/site'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="For community organizations, possible advisors, and volunteers. We can’t give medical, legal, or immigration advice, or help with an emergency."
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-6">
          <div className="rounded-xl bg-secondary p-6">
            <h2 className="text-xl font-bold text-secondary-foreground">Email</h2>
            {hasContactEmail ? (
              <a href={`mailto:${site.contactEmail}`} className="mt-2 block text-lg font-semibold text-brand-teal underline underline-offset-2">
                {site.contactEmail}
              </a>
            ) : (
              <p className="mt-2 text-lg">We are setting up a monitored email address. Until then, these forms are demos only.</p>
            )}
          </div>
          <div className="rounded-xl border-2 border-[#f2c9c4] bg-[#fff8f7] p-6">
            <h2 className="text-xl font-bold text-[#7a1d14]">Need help right now?</h2>
            <p className="mt-2 text-lg">{site.emergency.text}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <Tabs defaultValue="contact">
            <TabsList>
              <TabsTrigger value="contact">Contact us</TabsTrigger>
              <TabsTrigger value="feedback">Website feedback</TabsTrigger>
            </TabsList>
            <TabsContent value="contact">
              <ContactForm kind="contact" />
            </TabsContent>
            <TabsContent value="feedback">
              <ContactForm kind="feedback" />
            </TabsContent>
          </Tabs>
        </Reveal>
      </Container>
    </>
  )
}
